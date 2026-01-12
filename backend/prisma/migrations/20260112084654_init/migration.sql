-- CreateTable
CREATE TABLE "BPReading" (
    "id" SERIAL NOT NULL,
    "systolic" INTEGER NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "pulse" INTEGER,
    "takenAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',

    CONSTRAINT "BPReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BPReading_takenAt_idx" ON "BPReading"("takenAt" DESC);
