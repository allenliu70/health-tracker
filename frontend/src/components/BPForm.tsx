import { useState } from "react";

interface BPReadingInput {
  systolic: number;
  diastolic: number;
  pulse?: number | null;
  takenAt: string; // ISO string
  notes?: string | null;
  source?: string | null;
}

export default function BPForm() {
  const [form, setForm] = useState<BPReadingInput>({
    systolic: 120,
    diastolic: 80,
    pulse: 70,
    takenAt: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm
    notes: "",
    source: "manual",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof BPReadingInput>(key: K, value: BPReadingInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save reading");
      }

      setMessage("Blood pressure reading saved successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "420px",
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid #ddd",
        background: "#fafafa",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Enter Blood Pressure</h2>

      <label>Systolic</label>
      <input
        type="number"
        value={form.systolic}
        onChange={(e) => update("systolic", Number(e.target.value))}
        required
      />

      <label>Diastolic</label>
      <input
        type="number"
        value={form.diastolic}
        onChange={(e) => update("diastolic", Number(e.target.value))}
        required
      />

      <label>Pulse</label>
      <input
        type="number"
        value={form.pulse ?? ""}
        onChange={(e) => update("pulse", Number(e.target.value))}
      />

      <label>Taken At</label>
      <input
        type="datetime-local"
        value={form.takenAt}
        onChange={(e) => update("takenAt", e.target.value)}
        required
      />

      <label>Notes</label>
      <textarea
        value={form.notes ?? ""}
        onChange={(e) => update("notes", e.target.value)}
        rows={2}
      />

      <label>Source</label>
      <select
        value={form.source ?? "manual"}
        onChange={(e) => update("source", e.target.value)}
      >
        <option value="manual">Manual</option>
        <option value="device">Device</option>
        <option value="imported">Imported</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          width: "100%",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Saving..." : "Save Reading"}
      </button>

      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </form>
  );
}
