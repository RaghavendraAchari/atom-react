import "./PhotoDetails.scss";
import { useLocation } from "react-router";
import Carousel from "../../../components/Carousel/Carousel";

function PhotoDetails(props) {
  const location = useLocation();
  const { feedDetails, photoDetails } = location.state;

  return (
    <div id="photo-details-page">
      <div className="top-contents">
        <h2 className="title">{feedDetails.title}</h2>
        <h4 className="date">{feedDetails.date}</h4>
        <p className="short-desc indent">{feedDetails.description} </p>
      </div>
      <div className="photo-container">
        <Carousel items={photoDetails} />
      </div>
      <p>{feedDetails.details} </p>
    </div>
  );
}

export default PhotoDetails;
