import "./PhotoBanner.scss";
import React from "react";
import ActionButton from "../ActionButton/ActionButton";

function PhotoBanner(props) {
  return (
    <div className="photoBanner banner-container">
      <div className="contents container">
        <h1>Photography</h1>
        <p>
          Art is something that always reminds us of how beautiful things can
          be, and it develops the creativity in ways we can't think about.
          Photography has made me look in to those arts, shapes and beauties of
          the nature which made me capture some of the moments that I personally
          like. Hope you would find it interesting.
        </p>
        <div className="button-wrapper">
          <ActionButton
            to="/photography/"
            text="Explore More"
            showImage={true}
            imageType="Photo"
          ></ActionButton>
        </div>
      </div>
    </div>
  );
}

export default PhotoBanner;
