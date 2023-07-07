import { useEffect } from "react";
import "./CategoryPicker.scss";
import Styles from "./CategoryPicker.scss";



export default function CategoryPicker({ preSelected, categories, selected, setSelected }) {
    useEffect(() => {
        if (preSelected && preSelected.length) {
            if (categories && categories.length) {
                const selected = categories.filter((category) => {
                    if (preSelected.includes(category))
                        return true;
                    else return false;
                });
                setSelected(selected);
            }
        }
    }, [preSelected]);

    const selectedItems = selected.map((item) => {
        return <span className="selected-item" key={item}>
            {item}
            <a onClick={() => { setSelected(prev => prev.filter(element => element !== item)) }}>
                <strong>x</strong>
            </a>
        </span>
    });

    const remainingItems = categories && categories.length ? categories.map((item) => {
        if (!selected.includes(item))
            return <li key={item}>
                <a onClick={() => setSelected(prev => [...prev, item])}>{item}</a>
            </li>
    }) : null;

    return <div className="category-selector">
        <div className="selections">
            <div className="selected-items">
                {selectedItems.length === 0 ? (
                    <p className="info">Click on categories to select them</p>
                ) : null}
                {selectedItems}
            </div>
        </div>
        <div className="list">
            <ul>
                {remainingItems}
            </ul>
        </div>
    </div>
}

