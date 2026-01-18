# 📚 API Reference

This document includes:

1. Prisma schema reference
2. REST API documentation

---

# 🧬 1. Prisma Schema Reference

Located at `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model BPReading {
  id        Int      @id @default(autoincrement())
  systolic  Int
  diastolic Int
  pulse     Int?
  takenAt   DateTime @default(now())
  notes     String?
  source    String?
}
```

Notes

- id auto‑increments
- takenAt defaults to now()
- pulse and notes are optional
- source can store device name or method

# 🔌 2. REST API Documentation

Base URL: `http://localhost:4000/api`

## 2.1 GET /health

Check backend status.

```http
GET /api/health
```

Response:

```json
{ "status": "ok" }
```

## 2.2 GET /bp

Fetch all blood pressure readings.

```http
GET /api/bp
```

Response:

```json
[
  {
    "id": 1,
    "systolic": 120,
    "diastolic": 80,
    "pulse": 70,
    "takenAt": "2024-01-01T10:00:00.000Z",
    "notes": "Morning reading",
    "source": "Omron"
  }
]
```

## 2.3 POST /bp

Create a new blood pressure reading.

```http
POST /api/bp
Content-Type: application/json
```

Body:

```json
{
  "systolic": 125,
  "diastolic": 82,
  "pulse": 72,
  "notes": "After workout",
  "source": "Manual"
}
```

Response:

```json
{
  "id": 2,
  "systolic": 125,
  "diastolic": 82,
  "pulse": 72,
  "takenAt": "2024-01-01T12:00:00.000Z",
  "notes": "After workout",
  "source": "Manual"
}
```

# 🧭 3. Error Responses

400 — Validation error

```json
{ "error": "Invalid input" }
```

500 — Server error

```json
{ "error": "Internal server error" }
```
