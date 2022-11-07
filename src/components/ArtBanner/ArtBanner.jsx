import "./ArtBanner.scss";
import ActionButton from "../ActionButton/ActionButton";

function ArtBanner() {
  return (
    <div className="artBanner">
      <div className="contents">
        <h1>Art</h1>
        <p>
          Explore some of the arts that I created during some of the boring
          times and also on normal times.
        </p>
        <div className="button-wrapper">
          <ActionButton
            to="/art"
            text="Explore More"
            showImage={true}
            imageType="Art"
          ></ActionButton>
        </div>
      </div>
    </div>
  );
}

export default ArtBanner;
