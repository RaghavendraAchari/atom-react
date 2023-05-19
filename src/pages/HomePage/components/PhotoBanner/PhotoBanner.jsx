import React from "react";
import ActionButton from "../../../../components/ActionButton/ActionButton";

import Styles from "./PhotoBanner.module.scss";

function PhotoBanner() {
  return (
    <div className={Styles.photoBanner}>
      <img className={Styles.photoBannerImage} src={process.env.PUBLIC_URL + "/assets/PhotoBanner.webp"} alt="PhotoBanner"  />
      <div className={Styles.contents}>
        <h1 className={Styles.h1}>Photography</h1>
        <p className={Styles.p}>
          Art is something that always reminds us of how beautiful things can
          be, and it develops the creativity in ways we can't think about.
          Photography has made me look in to those arts, shapes and beauties of
          the nature which made me capture some of the moments that I personally
          like. Hope you would find it interesting.
        </p>
        <div className={Styles.buttonWrapper}>
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
