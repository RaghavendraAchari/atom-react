import "./Photography.scss";
import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import { getCategoryList } from "../../services/categoryService";
import albumFeedService from "../../services/albumFeedService";
import FilterTab from "./FilterTab/FilterTab";
import DisplayCard from "../../components/DisplayCard/DisplayCard";

import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

import "../../components/PhotoFeedCard/PhotoFeedCard.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomErrorMessage from "../../components/MessageCards/CustomErrorMessage";

function Photography() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [filteredItem, setFilteredItem] = useState("All");
  const [feedList, setFeedList] = useState([]);

  const getKey = (page) => {
    page = page + 1;
  
    return [`/photography/`, page, filteredItem]                    
  }

  const {data: albumData, isLoading: isLoadingAlbums, error: albumError, setSize: setAlbumPageSize, size: albumPageSize} = useSWRInfinite(getKey, async ([key, currentPage, filteredItem]) => await albumFeedService.getDataByCategory(currentPage, filteredItem))
  const loadingMore = albumPageSize !== albumData?.length;
  const {data: categoryData, isLoading: isCategoriesLoading, error: categoryError} = useSWR("categories", getCategoryList);

  // eslint-disable-next-line
  useEffect(()=>{
    if(albumData !== null && albumData !== undefined){
      const list = [];
      albumData.forEach(data => list.push(...data.albums))
      setFeedList(list);

      if(albumData.length){
        setTotalCount(albumData[0].totalCount);
      }
    }
  },[albumData]);

  function onCategoryChange(item) {
    if (item === filteredItem) return;

    setFeedList([]);
    setCurrentPage(1);
    setFilteredItem(item);
  };

  const handleLoadMore = (e) => {
    setAlbumPageSize(albumPageSize + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="common-grid">
      <aside>
        <FilterTab 
          error={categoryError}
          loading={isCategoriesLoading && !categoryError && !categoryData}
          categoryList={categoryData ? categoryData.data : null} 
          onFilterItemChanged={onCategoryChange} />
      </aside>
      <main>
        {!isLoadingAlbums && !loadingMore && feedList.length === 0 && (
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

        {isLoadingAlbums || loadingMore ? <LoadingWindow showCaption={true} />: null}
        {!isLoadingAlbums && albumError ? <CustomErrorMessage textToDisplay={albumError.toString()} /> : null}
        <div id="list-end">
        {!loadingMore && totalCount !== null && totalCount > feedList.length ? <CustomButton title="Load More" onButtonClicked={handleLoadMore}/> : null}
        </div>
      </main>
    </div>
  );
}

export default Photography;
