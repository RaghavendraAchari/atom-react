import { useNavigate } from "react-router-dom";
import { ArtIcon, CameraIcon } from "../../assets/ImageComponents/Icons";
import "./ActionButton.css";

function ActionButton({ to, imageType, showImage, text, state }) {
  const navigate = useNavigate();
  let image = null;
  if (showImage === true) {
    switch (imageType) {
      case "Photo":
        image = <CameraIcon />;
        break;
      case "Art":
        image = <ArtIcon />;
        break;
      default:
        image = <CameraIcon />;
    }
  }

  const handleClick = (event) => {
    if (state !== null && state !== undefined) navigate(to, { state: state });
    else navigate(to);
  };

  return (
    <button className="button" type="button" onClick={handleClick}>
      {text} {showImage === true ? image : ""}
    </button>
  );
}

export default ActionButton;
