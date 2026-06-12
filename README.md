# 🩸 BloodConnect - Blood Donation Platform

A modern blood donation web application built with Next.js 16, MongoDB, and Tailwind CSS. Connect blood donors with those in need.

##LiveURL: https://blood-donation-dmya.vercel.app

## Features

- **Donor Registration** – Register with name, blood group, phone, address, and last donation date
- **Donor Listing** – Browse all donors in responsive cards with eligibility status
- **Search & Filter** – Search by name, filter by blood group and donation eligibility
- **Smart Eligibility** – Automatically calculates next eligible donation date (120-day window)
- **Click to Call** – One-tap phone dialer links for every donor
- **Admin Dashboard** – Password-protected dashboard with stats and blood group distribution
- **Dark/Light Mode** – Toggle theme with system preference detection
- **Responsive Design** – Mobile-first layout works on all screen sizes

## Tech Stack

| Concern    | Choice                       |
| ---------- | ---------------------------- |
| Framework  | Next.js 16 (App Router)      |
| Language   | JavaScript (JSX)             |
| Styling    | Tailwind CSS v4              |
| Database   | MongoDB + Mongoose           |
| Auth       | NextAuth.js v5 (Credentials) |
| Forms      | React Hook Form + Zod        |
| Deployment | Vercel-ready                 |

## Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Install & Run

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  app/                          # App Router pages
    page.jsx                    # Home (hero + stats)
    layout.jsx                  # Root layout
    register/page.jsx           # Donor registration
    donors/page.jsx             # Donor listing + search/filter
    donors/[id]/page.jsx        # Donor details
    donors/[id]/edit/page.jsx   # Edit donor
    dashboard/page.jsx          # Admin dashboard (auth-protected)
    api/
      donors/route.jsx          # CRUD API
      stats/route.jsx           # Stats API
      auth/[...nextauth]/       # NextAuth handler
  components/
    donors/                     # DonorCard, DonorForm, DeleteDonorButton
    layout/                     # Header, Footer, HeroSection
    ui/                         # Button, Card, Input, Select, Badge, etc.
  lib/
    db.js                       # MongoDB connection
    models/Donor.js             # Mongoose schema
    auth.js                     # NextAuth config
  context/
    ThemeContext.js             # Dark/light mode provider
    ToastContext.js             # Toast notifications
  validations/donor.js          # Zod schemas
  utils/date.js                 # Date helpers
  proxy.js                      # Next.js 16 proxy (middleware)
```

## API Routes

| Endpoint           | Methods | Description             |
| ------------------ | ------- | ----------------------- |
| `/api/donors`      | GET     | List donors (paginated) |
| `/api/donors`      | POST    | Create a donor          |
| `/api/donors/[id]` | GET     | Get donor details       |
| `/api/donors/[id]` | PUT     | Update donor            |
| `/api/donors/[id]` | DELETE  | Delete donor            |
| `/api/stats`       | GET     | Dashboard statistics    |

## Deployment

### Vercel

1. Push your repo to GitHub
2. Import into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Make sure `MONGODB_URI`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are set in Vercel environment variables.
