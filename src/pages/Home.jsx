import ArtBanner from "../components/ArtBanner/ArtBanner";
import AboutMe from "../components/AboutMe/AboutMe";
import PhotoBanner from "./../components/PhotoBanner/PhotoBanner";
import React from "react";
import Footer from "../components/Footer/Footer";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <PhotoBanner />
        <ArtBanner />
        <AboutMe />
        <Footer />
      </div>
    );
  }
}

export default Home;
