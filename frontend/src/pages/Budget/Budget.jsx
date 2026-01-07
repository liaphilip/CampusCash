import { useState } from "react";
import AIBudgetBox from "./components/AIBudgetBox";
import BudgetPreview from "./components/BudgetPreview";
import CategorySection from "./components/CategorySection";
import SetBudgetModal from "./components/SetBudgetModal";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useEffect } from "react";

export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const fetchBudgets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "budgets"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

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

  const saveBudget = async () => {
    if (!month || !amount) return;

    try {
      await addDoc(collection(db, "budgets"), {
        category: selectedCategory,
        type: "Expense", // later we can make this dynamic
        month,
        limit: Number(amount),
        spent: 0,
        createdAt: new Date(),
      });

      setShowModal(false);
      fetchBudgets(); // refresh preview
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };
  

  useEffect(() => {
    fetchBudgets();
  }, []);

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
