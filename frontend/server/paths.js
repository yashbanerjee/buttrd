import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const FRONTEND_ROOT = join(__dirname, '..')

/** Set on Railway to a mounted volume path, e.g. /data */
const PERSISTENT_ROOT = process.env.PERSISTENT_DATA_DIR || ''

export function getContentPath() {
  const dir = PERSISTENT_ROOT
    ? join(PERSISTENT_ROOT, 'data')
    : join(__dirname, 'data')
  mkdirSync(dir, { recursive: true })
  return join(dir, 'site-content.json')
}

export function getUploadDir() {
  const dir = PERSISTENT_ROOT
    ? join(PERSISTENT_ROOT, 'uploads')
    : join(FRONTEND_ROOT, 'public', 'assets', 'uploads')
  mkdirSync(dir, { recursive: true })
  return dir
}

/** Production dist copy of uploads (build-time assets only). */
export function getDistUploadDir() {
  return join(FRONTEND_ROOT, 'dist', 'assets', 'uploads')
}

export function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true })
}
