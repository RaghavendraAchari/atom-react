import Styles from "./ThumbnailRenderer.module.scss";

export default function ThumbnailRenderer({ images }) {
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
    <div className="card-photo-content">
      {images.length > 0 ? (
        <div className="photos">{renderPhotos()}</div>
      ) : null}

      {images.length > 0 ? (
        <div className="total-holder">
          <p>{images.length} photo(s)</p>
        </div>
      ) : null}
    </div>
  );
}
