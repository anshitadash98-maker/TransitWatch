# 🚌 TransitWatch

**Real-Time Public Transport Tracking for Small Cities**

Built for **SIH 2026 · PS25013** (Government of Punjab — Transportation & Logistics).

🔗 **Live demo:** [transit-watch-cyan.vercel.app](https://transit-watch-cyan.vercel.app/)

---

## 🧭 What is this?

Small cities run their bus networks blind — no live tracking, no reliable ETAs, and commuters wait on guesswork. **TransitWatch** is a working prototype showing the full passenger-to-admin loop:

- A live network map with bus positions, routes, and stops
- An admin dashboard with fleet health, delays, and live stats
- Route-level analytics — utilization, peak hours, delay breakdowns

## ✨ Features

- 🗺️ **Live map** — buses move along real route geometry in real time
- 📊 **Analytics dashboard** — passenger trends, route utilization, peak-hour load, delay breakdown
- 🚍 **Fleet health panel** — online / delayed / maintenance status per bus
- 🔍 **Route explorer** — search routes, view stops, distance, and live buses on that route
- 🎨 Polished glassmorphism UI with smooth Framer Motion + GSAP animations

## 🛠️ Tech Stack

| Layer       | Tools |
|-------------|-------|
| Frontend    | React, Vite, Tailwind CSS v4 |
| Animation   | Framer Motion, GSAP |
| Map         | React-Leaflet (OpenStreetMap/CARTO tiles — no API key needed) |
| Charts      | Recharts |
| Icons       | Lucide Icons |

## 🚀 Run locally

```bash
git clone https://github.com/anshitadash98-maker/TransitWatch.git
cd TransitWatch
npm install
npm run dev
```

Open **http://localhost:5173**

## 📦 Build for production

```bash
npm run build
npm run preview
```

## ☁️ Deploy to Vercel

1. Push this repo to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com) → **New Project** → import this repo
3. Framework preset: **Vite** (auto-detected)
4. Deploy — no environment variables or API keys required

## 🧪 What's simulated vs. real

- **Bus positions** are simulated client-side (`src/hooks/useLiveFleet.js`) — they move along real route geometry every animation frame. This stands in for a live GPS feed; swapping in a real backend later (e.g. Flask-SocketIO) only requires replacing this one hook with a socket listener of the same shape.
- **Map tiles** are free OpenStreetMap/CARTO — no API key required, works out of the box.
- **Stats, alerts, and analytics numbers** are realistic seed data for demo purposes.

## 📁 Project Structure

```
src/
├── components/       # Reusable UI (Navbar, Footer, GlassCard, LiveMap, etc.)
│   ├── home/          # Landing page sections
│   └── dashboard/      # Dashboard widgets
├── pages/             # Route-level pages (Home, Dashboard, Routes, Analytics, About)
├── hooks/             # useLiveFleet — simulated live bus data
├── data/              # Network geometry & route/stop definitions
└── index.css          # Global styles
```

## 👩‍💻 Author

Anshita — [anshitadash98-maker](https://github.com/anshitadash98-maker)

---

*Submitted under SIH 2026, Problem Statement PS25013.*