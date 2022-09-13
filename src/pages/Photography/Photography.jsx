import "./Photography.css";
import React, { useEffect, useRef } from "react";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";
import { useState } from "react";
import { getAllPhotos } from "../../services/photoServices";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";

function Photography() {
  const [filteredItem, setFilteredItem] = useState("All");
  const [showFilter, toggleShowFilter] = useState(
    window.innerWidth <= 480 ? false : true
  );
  const useEffectRan = useRef(false);
  const [feedList, setFeedList] = useState([]);
  useEffect(() => {
    if (useEffectRan.current === false) {
      getAllPhotos()
        .then((res) => {
          const list = res.data.map((element) => {
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
          setFeedList(list);
        })
        .catch((e) => console.log(e));

      // setTimeout(() => {}, 3000);

      return () => (useEffectRan.current = true);
    }
  }, []);

  const [filterItems] = useState([
    "All",
    "Nature",
    "Wildlife / Animals",
    "Architecture",
  ]);

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

  return (
    <div className="container">
      <div className="common-grid">
        {/* <div className="title">
          <h3>Photography</h3>
          <div className="line"></div>
        </div> */}
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
          {feedList.length > 0 ? (
            feedList.map((content) => {
              return (
                <FeedCard
                  key={content.id}
                  feedDetails={content}
                  feedType="Photo"
                />
              );
            })
          ) : (
            <LoadingWindow showCaption={true} />
          )}
          <div className="list-end"></div>
        </main>
      </div>
    </div>
  );
}

export default Photography;
