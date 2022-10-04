import { useState } from "react";
import "./Carousel.scss";

function Carousel(props) {
  const [selectedIndex, setImageIndex] = useState(0);
  const [totalImages] = useState(props.items.length);

  const changeImage = (index) => {
    if (index !== selectedIndex) setImageIndex(index);
  };
  function onPrevClicked() {
    setImageIndex((prev) => prev - 1);
  }
  function onNextClicked() {
    setImageIndex((prev) => prev + 1);
  }

  // useEffect(() => console.log(selectedIndex), [selectedIndex]);

  return (
    <div className="carousel">
      {props.items.map((element, index) => {
        return (
          <div
            className={
              selectedIndex === index ? "images selected-image" : "images"
            }
            key={index}
          >
            <img src={element.originalFileUrl} alt={"Album Photo" + index} />
            <p>
              *Only high quality images are shown here. It might take time to
              load.
            </p>
          </div>
        );
      })}

      <div className="image-nav">
        {props.items.map((element, index) => (
          <span
            key={index}
            className={
              selectedIndex === index
                ? "image-selector selected-nav"
                : "image-selector"
            }
            onClick={() => changeImage(index)}
          ></span>
        ))}
      </div>
      <div className="image-nav-buttons-wrapper">
        <button
          className="button nav-button prev-button"
          onClick={onPrevClicked}
          disabled={selectedIndex === 0}
        >
          Prev
        </button>
        <button
          className="button nav-button next-button"
          onClick={onNextClicked}
          disabled={selectedIndex === totalImages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Carousel;
