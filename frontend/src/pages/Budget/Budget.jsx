import { useState } from "react";
import AIBudgetBox from "./components/AIBudgetBox";
import BudgetPreview from "./components/BudgetPreview";
import CategorySection from "./components/CategorySection";
import SetBudgetModal from "./components/SetBudgetModal";

export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const incomeCategories = [
    { name: "Salary", icon: "💰" },
    { name: "Awards", icon: "🏆" },
    { name: "Refunds", icon: "💸" },
    { name: "Coupons", icon: "🏷️" },
  ];

  const expenseCategories = [
    { name: "Food", icon: "🍴" },
    { name: "Transport", icon: "🚕" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Bills", icon: "🧾" },
    { name: "Telephone", icon: "📱" },
  ];

  const openModal = (category) => {
    setSelectedCategory(category);
    setMonth("");
    setAmount("");
    setShowModal(true);
  };

  const saveBudget = () => {
    if (!month || !amount) return;

    setBudgets([
      ...budgets,
      {
        category: selectedCategory,
        month,
        limit: Number(amount),
        spent: 0,
        icon: "📌",
      },
    ]);

    setShowModal(false);
  };

  return (
    <div>
      <AIBudgetBox />

      {budgets.length > 0 && <BudgetPreview budgets={budgets} />}

      <CategorySection
        title="Income Categories"
        categories={incomeCategories}
        onSetBudget={openModal}
      />

      <CategorySection
        title="Expense Categories"
        categories={expenseCategories}
        onSetBudget={openModal}
      />

      {showModal && (
        <SetBudgetModal
          category={selectedCategory}
          month={month}
          setMonth={setMonth}
          amount={amount}
          setAmount={setAmount}
          onClose={() => setShowModal(false)}
          onSave={saveBudget}
        />
      )}
    </div>
  );
}
