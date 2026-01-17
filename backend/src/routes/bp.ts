import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const readings = await prisma.bPReading.findMany({
    orderBy: { takenAt: "desc" }
  });
  res.json(readings);
});

router.post("/", async (req, res) => {
  const { systolic, diastolic, pulse, takenAt, notes, source } = req.body;

  const reading = await prisma.bPReading.create({
    data: {
      systolic,
      diastolic,
      pulse: pulse ?? null,
      takenAt: takenAt ? new Date(takenAt) : new Date(),
      notes: notes ?? null,
      source: source ?? null
    }
  });

  res.status(201).json(reading);
});

export default router;
