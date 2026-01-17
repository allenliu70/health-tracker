import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          background: "white",
          borderBottom: "1px solid #ddd",
          marginBottom: "2rem",
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Enter Reading
        </NavLink>
        <NavLink to="/history" style={{ textDecoration: "none" }}>
          History
        </NavLink>
        <NavLink to="/chart" style={{ textDecoration: "none" }}>
          Chart
        </NavLink>
      </nav>

      <main>{children}</main>
    </div>
  );
}
