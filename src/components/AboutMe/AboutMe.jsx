import "./AboutMe.css";
import ActionButton from "../ActionButton/ActionButton";

function AboutMe() {
  return (
    <div className="aboutMe" id="AboutMe">
      <div className="wrapper">
        <div className="main-content">
          <h1>About Me</h1>
          <p className="name">Raghavendra Achari</p>
          <p className="about-text">
            A software developer by core. Also likes to capture photos and play
            music.
          </p>

          <ActionButton text="Know More" showImage={false} />
        </div>
        <div className="photo-container">
          <div className="photo">
            <img
              src="/assets/programming-g23b1f4e10_640.jpg"
              alt="dev"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
