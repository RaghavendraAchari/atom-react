import "./AboutMe.css";
function AboutMe() {
  return (
    <div className="aboutMe">
      <div className="wrapper">
        <div className="main-content">
          <h1>About Me</h1>
          <p className="name">Raghavendra Achari</p>
          <p className="about-text">
            A software developer by core. Also likes to capture photos and play
            music.
          </p>
        </div>
        <div className="photo-container">
          <img src="" className="photo" alt="dev"></img>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
