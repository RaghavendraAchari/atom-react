import "./Photography.scss";
import React, { useEffect, useReducer, useRef } from "react";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";
import { useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import { getCategoryList } from "../../services/categoryService";
import albumFeedService from "../../services/albumFeedService";
import DataNotFound from "../../components/MessageCards/DataNotFound";
import FilterTab from "./FilterTab/FilterTab";
import DisplayCard from "../../components/DisplayCard/DisplayCard";

function parseData(albums) {
  return albums.map((album) => {
    return {
      _id: album._id,
      date: album.date,
      title: album.title,
      description: album.description,
      photos: album.photos,
      details: album.details,
    };
  });
}

function paginationReducer(state, action) {
  switch (action) {
    case "increment":
      if (state.currentPage < state.totalPages)
        return { ...state, currentPage: state.currentPage + 1 }
      break;
    case "decrement":
      if (state.currentPage > 1)
        return { ...state, currentPage: state.currentPage - 1 }
      break;
    case "reset":
      return { ...state, currentPage: 1, totalPages: 0, totalCount: 0 }
      break;
  }
}

function Photography() {
  // const state = {
  //   feedlist: [],
  //   filterItemsList: [],
  //   categoryList: [],
  //   currentPage: 1,
  //   totalPages: 0,
  //   filteredItem: "All",
  //   showFilter: window.innerWidth <= 480 ? false : true,
  //   fetchingData: true,
  //   dataFetchingError: "",
  // }

  const [fetchingData, setFetchingData] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [filteredItem, setFilteredItem] = useState("All");
  const [error, setError] = useState("");
  const useEffectRan = useRef(false);
  const [feedList, setFeedList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showFilter, toggleShowFilter] = useState(window.innerWidth <= 480 ? false : true)

  const [pagination, paginationDispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    totalPages: 0,
    totalCount: 0
  })

  // eslint-disable-next-line
  useEffect(() => {
    async function load() {
      loadData(currentPage, filteredItem);
      loadCategories();
    }

    if (useEffectRan.current === false) {
      load();
      return () => (useEffectRan.current = true);
    }
  }, []);

  function loadCategories() {
    setLoadingCategories(true);

    getCategoryList()
      .then((res) => {
        console.log(res.data);
        setCategoryList(() => {
          return [{ _id: "1", category: "All" }, ...res.data];
        });
        setFilteredItem("All");
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load the data");
        setLoadingCategories(false); 
      });
    
  }

  function loadData(currentPage, category) {
    setFetchingData(true);

    albumFeedService.getDataByCategory(currentPage, category)
      .then((res) => {
        const { albums, totalCount, totalPages } = res.data;

        setTotalPage(totalPages);
        setTotalCount(totalCount);

        const list = parseData(albums);
        console.log({list});

        if(currentPage === 1)
          setFeedList(list);
        else
          setFeedList((prev) => [...prev, ...list]);

        setFetchingData(false);
      })
      .catch((e) => {
      setFetchingData(false);
      setError("Could not load the data!");
      });
  }

  function onCategoryChange(item) {
    if (item === filteredItem) return;

    setFeedList([]);
    setCurrentPage(1);
    loadData(1, item);
    setFilteredItem(item);
  };

  const handleLoadMore = (e) => {
    if (currentPage >= totalPage) {
      return;
    }
    loadData(currentPage + 1, filteredItem);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="common-grid">
      <aside>
        <FilterTab 
          error={error}
          loading={loadingCategories} 
          categoryList={categoryList} 
          onFilterItemChanged={onCategoryChange} />
      </aside>
      <main>
        {fetchingData === false && feedList.length === 0 && (
          <div className="no-data">No data available</div>
        )}
        {feedList.length > 0 &&
          feedList.map((album) => {
            return (
              <DisplayCard
                key={album._id}
                feedDetails={album}
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
  );
}

export default Photography;
