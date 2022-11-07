import { useLocation } from "react-router";
import Carousel from "../../../components/Carousel/Carousel";
import { LINE_SPLIT } from "../../../services/data";
import "./ArtDetails.scss";

function ArtDetails(props) {
  const location = useLocation();
  const { feedDetails, photoDetails } = location.state;
  const description = feedDetails.description.split(LINE_SPLIT);

  return (
    <div id="art-details-page" className="avoid-nav">
      <div className="top-contents">
        <h2 className="title">{feedDetails.title}</h2>
        <h4 className="date">{feedDetails.date}</h4>
        {description.map((element, index) => (
          <p key={index} className="short-desc indent reading-text">
            {element}
          </p>
        ))}
      </div>
      <div className="photo-container">
        <Carousel items={photoDetails} />
      </div>
      <p className="reading-text">{feedDetails.details}</p>
    </div>
  );
}

export default ArtDetails;
