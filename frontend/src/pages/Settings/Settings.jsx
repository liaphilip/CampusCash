import { useState } from "react";
import { auth, db } from "../../services/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function Settings() {
  const user = auth.currentUser;

  const [currency, setCurrency] = useState("INR");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------ SET CURRENCY ------------------ */
  const saveCurrency = async () => {
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { currency },
        { merge: true }
      );
      alert("Currency updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update currency");
    }
  };

  /* ------------------ SUBMIT FEEDBACK ------------------ */
  const submitFeedback = async () => {
    if (!feedback.trim()) {
      alert("Please enter feedback");
      return;
    }

    try {
      await setDoc(doc(db, "feedback", user.uid), {
        message: feedback,
        createdAt: new Date(),
      });
      setFeedback("");
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  /* ------------------ DELETE USER DATA ------------------ */
  const deleteUserData = async () => {
    if (!user) return;

    const confirm = window.confirm(
      "This will permanently delete all your data. Continue?"
    );

    if (!confirm) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteDoc(doc(db, "records", user.uid)); // optional
      await deleteDoc(doc(db, "categories", user.uid)); // optional
      alert("All data deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete data");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Settings</h2>

      {/* Currency */}
      <div style={cardStyle}>
        <h3>Set Currency</h3>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={inputStyle}
        >
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
        <button onClick={saveCurrency}>Save</button>
      </div>

      {/* Feedback */}
      <div style={cardStyle}>
        <h3>Give Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what you think..."
          style={textareaStyle}
        />
        <button onClick={submitFeedback}>Submit</button>
      </div>

      {/* Delete */}
      <div style={{ ...cardStyle, background: "#ffecec" }}>
        <h3>Reset / Delete Data</h3>
        <p>This action cannot be undone.</p>
        <button
          onClick={deleteUserData}
          disabled={loading}
          style={{ background: "#d9534f", color: "#fff" }}
        >
          {loading ? "Deleting..." : "Delete All Data"}
        </button>
      </div>
    </div>
  );
}

/* ------------------ Styles ------------------ */
const cardStyle = {
  padding: 16,
  marginBottom: 20,
  borderRadius: 8,
  background: "#f7f7f7",
};

const inputStyle = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
};

const textareaStyle = {
  width: "100%",
  height: 80,
  padding: 8,
  marginBottom: 10,
};
