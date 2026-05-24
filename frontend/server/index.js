import './env.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { registerApiRoutes } from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FRONTEND_ROOT = join(__dirname, '..')
const isProd = process.env.NODE_ENV === 'production'
const PORT = Number(process.env.PORT) || 5173

async function start() {
  const app = express()
  registerApiRoutes(app)

  if (isProd) {
    const distDir = join(FRONTEND_ROOT, 'dist')
    app.use(express.static(distDir, { index: false }))
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next()
      res.sendFile(join(distDir, 'index.html'))
    })
  } else {
    const vite = await createViteServer({
      root: FRONTEND_ROOT,
      server: { middlewareMode: true },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  }

  const server = app.listen(PORT, () => {
    console.log(`Buttrd ${isProd ? 'production' : 'dev'} server → http://localhost:${PORT}`)
    if (!isProd) console.log(`Admin → http://localhost:${PORT}/admin/login`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use. Stop the other dev server (e.g. run: lsof -ti :${PORT} | xargs kill -9) or set PORT in .env.`,
      )
      process.exit(1)
    }
    throw err
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
