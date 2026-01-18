# 🩺 Health Tracker

A simple full‑stack health tracking application built with:

- **React + Vite** (frontend)
- **Node.js + Express** (backend)
- **PostgreSQL** (database)
- **Prisma ORM**
- **Docker Compose** for easy setup and deployment

This guide explains how to run the entire project on any machine — including a remote environment — with **zero manual setup** beyond Docker.

---

## 🚀 1. Prerequisites

Make sure the machine has:

- **Docker**
- **Docker Compose**
- (Optional) **Node.js 18+** if running the frontend locally instead of Docker

No need to install PostgreSQL or Node dependencies manually.

---

## 🗂️ 2. Project Structure

```
health-tracker/
│
├── backend/ # Node.js + Express + Prisma API
│ ├── prisma/ # Prisma schema + migrations
│ ├── src/ # API routes and server code
│ └── .env # Backend environment variables
│
├── frontend/ # React + Vite UI
│ └── .env # Frontend environment variables
│
└── docker-compose.yml
```

---

## ⚙️ 3. Environment Variables

### Backend (`backend/.env`)

Already included:

```sh
DATABASE_URL=postgres://postgres:postgres@db:5432/health
PORT=4000
```

### Frontend (`frontend/.env`)

Also included:

```sh
VITE_API_URL=http://localhost:4000/api
```

This ensures the **browser** can reach the backend correctly.

---

## 🐳 4. Running the Entire Stack (Recommended)

From the project root:

```sh
docker compose up --build
```

This will:

- Start PostgreSQL
- Start the backend API
- Start the frontend UI
- Apply Prisma migrations automatically
- Serve the app on **http://localhost:5173**

### Visit the app:

- **Frontend:** http://localhost:5173
- **Backend health check:** http://localhost:4000/api/health
- **BP readings:** http://localhost:4000/api/bp

---

## 🧪 5. Database Setup (Automatic)

The backend container runs:

```sh
npx prisma migrate deploy
```

on startup, so no manual migration is needed.

If you ever want to run migrations manually:

```sh
docker compose run --rm backend npx prisma migrate dev
```

---

## 🛠️ 6. Running Frontend Locally (Optional)

If you prefer running React locally:

```sh
cd frontend
npm install
npm run dev
```

Then open:

```sh
http://localhost:5173
```

Make sure `frontend/.env` contains:

```sh
VITE_API_URL=http://localhost:4000/api
```

---

## 🛠️ 7. Running Backend Locally (Optional)

1. Start only the database:

```sh
docker compose up -d db
```

2. Install backend dependencies:

```sh
cd backend
npm install
```

3. Run the server:

```sh
npm run dev
```

---

## 🧹 8. Resetting the Database (Optional)

If you want a clean slate:

```sh
docker compose down -v
docker compose up --build
```

This removes the Postgres volume and recreates everything.

---

## 🧭 9. Troubleshooting

### ❌ Browser shows “Failed to fetch”

Ensure `frontend/.env` contains:

```sh
VITE_API_URL=http://localhost:4000/api
```

Then rebuild:

```sh
docker compose up --build
```

### ❌ Backend cannot reach database

Check if the DB container is running:

```sh
docker compose ps
```

### ❌ Prisma migration errors

Run: `docker compose run --rm backend npx prisma migrate dev`

---

## 👥 10. Contributors

- **Allen Liu** — Full‑stack developer
- **Your brother** — Co‑developer / tester

---

## 🎉 11. Quick Start Summary

Your brother only needs to run:

```sh
git clone https://github.com/allenliu70/health-tracker
cd health-tracker
docker compose up --build
```

Then open: `http://localhost:5173`

Everything else is automated.
