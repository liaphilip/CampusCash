export default function CategoryList({ expenses, totalExpense }) {
  return (
    <div>
      {Object.entries(expenses).map(([category, amount]) => {
        const percent = ((amount / totalExpense) * 100).toFixed(2);

        return (
          <div key={category} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{category}</strong>
              <span>₹{amount} ({percent}%)</span>
            </div>

            <div
              style={{
                background: "#ddd",
                height: "8px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: "#ffd54f",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
