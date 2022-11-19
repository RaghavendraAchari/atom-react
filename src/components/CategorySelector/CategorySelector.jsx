import { useEffect } from "react";
import { useState } from "react";
import { getCategoryList } from "../../services/categoryService";

import "./CategorySelector.scss";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  return {
    categories,
    setCategories,
    selectedItems,
    setSelectedItems,
  };
}

function CategorySelector({
  categories,
  setCategories,
  selectedItems,
  setSelectedItems,
}) {
  useEffect(() => {
    getCategoryList().then((res) => {
      const list = res.data.map((item) => item.category);
      setCategories(list);
    });
  }, []);

  function itemClick(e, item) {
    if (selectedItems.includes(item)) return;

    setSelectedItems((prev) => [...prev, item]);
  }

  function removeItem(item) {
    const list = selectedItems.filter((element) => element !== item);

    setSelectedItems(list);
  }
  return (
    <div className="category-selector">
      <div className="selections">
        <div className="selected-items">
          {selectedItems.length === 0 ? (
            <p className="info">Click on categories to select them</p>
          ) : null}
          {selectedItems.map((item) => (
            <span className="selected-item" key={item}>
              {item}{" "}
              <a onClick={() => removeItem(item)}>
                <strong>x</strong>
              </a>
            </span>
          ))}
        </div>
      </div>
      <div className="list">
        <ul>
          {categories.map((item) => (
            <li key={item}>
              <a onClick={(e) => itemClick(e, item)}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategorySelector;
