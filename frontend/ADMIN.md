# Admin panel

Everything lives in the **frontend** folder — site UI, admin UI, and a small built-in server for saving content. You deploy **one app**, not a separate backend service.

## Local development

```bash
cd frontend
cp .env.example .env
# Set ADMIN_PASSWORD in .env
npm install
npm run dev
```

Open **http://localhost:5173/admin/login**

Default password (change in `.env`):

```
buttrd-admin-change-me
```

## Production

```bash
cd frontend
npm install
npm run build
npm start
```

`npm start` serves the built site **and** the admin API on the same port (`PORT`, default `5173`).

## What you can manage

| Tab | What it controls |
|-----|------------------|
| Hero banners | Home page carousel |
| Offers | `/offers` promo cards |
| Social circle | Instagram grid on Home, Catering, Our Story |

Click **Save changes** after editing.

## Where data is stored

| Path | Purpose |
|------|---------|
| `server/data/site-content.json` | Hero, offers, social content |
| `public/assets/uploads/` | Images uploaded via admin |

Commit these to git if you want changes to persist across deploys, or ensure your host keeps a persistent disk for them.

## Deploying

Any host that can run Node.js works (Railway, Render, Fly.io, VPS, etc.):

1. Set `ADMIN_PASSWORD` in environment variables
2. Run `npm run build && npm start`
3. Point your domain at that process

Static-only hosts (GitHub Pages, S3) **cannot** run the admin save API — you need a Node-capable host for admin edits to persist.
