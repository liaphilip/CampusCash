import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import Navbar from "./components/Navbar";
import Categories from "./pages/Categories/Categories";
import Records from "./pages/Records/Records";
import Settings from "./pages/Settings/Settings";
import AddRecord from "./pages/AddRecord/AddRecord";
import Login from "./pages/Login/Login";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
    });
    return () => unsub();
  }, []);

  // Prevent blank screen while checking auth
  if (user === undefined) {
    return <p style={{ padding: 20 }}>Checking authentication…</p>;
  }

  // If not logged in, show login page
  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ padding: 20, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/records" element={<Records />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-record" element={<AddRecord />} />
        </Routes>
      </div>
    </div>
  );
}
