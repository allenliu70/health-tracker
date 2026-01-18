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

---

## ⚙️ 3. Environment Variables

### Backend (`backend/.env`)

Already included:

```
DATABASE_URL=postgres://postgres:postgres@db:5432/health
PORT=4000
```

### Frontend (`frontend/.env`)

Also included:

```
VITE_API_URL=http://localhost:4000/api
```

This ensures the **browser** can reach the backend correctly.

---

## 🐳 4. Running the Entire Stack (Recommended)

From the project root:
