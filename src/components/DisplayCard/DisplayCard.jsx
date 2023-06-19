import React from "react";
import ActionButton from "../ActionButton/ActionButton";
import Styles from "./DisplayCard.module.scss";

function DisplayCard(props) {
    const { feedDetails, feedType } = props;
    const photoDetails = feedDetails.photos;
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

                    { feedDetails.description !== null && <p className="desc">{feedDetails.description}</p> }

                    <p className="date">{feedDetails.date}</p>
                </div>

                <div className="button-container">
                    {renderButton(feedType, feedDetails)}
                </div>
            </div>

            <div className="card-photo-content">
                {photoDetails.length > 0 ? <div className="photos">{renderPhotos()}</div> : null}

                {photoDetails.length > 0 ? 
                    <div className="total-holder">
                        <p>{photoDetails.length} photo(s)</p>
                    </div> 
                    : null
                }
            </div>
        </div>
    );
}

export default DisplayCard;
