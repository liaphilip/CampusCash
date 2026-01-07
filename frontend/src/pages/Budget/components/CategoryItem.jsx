export default function CategoryItem({ name, icon, onSet }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        maxWidth: "400px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <span>{icon}</span>
        <span>{name}</span>
      </div>

      <button onClick={() => onSet(name)}>Set Budget</button>
    </div>
  );
}
