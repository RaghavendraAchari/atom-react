import "./PhotoPreview.scss";
function PhotoPreview(props) {
  const photos = props.photos;
  return (
    <div className="preview-window">
      <div className="photos">
        {photos.length > 0 ? (
          photos.map((element, index) => (
            <div key={index}>
              <p className="selected-photos">
                {index + 1 + ". "}
                {element.originalFileUrl}{" "}
                <span onClick={() => deletePhoto(index)}>x</span>
              </p>
            </div>
          ))
        ) : (
          <div>
            <p>No photos selected</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoPreview;
