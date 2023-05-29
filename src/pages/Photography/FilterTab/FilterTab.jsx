import { useEffect, useRef, useState } from "react";
import DataNotFound from "../../../components/MessageCards/DataNotFound";
import EmptyList from "../../../components/MessageCards/EmptyList";
import LoadingWindow from "../../../components/LoadingWindow/LoadingWindow";
import { getCategoryList } from "../../../services/categoryService";

import Styles from "./FilterTab.module.scss";


export default function FilterTab({ onFilterItemChanged }) {
    const [fetchingData, setFetchingData] = useState(true);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [showFilter, toggleShowFilter] = useState(
        window.innerWidth <= 480 ? false : true
    );
    const [filteredItem, setFilteredItem] = useState("All");

    let useEfectRan = useRef(false).current;

    useEffect(() => {
        async function load() {
            getCategoryList()
                .then(({ data }) => {
                    setCategories(() => [{ _id: "1", category: "All" }, ...data]);
                    setFetchingData(false);
                })
                .catch(err => {
                    setError(true);
                    setFetchingData(false);
                })
        }

        if (!useEfectRan) {
            load();

            return () => useEfectRan = false;
        }

    }, []);

    const handleFilterClick = (e) => {
        toggleShowFilter((prev) => !prev);
    };

    function renderFilterItems() {
        return <ul className="filter-list">
            {categories.map((item) => {
                return (
                    <li
                        key={item._id}
                        className={`filter-item ${filteredItem === item.category ? "active" : ""
                            } `}
                        onClick={() => onFilterItemChanged(item.category)}
                    >
                        <p>{item.category}</p>
                    </li>
                );
            })}
        </ul>
    }

    return (
        <div className="filter-tab">
            <h4 className="filter-title" onClick={handleFilterClick}>
                Filters : {filteredItem}
            </h4>

            {error ? (<DataNotFound />) : null}

            {fetchingData ? (<LoadingWindow />) : null}

            {showFilter === true
                ? (<>{(fetchingData === false && categories.length) === 0 ? <EmptyList /> : renderFilterItems()}</>)
                : null}
        </div>);

}