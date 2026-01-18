## 🎉 Quick Start Summary

You only needs to run:

```sh
git clone https://github.com/allenliu70/health-tracker
cd health-tracker
docker compose up --build
```

Then open: `http://localhost:5173`

Everything else is automated.

---

# 🚀 Additional Deployment Options (for reference only)

This document covers:

1. Deploying to a NAS (Synology, QNAP, TrueNAS)
2. Production deployment on a VPS or cloud server

---

# 🏠 1. Deploying to a NAS

This project is NAS‑friendly because it uses Docker Compose.

## 1.1 Requirements

- NAS with Docker or Container Manager
- Git or ability to upload the project folder

## 1.2 Steps

### 1. Clone the repo onto the NAS

```sh
git clone https://github.com/allenliu70/health-tracker
cd health-tracker
```

### 2. Create a persistent volume folder

Example: `/volume1/docker/health-tracker/postgres-data`

Update `docker-compose.yml`:

```yaml
db:
  volumes:
    - /volume1/docker/health-tracker/postgres-data:/var/lib/postgresql/data
```

### 3. Start the stack

```sh
docker compose up -d --build
```

### 4. Access the app from your LAN

```
http://<NAS-IP>:5173
```

# 🌐 2. Production Deployment

You can deploy this app to:

- DigitalOcean / Linode / Hetzner
- AWS EC2 / Lightsail
- A home server
- A NAS

## 2.1 Recommended Production Setup

### Reverse proxy (Traefik or Nginx)

- Terminate HTTPS
- Route traffic to frontend and backend

### Environment variables

##### Frontend:

```
VITE_API_URL=https://yourdomain.com/api
```

##### Backend:

```
DATABASE_URL=postgres://<user>:<pass>@<db-host>:5432/health
```

### Database

Use:

- Managed Postgres (Neon, Supabase, RDS)
- Or self‑hosted Postgres with backups

### Build and run

```sh
docker compose -f docker-compose.prod.yml up --build -d
```
