import "./AboutMe.scss";

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

          {/* <ActionButton text="Know More" to="/aboutme" showImage={false} /> */}
          <a
            className="button button-small"
            target={"_blank"}
            rel="noreferrer"
            href="https://raghavendraachari.notion.site/Raghavendra-Achari-0baaf4b8126c4ee995c8bb957e587f04"
          >
            Know more about me
          </a>
          <a
            id="how-link"
            rel="noreferrer"
            target={"_blank"}
            href="https://raghavendraachari.notion.site/How-I-built-Atom-By-Raghav-fdb719c78e504a39b3a6a74f5fc5cad7"
          >
            How I built this Atom Site ?
          </a>
        </div>
        <div className="photo-container">
          <div className="photo">
            <img
              src={process.env.PUBLIC_URL + "/assets/programming-g23b1f4e10_640.jpg"}
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
