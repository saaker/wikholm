# Wikholm Ortodonti

Professional website for André Wikholm — specialist orthodontist and Invisalign Diamond Provider.

**Live site:** [wikholm.vercel.app](https://wikholm.vercel.app/)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Leaflet + OpenStreetMap
- Vercel deployment with Vercel Blob storage

## Project Structure

```
app/
  page.tsx              # Main landing page (for dentists)
  for-patienter/        # Patient-facing page
  admin/                # Admin panel (login-protected)
  api/                  # API routes (sections, content, locations, images, auth, seed)
  components/           # Shared UI components
    for-dentists/       # Dentist page components
    for-patients/       # Patient page components
    hooks/              # Custom hooks (useAnimateIn, useTheme)
lib/
  store.ts              # Vercel Blob / local JSON storage abstraction
  sections.ts           # Sections CRUD (services, FAQ, news, etc.)
  content.ts            # i18n content overrides
  locations.ts          # Clinic locations CRUD
  i18n.ts               # Translation strings (sv/en)
  icons.tsx             # Icon registry
  basePath.ts           # Base path helper
data/
  sections.json         # Local dev data (sections)
  locations.json        # Local dev data (locations)
public/images/          # Static images (bundled with deploy)
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin Panel

Local admin login at `/admin` uses the `ADMIN_SECRET` from `.env.local` (default: `admin`).

Features:

- Edit sections (services, FAQ, news, before/after, etc.)
- Manage i18n content overrides (Swedish & English)
- CRUD for clinic locations
- Image upload, browse, and delete
- Live section previews
- Dark mode support

### Storage

- **Production (Vercel):** Data stored in [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (private store). Images uploaded via admin are also stored in Blob and served through a rewrite proxy.
- **Local dev:** Falls back to JSON files in `data/` and filesystem in `public/images/`.

### Environment Variables

| Variable                | Where                 | Purpose                    |
| ----------------------- | --------------------- | -------------------------- |
| `ADMIN_SECRET`          | Vercel + `.env.local` | Admin panel login password |
| `BLOB_READ_WRITE_TOKEN` | Vercel (auto-set)     | Vercel Blob access token   |

### Seeding Production Data

To populate Blob with initial data from the bundled defaults:

```bash
curl -X POST https://wikholm.vercel.app/api/seed \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

Add `?force=true` to overwrite existing data.
