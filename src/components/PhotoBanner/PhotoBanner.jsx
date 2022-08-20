import "./PhotoBanner.css";
import React from "react";
import ActionButton from "../ActionButton/ActionButton";

class PhotoBanner extends React.Component {
  state = {
    link: "https://drive.google.com/uc?id=1lGIE896Kg_e40jvqfEMylmRuSoSuJ_5M",
  };
  render() {
    return (
      <div className="photoBanner">
        <div className="contents">
          <h1>Photography</h1>
          <p>
            Art is something that always reminds us how beautiful things can be,
            and it develops the creativity in ways we can't think about.
            Photography has made me look in to those arts, shapes and beauty of
            the nature and that made me to capture some of the moments that I
            personally like. Hope you would find it interesting.
          </p>
          <div className="button-wrapper">
            <ActionButton text="Explore More" showImage="true"></ActionButton>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoBanner;
