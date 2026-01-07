import { useState } from "react";
import "./Categories.css";

export default function Categories() {
  const [incomeCategories, setIncomeCategories] = useState([
    "Awards",
    "Refunds",
    "Salary",
    "Coupons",
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    "Bills",
    "Beauty",
    "Clothing",
    "Education",
    "Electronics",
    "Entertainment",
    "Food",
    "Health",
    "Home",
    "Shopping",
    "Sports",
    "Tax",
    "Telephone",
    "Transport",
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income");

  const addCategory = () => {
    if (!newCategory.trim()) return;

    if (type === "income") {
      setIncomeCategories([...incomeCategories, newCategory]);
    } else {
      setExpenseCategories([...expenseCategories, newCategory]);
    }

    setNewCategory("");
  };

  const deleteCategory = (cat, type) => {
    if (type === "income") {
      setIncomeCategories(incomeCategories.filter((c) => c !== cat));
    } else {
      setExpenseCategories(expenseCategories.filter((c) => c !== cat));
    }
  };

  return (
    <div className="categories-container">
      <h1>Category Management</h1>

      {/* Add Category */}
      <div className="add-box">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={addCategory}>Add</button>
      </div>

      {/* Income */}
      <h2>Income Categories</h2>
      <div className="grid">
        {incomeCategories.map((cat) => (
          <div key={cat} className="card income">
            {cat}
            <button onClick={() => deleteCategory(cat, "income")}>✕</button>
          </div>
        ))}
      </div>

      {/* Expense */}
      <h2>Expense Categories</h2>
      <div className="grid">
        {expenseCategories.map((cat) => (
          <div key={cat} className="card expense">
            {cat}
            <button onClick={() => deleteCategory(cat, "expense")}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
