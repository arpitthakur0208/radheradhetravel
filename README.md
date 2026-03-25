# Radhe Radhe Travels

Production-ready tourism and SUV rental site for **Radhe Radhe Travels**, built with Next.js (App Router), Tailwind CSS, TypeScript, Framer Motion, and Swiper.

## Setup

```bash
cd radhe-radhe-travels
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | ESLint                 |

## Deployment (Vercel)

1. Push the project to GitHub/GitLab/Bitbucket.
2. Import the repo in [Vercel](https://vercel.com).
3. Use default Next.js settings; build command `npm run build`, output `.next`.

Optional: set `metadataBase` in `app/layout.tsx` to your production URL for correct Open Graph URLs.

## Project structure

- `app/` — App Router pages, layout, global styles, loading UI
- `components/` — UI components (navbar, hero, cards, gallery, contact, footer)
- `data/` — Local JSON for vehicles and destinations
- `public/images/` — Add local assets here (optional; site uses optimized remote images)

## Stack

Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, Swiper, next-themes (dark mode).
