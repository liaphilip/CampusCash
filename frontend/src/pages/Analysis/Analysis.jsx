import { useMemo } from "react";
import { Link } from "react-router-dom";
import ExpensePieChart from "../../components/ExpensePieChart";
import BudgetWarning from "../../components/BudgetWarning";
import CategoryList from "../../components/CategoryList";

export default function Analysis() {
  // 🔹 FROM FRIEND A (later)
  const categories = [
    "Money Lent",
    "Shopping",
    "Food",
    "Transportation",
    "Health",
    "Entertainment",
  ];

  // 🔹 FROM FRIEND B (later)
  const budget = 5000;

  // 🔹 FROM FRIEND C (later)
  const records = [
    { type: "expense", category: "Money Lent", amount: 2830 },
    { type: "expense", category: "Shopping", amount: 1387 },
    { type: "expense", category: "Food", amount: 1097 },
    { type: "expense", category: "Transportation", amount: 689 },
    { type: "expense", category: "Health", amount: 500 },
    { type: "income", amount: 3617 },
  ];

  // 🔹 Calculate totals
  const { expenseData, totalExpense, totalIncome } = useMemo(() => {
    const data = {};
    let expenseSum = 0;
    let incomeSum = 0;

    records.forEach((r) => {
      if (r.type === "expense") {
        data[r.category] = (data[r.category] || 0) + r.amount;
        expenseSum += r.amount;
      } else {
        incomeSum += r.amount;
      }
    });

    return {
      expenseData: data,
      totalExpense: expenseSum,
      totalIncome: incomeSum,
    };
  }, [records]);

  const total = totalIncome - totalExpense;
  const now = new Date();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{now.toLocaleString()}</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>EXPENSE ₹{totalExpense}</div>
        <div>INCOME ₹{totalIncome}</div>
        <div>TOTAL ₹{total}</div>
      </div>

      <ExpensePieChart expenses={expenseData} />

      <CategoryList expenses={expenseData} totalExpense={totalExpense} />

      <BudgetWarning totalExpense={totalExpense} budget={budget} />

      <Link to="/add-record">
        <button style={{ marginTop: "20px" }}>➕ Add Record</button>
      </Link>
    </div>
  );
}
