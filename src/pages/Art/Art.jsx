import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import FeedCard from "../../components/PhotoFeedCard/FeedCard";

import { getArtList } from "../../services/artService";

import "./Art.scss";

function Art() {
  const [fetchingData, setFetchingData] = useState(true);
  const useEffectRan = useRef(false);

  const [artList, setArtList] = useState([]);
  useEffect(() => {
    if (useEffectRan.current === false) {
      getArtList(1)
        .then((list) => {
          setFetchingData(false);
          setArtList(list);
        });

      return () => (useEffectRan.current = true);
    }
  }, []);

  return (
    <div className="art-page avoid-nav">
      {fetchingData === true && <LoadingWindow showCaption={true} />}

      {fetchingData === false && artList.length === 0 ? (
        <div className="no-items">
          <p>No items available to show right now</p>
        </div>
      ) : (
        artList.map((element) => {
          return (
            <FeedCard key={element.id} feedType="Art" feedDetails={element} />
          );
        })
      )}
    </div>
  );
}

export default Art;
