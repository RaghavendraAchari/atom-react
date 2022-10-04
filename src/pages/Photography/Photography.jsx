import "./Photography.css";
import React, { useEffect, useRef } from "react";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";
import { useState } from "react";
import { getAllPhotos } from "../../services/photoServices";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";

function Photography() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filteredItem, setFilteredItem] = useState("All");
  const [showFilter, toggleShowFilter] = useState(
    window.innerWidth <= 480 ? false : true
  );
  const [error, setError] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const useEffectRan = useRef(false);
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    if (useEffectRan.current === false) {
      loadData(currentPage);

      return () => (useEffectRan.current = true);
    }
  }, []);

  const [filterItems] = useState([
    "All",
    "Nature",
    "Wildlife / Animals",
    "Architecture",
  ]);

  function loadData(currentPage) {
    setFetchingData(true);
    getAllPhotos(currentPage)
      .then((res) => {
        setTotalPage(res.data.totalPages);
        const list = res.data.albums.map((element) => {
          const date = new Date(Date.parse(element.date));

          return {
            id: element.id,
            date: date.toDateString(),
            title: element.title,
            description: element.description,
            photos: element.photos,
            details: element.details,
          };
        });
        setFeedList((prev) => [...prev, ...list]);
        setFetchingData(false);
      })
      .catch((e) => {
        console.log(e);
        setError("Could not load the data!");
        setFetchingData(false);
      });
  }

  const handleFilterClick = (e) => {
    toggleShowFilter((prev) => !prev);
  };

  const handleFilterItemClick = (e, item) => {
    if (item === filteredItem) return;
    if (window.innerWidth <= 480) {
      setFilteredItem(item);
      toggleShowFilter(false);
      return;
    }
    setFilteredItem(item);
  };

  const handleLoadMore = () => {
    if (currentPage >= totalPage) return;
    loadData(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <div className="common-grid">
        <aside>
          <h4 className="filter-title" onClick={handleFilterClick}>
            Filters : {filteredItem}
          </h4>
          {showFilter && (
            <ul className="filter-list">
              {filterItems.map((item) => {
                return (
                  <li
                    key={item}
                    className={`filter-item ${
                      filteredItem === item ? "active" : ""
                    } `}
                    onClick={(e) => handleFilterItemClick(e, item)}
                  >
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
        <main>
          {fetchingData === false && feedList.length === 0 && (
            <div className="no-data">No data available</div>
          )}
          {feedList.length > 0 &&
            feedList.map((content) => {
              return (
                <FeedCard
                  key={content.id}
                  feedDetails={content}
                  feedType="Photo"
                />
              );
            })}

          {fetchingData === true && <LoadingWindow showCaption={true} />}
          {error !== "" && <div className="error">{error}</div>}
          <div id="list-end">
            {feedList.length > 0 && fetchingData === false && (
              <button className="button" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Photography;
