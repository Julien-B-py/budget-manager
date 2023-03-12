import styles from "./CategoryFilter.module.css";
export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className={styles.filter}>
      <label htmlFor="category-select">Filtrer</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        <option value="">Toutes</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
