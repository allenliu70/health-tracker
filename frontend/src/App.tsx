import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Layout from "./layout/Layout";
import EnterReadingPage from "./pages/EnterReadingPage";
import HistoryPage from "./pages/HistoryPage";
import ChartPage from "./pages/ChartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<EnterReadingPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

