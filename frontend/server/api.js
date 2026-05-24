import './env.js'
import { randomBytes } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'
import {
  FRONTEND_ROOT,
  ensureDir,
  getContentPath,
  getDistUploadDir,
  getUploadDir,
} from './paths.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_PATH = getContentPath()
const UPLOAD_DIR = getUploadDir()
const DEFAULT_CONTENT_PATH = join(FRONTEND_ROOT, 'src', 'data', 'defaultSiteContent.js')

const SESSION_TTL_MS = 12 * 60 * 60 * 1000

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'buttrd-admin-change-me'
}

const sessions = new Map()

function loadDefaultContent() {
  const raw = readFileSync(DEFAULT_CONTENT_PATH, 'utf8')
  const match = raw.match(/export const defaultSiteContent = (\{[\s\S]*\})\s*$/m)
  if (!match) throw new Error('Could not parse defaultSiteContent.js')
  return new Function(`return (${match[1]})`)()
}

function readContent() {
  if (!existsSync(CONTENT_PATH)) {
    const defaults = loadDefaultContent()
    writeFileSync(CONTENT_PATH, JSON.stringify(defaults, null, 2))
    return defaults
  }
  return JSON.parse(readFileSync(CONTENT_PATH, 'utf8'))
}

function writeContent(content) {
  writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2))
}

function mirrorUploadToDist(filename) {
  if (process.env.NODE_ENV !== 'production') return
  try {
    const distUploadDir = getDistUploadDir()
    ensureDir(distUploadDir)
    copyFileSync(join(UPLOAD_DIR, filename), join(distUploadDir, filename))
  } catch {
    /* ignore if dist missing */
  }
}

function pruneSessions() {
  const now = Date.now()
  for (const [token, expiresAt] of sessions.entries()) {
    if (expiresAt <= now) sessions.delete(token)
  }
}

function createSession() {
  pruneSessions()
  const token = randomBytes(32).toString('hex')
  sessions.set(token, Date.now() + SESSION_TTL_MS)
  return token
}

function isValidSession(token) {
  if (!token) return false
  pruneSessions()
  const expiresAt = sessions.get(token)
  if (!expiresAt || expiresAt <= Date.now()) {
    sessions.delete(token)
    return false
  }
  return true
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!isValidSession(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase() || '.png'
    const safeExt = ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext) ? ext : '.png'
    cb(null, `${Date.now()}-${randomBytes(4).toString('hex')}${safeExt}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image uploads are allowed'))
  },
})

const UPLOAD_FILENAME = /^[\w.-]+\.(png|jpe?g|gif|webp)$/i

function serveUpload(req, res) {
  const filename = basename(req.params.filename || '')
  if (!filename || filename.includes('..') || !UPLOAD_FILENAME.test(filename)) {
    return res.status(400).end()
  }
  const filePath = join(UPLOAD_DIR, filename)
  if (!existsSync(filePath)) {
    return res.status(404).end()
  }
  res.sendFile(filePath)
}

export function registerApiRoutes(app) {
  app.use(express.json({ limit: '2mb' }))

  app.get('/api/media/:filename', serveUpload)
  app.get('/assets/uploads/:filename', serveUpload)

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.get('/api/content', (_req, res) => {
    res.set('Cache-Control', 'no-store')
    res.json(readContent())
  })

  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body || {}
    if (password !== getAdminPassword()) {
      return res.status(401).json({ error: 'Invalid password' })
    }
    const token = createSession()
    res.json({ token })
  })

  app.post('/api/admin/logout', requireAdmin, (req, res) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    sessions.delete(token)
    res.json({ ok: true })
  })

  app.put('/api/admin/content', requireAdmin, (req, res) => {
    const { heroCards, offers, socialGrids } = req.body || {}
    if (
      !Array.isArray(heroCards) &&
      !Array.isArray(offers) &&
      !(socialGrids && typeof socialGrids === 'object')
    ) {
      return res.status(400).json({ error: 'Invalid content payload' })
    }
    const current = readContent()
    const next = {
      heroCards: Array.isArray(heroCards) ? heroCards : current.heroCards,
      offers: Array.isArray(offers) ? offers : current.offers,
      socialGrids:
        socialGrids && typeof socialGrids === 'object' ? socialGrids : current.socialGrids,
    }
    writeContent(next)
    res.json(next)
  })

  app.post('/api/admin/upload', requireAdmin, (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message })
      if (!req.file) return res.status(400).json({ error: 'No image provided' })
      mirrorUploadToDist(req.file.filename)
      res.json({ url: `/api/media/${req.file.filename}` })
    })
  })

  app.use((err, _req, res, _next) => {
    res.status(500).json({ error: err.message || 'Server error' })
  })

  readContent()
}
