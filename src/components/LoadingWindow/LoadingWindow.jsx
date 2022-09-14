import "./LoadingWindow.scss";
function LoadingWindow(props) {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="load-wrapp">
          {props.loader === "BounceLoader" ? (
            <div className="load-1">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          ) : (
            <div className="load-5">
              <div className="ring-2">
                <div className="ball-holder">
                  <div className="ball"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        {props.showCaption === true && (
          <p>
            Plant a tree now for better tomorrow <br />
            Loading..
          </p>
        )}
      </div>
    </div>
  );
}

export default LoadingWindow;
