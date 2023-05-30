import { useEffect, useRef, useState } from "react";
import DataNotFound from "../../../components/MessageCards/DataNotFound";
import EmptyList from "../../../components/MessageCards/EmptyList";
import LoadingWindow from "../../../components/LoadingWindow/LoadingWindow";

import Styles from "./FilterTab.module.scss";

function isMobile(){
    return window.innerWidth <= 480 ? true : false;
}

export default function FilterTab({categoryList, error, loading, onFilterItemChanged }) {
    const [showFilter, toggleShowFilter] = useState(
        window.innerWidth <= 480 ? false : true
    );
    const [selectedNode, setSelectedNode] = useState(0);

    const handleFilterClick = (e) => {
        toggleShowFilter((prev) => !prev);
    };


    function renderFilterItems() {
        return <ul className="filter-list">
            {categoryList.map((item, index) => {
                return (
                    <li
                        key={item._id}
                        className={`filter-item ${index === selectedNode ? "active" : ""
                            } `}
                        onClick={() => {
                            setSelectedNode(index);

                            if(isMobile())
                                toggleShowFilter(false);

                            onFilterItemChanged(item.category);
                        }}
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
                Filters : {categoryList !== null && categoryList !== undefined && categoryList.length ? categoryList[selectedNode].category : null}
            </h4>

            {error !== "" ? (<DataNotFound />) : null}

            {loading ? (<LoadingWindow />) : null}

            {showFilter === true
                ? (<>{(loading === false && categoryList.length) === 0 ? <EmptyList /> : renderFilterItems()}</>)
                : null}
        </div>);

}