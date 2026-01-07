export default function SetBudgetModal({
  category,
  month,
  setMonth,
  amount,
  setAmount,
  onClose,
  onSave,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Set Budget</h3>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <label>Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="">Select month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>

        <label>Budget Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ width: "100%", marginBottom: "15px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
