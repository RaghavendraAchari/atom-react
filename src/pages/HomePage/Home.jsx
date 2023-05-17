import AboutMe from "./components/AboutMe/AboutMe";
import PhotoBanner from "./components/PhotoBanner/PhotoBanner";
import React from "react";

import "./Home.css";
import ArtBanner from "./components/ArtBanner/ArtBanner";

class Home extends React.Component {
  render() {
    return (
      <div>
        <PhotoBanner />
        <ArtBanner />
        <AboutMe />
      </div>
    );
  }
}

export default Home;
