export default function BudgetWarning({ totalExpense, budget }) {
  if (totalExpense <= budget) return null;

  return (
    <div
      style={{
        background: "#ffcccc",
        padding: "10px",
        marginTop: "15px",
      }}
    >
      ⚠️ Budget exceeded! Budget: ₹{budget}
    </div>
  );
}
