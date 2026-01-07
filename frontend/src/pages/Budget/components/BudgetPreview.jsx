export default function BudgetPreview({ budgets }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Budgeted categories: Jan, 2026</h3>

      {budgets.map((b, index) => {
        const remaining = Math.max(b.limit - b.spent, 0);
        const exceeded = b.spent > b.limit;
        const percentUsed = Math.min((b.spent / b.limit) * 100, 100);

        return (
          <div
            key={index}
            style={{
              padding: "16px",
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{b.icon}</span>
                <div>
                  <h4 style={{ margin: 0 }}>{b.category}</h4>
                  <small>({b.month})</small>
                </div>
              </div>
              <span>⋮</span>
            </div>

            <p>Limit: ₹{b.limit}</p>
            <p style={{ color: exceeded ? "red" : "green" }}>
              Spent: ₹{b.spent}
            </p>
            <p style={{ color: exceeded ? "red" : "green" }}>
              Remaining: ₹{remaining}
            </p>

            <div
              style={{
                height: "10px",
                background: "#eee",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentUsed}%`,
                  height: "100%",
                  background: exceeded ? "red" : "green",
                }}
              />
            </div>

            {exceeded && (
              <p style={{ color: "red" }}>*Limit exceeded</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
