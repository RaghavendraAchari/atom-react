import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ActionButton from "../ActionButton/ActionButton";
import LoadingWindow from "../LoadingWindow/LoadingWindow";
import Styles from "./DisplayCard.module.scss";

function DisplayCard(props) {
    const { feedDetails, feedType } = props;
    console.log({ feedDetails, feedType });
    const [photoDetails, setPhotoDetails] = useState([]);
    const useEfectRan = useRef(false);
    const [error, setError] = useState("");
    const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
        if (useEfectRan.current === false) {
            switch (feedType) {
                case "Photo":
                    setPhotoDetails(feedDetails.photos);
                    setFetchingData(false);
                    break;
                case "Art":
                    setPhotoDetails(feedDetails.photos);
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
                        to={"/photography/" + feedDetails._id}
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
                        to={"/art/" + feedDetails._id}
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
                    <div key={element._id} className="photo-holder">
                        <img
                            src={element.thumbnailUrl}
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
        <div className={Styles.card}>
            <div className="card-text-content">
                <div className="text-content">
                    <h4 className="card-title">{feedDetails.title}</h4>
                    {feedDetails.description !== null && (
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

export default DisplayCard;
