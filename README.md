# TransitWatch — Real-Time Public Transport Tracking for Small Cities

Built for SIH 2026, PS25013 (Government of Punjab — Transportation & Logistics).

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build for production
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push this folder to a GitHub repo
2. vercel.com -> New Project -> import the repo
3. Framework preset: Vite (auto-detected)
4. Deploy. No environment variables or API keys needed.

## What's simulated vs real
- Bus positions are simulated client-side (src/hooks/useLiveFleet.js) - they move
  along real route geometry every animation frame. This stands in for a live GPS
  feed; swapping in a real backend later (Flask-SocketIO etc.) only requires
  replacing this one hook with a socket listener of the same shape.
- Map tiles are free OpenStreetMap/CARTO - no API key required, works out of the box.
- All stats, alerts, and analytics numbers are realistic seed data for demo purposes.

## Tech stack
React, Vite, Tailwind CSS v4, Framer Motion, GSAP, React-Leaflet, Recharts, Lucide Icons.
