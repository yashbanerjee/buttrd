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

Text edits require **Save changes**. **Image uploads save automatically** (file + content JSON).

## Where data is stored

| Path | Purpose |
|------|---------|
| `server/data/site-content.json` | Hero, offers, social content |
| `public/assets/uploads/` (or volume) | Images uploaded via admin |

## Deploying on Railway

1. Set **Root Directory** to `frontend`
2. **Build command:** `npm run build`
3. **Start command:** `npm start`
4. Set environment variables:
   - `ADMIN_PASSWORD` — your admin login password
   - `NODE_ENV=production` (Railway usually sets this)
5. **Add a volume** (required for uploads to survive redeploys):
   - Mount path: `/data`
   - Variable: `PERSISTENT_DATA_DIR=/data`

Without a volume, uploads and admin content are wiped on every deploy.

## Other hosts

Any Node.js host works (Render, Fly.io, VPS, etc.):

1. Set `ADMIN_PASSWORD` in environment variables
2. Run `npm run build && npm start`
3. Use a persistent disk/volume for uploads + `site-content.json`, or set `PERSISTENT_DATA_DIR`

Static-only hosts (GitHub Pages, S3) **cannot** run the admin save API.
