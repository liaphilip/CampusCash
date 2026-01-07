import { useState } from "react";

export default function Records() {
  const [recordsByDate, setRecordsByDate] = useState([
    {
      date: "Sep 07, Sunday",
      items: [
        { id: 1, category: "Food", account: "Card", amount: 40, type: "Expense" },
        { id: 2, category: "Money Lent", account: "Card", amount: 188, type: "Expense" },
        { id: 3, category: "Entertainment", account: "Card", amount: 69, type: "Expense" },
        { id: 4, category: "Food", account: "Card", amount: 12, type: "Expense" },
      ],
    },
    {
      date: "Sep 06, Saturday",
      items: [
        { id: 5, category: "Money Lent", account: "Cash", amount: 600, type: "Expense" },
        { id: 6, category: "Telephone", account: "Card", amount: 299, type: "Expense" },
        { id: 7, category: "Transportation", account: "Cash", amount: 15, type: "Expense" },
        { id: 8, category: "Shopping", account: "Cash", amount: 490, type: "Expense" },
      ],
    },
  ]);

  const deleteRecord = (dateIndex, recordId) => {
    const updated = [...recordsByDate];
    updated[dateIndex].items = updated[dateIndex].items.filter(
      (item) => item.id !== recordId
    );

    // remove date section if empty
    if (updated[dateIndex].items.length === 0) {
      updated.splice(dateIndex, 1);
    }

    setRecordsByDate(updated);
  };

  return (
    <div>
      <h1>Records</h1>

      {recordsByDate.map((day, dateIndex) => (
        <div key={day.date} style={{ marginBottom: "20px" }}>
          {/* Date Header */}
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px",
            }}
          >
            {day.date}
          </div>

          {/* Records */}
          {day.items.map((record) => (
            <div
              key={record.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontWeight: "600" }}>{record.category}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  {record.account}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: record.type === "Expense" ? "#e74c3c" : "#2ecc71",
                    fontWeight: "bold",
                  }}
                >
                  -₹{record.amount}.00
                </div>
                <button
                  onClick={() => deleteRecord(dateIndex, record.id)}
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    background: "none",
                    border: "none",
                    color: "#999",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
