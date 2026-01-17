import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface BPReading {
  id: number;
  systolic: number;
  diastolic: number;
  takenAt: string;
}

export default function BPChart() {
  const [data, setData] = useState<BPReading[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bp`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const chartData = data.map((r) => ({
    date: new Date(r.takenAt).toLocaleDateString(),
    systolic: r.systolic,
    diastolic: r.diastolic,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="systolic" stroke="#ff4d4d" />
        <Line type="monotone" dataKey="diastolic" stroke="#4d79ff" />
      </LineChart>
    </ResponsiveContainer>
  );
}
