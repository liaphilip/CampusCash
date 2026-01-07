import { useState } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Cash", balance: 1200 },
    { id: 2, name: "Card", balance: 2500 },
    { id: 3, name: "Savings", balance: 5000 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const addAccount = () => {
    if (!name || balance === "") return;

    // prevent duplicate names
    if (accounts.some(acc => acc.name.toLowerCase() === name.toLowerCase())) {
      alert("Account already exists");
      return;
    }

    const newAccount = {
      id: Date.now(),
      name,
      balance: Number(balance),
    };

    setAccounts([...accounts, newAccount]);
    setName("");
    setBalance("");
    setShowForm(false);
  };

  const deleteAccount = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the "${name}" account?`
    );

    if (!confirmDelete) return;

    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  return (
    <div>
      <h1>Accounts</h1>
      <p>Manage your account types and balances</p>

      {/* Accounts List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {accounts.map(account => (
          <li
            key={account.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{account.name}</strong>
              <div>₹ {account.balance}</div>
            </div>

            <button
              onClick={() => deleteAccount(account.id, account.name)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add Account */}
      <button onClick={() => setShowForm(true)}>
        + Add New Account
      </button>

      {showForm && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <input
            type="text"
            placeholder="Account name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />

          <input
            type="number"
            placeholder="Initial balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />

          <button onClick={addAccount}>Save</button>
          <button
            onClick={() => setShowForm(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
