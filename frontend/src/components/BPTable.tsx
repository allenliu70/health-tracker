import { useEffect, useState } from "react";

interface BPReading {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  takenAt: string;
  notes: string | null;
  source: string | null;
}

export default function BPTable() {
  const [readings, setReadings] = useState<BPReading[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bp`)
      .then((res) => res.json())
      .then((data) => setReadings(data));
  }, []);

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ background: "#eee" }}>
          <th>Systolic</th>
          <th>Diastolic</th>
          <th>Pulse</th>
          <th>Taken At</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {readings.map((r) => (
          <tr key={r.id}>
            <td>{r.systolic}</td>
            <td>{r.diastolic}</td>
            <td>{r.pulse ?? "-"}</td>
            <td>{new Date(r.takenAt).toLocaleString()}</td>
            <td>{r.notes ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
