import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        borderRight: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h3>CampusCash</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/analysis">Analysis</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/records">Records</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}
