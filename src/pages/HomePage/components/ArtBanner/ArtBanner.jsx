import Styles from "./ArtBanner.module.scss";
import ActionButton from "../../../../components/ActionButton/ActionButton";

function ArtBanner() {
  return (
    <div className={Styles.artBanner}>
      
      <img className={Styles.image} src="assets/art-background.webp" alt="art-banner"  />
      <div className={Styles.contents}>
      <img className={[Styles.decorator, Styles.decoratorOne].join(" ")} src="assets/decorator.jpg" alt="dec 1" />

        <h1 className={Styles.h1}>Art</h1>
        <p  className={Styles.p}>
          Explore some of the arts that I created during some of the boring
          times and also on normal times.
        </p>
        <div className={Styles.buttonWrapper}>
          <ActionButton
            to="/art"
            text="Explore More"
            showImage={true}
            imageType="Art"
          ></ActionButton>
        </div>
      <img className={[Styles.decorator, Styles.decoratorTwo].join(" ")} src="assets/decorator.jpg" alt="dec 1" />

      </div>
    </div>
  );
}

export default ArtBanner;
