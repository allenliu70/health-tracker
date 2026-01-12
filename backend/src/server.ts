import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bpRouter from "./routes/bp";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/bp", bpRouter);

const port = Number(process.env.PORT) || 4000;

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
