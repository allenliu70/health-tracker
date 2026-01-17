import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bpRouter from "./routes/bp";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bp", bpRouter);

const port = process.env.PORT || 4000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
