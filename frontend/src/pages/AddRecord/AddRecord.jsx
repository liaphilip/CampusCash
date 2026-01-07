import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecord() {
  const navigate = useNavigate();
  const categories = [
    "Money Lent",
    "Shopping",
    "Food",
    "Transportation",
    "Health",
    "Entertainment",
  ];

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");

  const saveRecord = () => {
    const record = {
      type,
      category: type === "expense" ? category : null,
      amount: Number(amount),
      createdAt: new Date(),
    };

    console.log("SAVE TO FIREBASE (records):", record);
    navigate("/analysis");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Record</h2>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {type === "expense" && (
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      )}

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={saveRecord}>Save</button>
    </div>
  );
}
