import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ExpensePieChart from "../../components/ExpensePieChart";
import BudgetWarning from "../../components/BudgetWarning";
import CategoryList from "../../components/CategoryList";

export default function Analysis() {
  // 🔹 FROM FRIEND A
  const categories = [
    "Money Lent",
    "Shopping",
    "Food",
    "Transportation",
    "Health",
    "Entertainment",
  ];

  // 🔹 FROM FRIEND B
  const budget = 5000;

  // 🔹 FROM FRIEND C (whole history, day-wise)
  const records = JSON.parse(localStorage.getItem("records")) || [];

  // 🔹 Selected month (default = current month)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 🔹 Filter records for selected month
  const monthlyRecords = useMemo(() => {
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  return records.filter((r) => {
    if (!r.createdAt) return false;

    const recordDate = new Date(r.createdAt + "T00:00:00");

    return (
      recordDate.getMonth() === month &&
      recordDate.getFullYear() === year
    );
  });
}, [records, currentMonth]);


  // 🔹 Calculate totals for selected month
  const { expenseData, totalExpense, totalIncome } = useMemo(() => {
    const data = {};
    let expenseSum = 0;
    let incomeSum = 0;

    monthlyRecords.forEach((r) => {
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
  }, [monthlyRecords]);

  const total = totalIncome - totalExpense;

  // 🔹 Month navigation
  const goPrevMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 📅 Month Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={goPrevMonth}>◀</button>
        <h2>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={goNextMonth}>▶</button>
      </div>

      {/* 💰 Summary */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>EXPENSE ₹{totalExpense}</div>
        <div>INCOME ₹{totalIncome}</div>
        <div>TOTAL ₹{total}</div>
      </div>

      {/* 📊 Pie Chart */}
      <ExpensePieChart expenses={expenseData} />

      {/* 📋 Category Breakdown */}
      <CategoryList
        expenses={expenseData}
        totalExpense={totalExpense}
      />

      {/* ⚠️ Budget Warning */}
      <BudgetWarning
        totalExpense={totalExpense}
        budget={budget}
      />

      {/* ➕ Add Record */}
      <Link to="/add-record">
        <button style={{ marginTop: "20px" }}>
          ➕ Add Record
        </button>
      </Link>
    </div>
  );
}
