import ArtBanner from "../components/ArtBanner/ArtBanner";
import AboutMe from "../components/AboutMe/AboutMe";
import PhotoBanner from "./../components/PhotoBanner/PhotoBanner";
import React from "react";

import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="container  avoid-nav">
        <PhotoBanner />
        <ArtBanner />
        <AboutMe />
      </div>
    );
  }
}

export default Home;
