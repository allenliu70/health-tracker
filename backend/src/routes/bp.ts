import { Router } from "express";
import { prisma } from "../prisma";
import { BPReadingInput } from "../types/bp";

const router = Router();

// GET /api/bp - list readings
router.get("/", async (req, res) => {
  try {
    const readings = await prisma.bPReading.findMany({
      orderBy: { takenAt: "desc" },
    });

    const normalized = readings.map((r) => ({
      id: r.id,
      systolic: r.systolic,
      diastolic: r.diastolic,
      pulse: r.pulse,
      takenAt: r.takenAt.toISOString(),
      notes: r.notes,
      source: r.source,
    }));

    res.json(normalized);
  } catch (err) {
    console.error("Error fetching readings", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/bp - create reading
router.post("/", async (req, res) => {
  try {
    const body = req.body as BPReadingInput;

    if (!body.systolic || !body.diastolic || !body.takenAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const takenDate = new Date(body.takenAt);
    if (Number.isNaN(takenDate.getTime())) {
      return res.status(400).json({ error: "Invalid takenAt timestamp" });
    }

    const created = await prisma.bPReading.create({
      data: {
        systolic: body.systolic,
        diastolic: body.diastolic,
        pulse: body.pulse ?? null,
        takenAt: takenDate,
        notes: body.notes ?? null,
        source: body.source ?? "manual",
      },
    });

    res.status(201).json({
      id: created.id,
      systolic: created.systolic,
      diastolic: created.diastolic,
      pulse: created.pulse,
      takenAt: created.takenAt.toISOString(),
      notes: created.notes,
      source: created.source,
    });
  } catch (err) {
    console.error("Error creating reading", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
