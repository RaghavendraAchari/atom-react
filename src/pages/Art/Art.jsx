import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";

import { getArtList } from "../../services/artService";

import "./Art.scss";

function mapData(element) {
  return {
    id: element.id,
    originalFileLink: element.originalFileLink,
    thumbNailUrl: element.thumbNailLink,
    date: new Date(Date.parse(element.date)).toDateString(),
    title: element.title,
    description: element.description,
  };
}

function Art() {
  const [fetchingData, setFetchingData] = useState(true);
  const useEffectRan = useRef(false);

  const [artList, setArtList] = useState([]);
  useEffect(() => {
    if (useEffectRan.current === false) {
      getArtList().then((res) => {
        setFetchingData(false);
        const list = res.data.map((element, index) => {
          return mapData(element);
        });
        setArtList(list);
        // console.log(res.data);
      });

      return () => (useEffectRan.current = true);
    }
  }, []);

  return (
    <div className="art-page">
      {fetchingData === true && <LoadingWindow showCaption={true} />}

      {fetchingData === false && artList.length === 0 ? (
        <div className="no-items">
          <p>No items available to show right now</p>
        </div>
      ) : (
        artList.map((element, index) => {
          return (
            <FeedCard key={element.id} feedType="Art" feedDetails={element} />
          );
        })
      )}
    </div>
  );
}

export default Art;
