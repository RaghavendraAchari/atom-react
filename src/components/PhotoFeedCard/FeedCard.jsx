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

  useEffect(() => {
    if (useEfectRan.current === false) {
      switch (feedType) {
        case "Photo":
          feedDetails.photos.forEach(async (id) => {
            const { data } = await getIndividualPhoto(id);

            setPhotoDetails((prev) => [...prev, data]);
          });

          break;
        case "Art":
          setPhotoDetails([
            {
              id: feedDetails.id,
              originalUrl: feedDetails.originalFileLink,
              thumbNailUrl: feedDetails.thumbnailLink,
            },
          ]);
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
    const listOfImages = photoDetails.map((element, index) => (
      <div key={element.id} className="photo-holder">
        <img src={element.thumbNailUrl} alt={index} />
      </div>
    ));
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
        {photoDetails.length > 0 ? (
          <div className="photos">{renderPhotos()}</div>
        ) : (
          <LoadingWindow loader="BounceLoader" />
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
