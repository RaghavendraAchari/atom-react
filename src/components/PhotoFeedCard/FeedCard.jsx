import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { getIndividualPhoto } from "../../services/photoServices";
import ActionButton from "../ActionButton/ActionButton";
import LoadingWindow from "../LoadingWindow/LoadingWindow";
import "./PhotoFeedCard.css";

function FeedCard(props) {
  const { feedDetails, feedType } = props;
  const [photoDetails, setPhotoDetails] = useState([]);
  const useEfectRan = useRef(false);
  const [error, setError] = useState("");
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    if (useEfectRan.current === false) {
      switch (feedType) {
        case "Photo":
          const list = feedDetails.photos.map((id) => {
            return getIndividualPhoto(id);
          });
          Promise.all(list)
            .then((dataArray) => {
              const photoArray = dataArray.map((res) => res.data);
              setFetchingData(false);
              setPhotoDetails(photoArray);
            })
            .catch((err) => {
              setError("Error in fetching image list!");
              setFetchingData(false);
            });

          break;
        case "Art":
          setPhotoDetails([
            {
              id: feedDetails.id,
              originalFileUrl: feedDetails.originalFileLink,
              thumbNailUrl: feedDetails.thumbNailUrl,
            },
          ]);
          setFetchingData(false);
          break;
        default:
          break;
      }

      return () => (useEfectRan.current = true);
    }
  });

  const renderButton = (feedType, feedDetails) => {
    switch (feedType) {
      case "Photo":
        return (
          <ActionButton
            className="button-small"
            text="Take Me Here"
            showImage={true}
            imageType={feedType}
            to={"/photography/" + feedDetails.id}
            state={{ feedDetails, photoDetails }}
          />
        );
      case "Art":
        return (
          <ActionButton
            className="button-small"
            text="Take Me Here"
            showImage={true}
            imageType={feedType}
            to={"/art/" + feedDetails.id}
            state={{ feedDetails, photoDetails }}
          />
        );
      default:
        break;
    }
  };

  const renderPhotos = () => {
    const listOfImages = photoDetails.map((element, index) => {
      if (element !== undefined || element !== null)
        return (
          <div key={element.id} className="photo-holder">
            <img
              src={element.thumbNailUrl}
              alt={index}
              rel="noreferrer noopener"
              referrerPolicy="no-referrer"
            />
          </div>
        );
    });
    return listOfImages.slice(0, 3);
  };

  return (
    <div className="card">
      <div className="card-text-content">
        <div className="text-content">
          <h4 className="card-title">{feedDetails.title}</h4>
          {props.description !== null && (
            <p className="desc">{feedDetails.description}</p>
          )}
          <p className="date">{feedDetails.date}</p>
        </div>
        <div className="button-container">
          {renderButton(feedType, feedDetails)}
        </div>
      </div>
      <div className="card-photo-content">
        {fetchingData === true && <LoadingWindow loader="BounceLoader" />}
        {fetchingData === false && error !== "" && <p>{error}</p>}
        {fetchingData === false && photoDetails.length > 0 && (
          <div className="photos">{renderPhotos()}</div>
        )}

        {photoDetails.length > 0 && (
          <div className="total-holder">
            <p>{photoDetails.length} photo(s)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedCard;
