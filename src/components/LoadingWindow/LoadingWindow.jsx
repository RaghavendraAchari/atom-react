import "./LoadingWindow.scss";
function LoadingWindow(props) {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <img
          className="loader-image"
          src={
            props.loader === "BounceLoader"
              ? "/assets/BounceLoader.gif"
              : "/assets/PlantLoading.gif"
          }
          alt="Loading"
        />
        {props.showCaption === true && (
          <p>Plant a tree now for better tomorrow</p>
        )}
      </div>
    </div>
  );
}

export default LoadingWindow;
