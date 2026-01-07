import CategoryItem from "./CategoryItem";

export default function CategorySection({ title, categories, onSetBudget  }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>{title}</h3>

      {categories.map((cat) => (
        <CategoryItem
          key={cat.name}
          name={cat.name}
          icon={cat.icon}
          onSet={onSetBudget}
        />
      ))}
    </div>
  );
}
