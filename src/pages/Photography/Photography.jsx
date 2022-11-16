import "./Photography.scss";
import React, { useEffect, useRef } from "react";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";
import { useState } from "react";
import { getAllPhotos } from "../../services/photoServices";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import { getCategoryList } from "../../services/categoryService";

function Photography() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [filteredItem, setFilteredItem] = useState("All");
  const [showFilter, toggleShowFilter] = useState(
    window.innerWidth <= 480 ? false : true
  );
  const [error, setError] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const useEffectRan = useRef(false);
  const [feedList, setFeedList] = useState([]);
  const [categoryList, setCategoryList] = useState([
    { _id: "1", category: "All" },
  ]);

  useEffect(() => {
    if (useEffectRan.current === false) {
      loadData(currentPage, filteredItem);
      loadCategories();
      return () => (useEffectRan.current = true);
    }
  }, []);

  function loadCategories() {
    getCategoryList()
      .then((res) => {
        setCategoryList((prev) => {
          return [...prev, ...res.data];
        });
        setFilteredItem("All");
      })
      .catch((err) => console.log(err));
  }

  function loadData(currentPage, category) {
    setFetchingData(true);
    getAllPhotos(currentPage, category)
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
        setError("Could not load the data!");
        setFetchingData(false);
      });
  }

  const handleFilterClick = (e) => {
    toggleShowFilter((prev) => !prev);
  };

  const handleFilterItemClick = (e, item) => {
    if (item === filteredItem) return;
    setFeedList([]);
    setCurrentPage(1);
    loadData(1, item);
    setFilteredItem(item);

    if (window.innerWidth <= 480) {
      toggleShowFilter(false);
      return;
    }
  };

  const handleLoadMore = (e) => {
    if (currentPage >= totalPage) {
      return;
    }
    loadData(currentPage + 1, filteredItem);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <div className="common-grid">
        <aside>
          <div className="filter-tab">
            <h4 className="filter-title" onClick={handleFilterClick}>
              Filters : {filteredItem}
            </h4>
            {showFilter && (
              <ul className="filter-list">
                {categoryList.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={`filter-item ${
                        filteredItem === item.category ? "active" : ""
                      } `}
                      onClick={(e) => handleFilterItemClick(e, item.category)}
                    >
                      <p>{item.category}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
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
            {feedList.length > 0 &&
              fetchingData === false &&
              currentPage < totalPage && (
                <button
                  disabled={currentPage === totalPage}
                  className="button"
                  onClick={handleLoadMore}
                >
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
