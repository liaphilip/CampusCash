import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Analysis from "./pages/Analysis/Analysis";
import Budget from "./pages/Budget/Budget";
import Accounts from "./pages/Accounts/Accounts";
import Categories from "./pages/Categories/Categories";
import Records from "./pages/Records/Records";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Analysis />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/records" element={<Records />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}
