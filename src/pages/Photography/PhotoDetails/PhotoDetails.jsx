import "./PhotoDetails.scss";
import { useLocation } from "react-router";
import Carousel from "../../../components/Carousel/Carousel";
import { LINE_SPLIT } from "../../../services/data";
import { getReadableDate } from "../../../utils/dateUtils";

function PhotoDetails(props) {
  const location = useLocation();
  const { feedDetails, photoDetails } = location.state;
  const details = feedDetails.details.split(LINE_SPLIT);

  return (
    <div id="photo-details-page" className="avoid-nav">
      <div className="top-contents">
        <h2 className="title">{feedDetails.title}</h2>
        <h4 className="date">{getReadableDate(feedDetails.date)}</h4>
        <p className="short-desc indent reading-text">
          {feedDetails.description}{" "}
        </p>
      </div>
      <div className="photo-container">
        <Carousel items={photoDetails} />
      </div>
      {details.map((element, index) => (
        <p key={index} className="details reading-text">
          {element}
        </p>
      ))}
    </div>
  );
}

export default PhotoDetails;
