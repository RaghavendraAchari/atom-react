import "./NavBar.scss";
import React from "react";
import { MaterialSymbolsContactsRounded } from "../../assets/ImageComponents/ContactImage";
import { Link, Route, Routes } from "react-router-dom";
// import {useMatch} from "react-router-dom";

function NavBar() {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="brandwrapper">
          {/* <img src="./assets/atom-logo.svg" alt="brand logo" /> */}
          <Link to="/" id="brandname">
            Atom <strong className="name">| By Raghav Achari</strong>
          </Link>
        </div>
        <nav>
          <Routes>
            <Route
              path="/photography/*"
              element={
                <Link to="/photography">
                  <strong id="photography">Photography</strong>
                </Link>
              }
            />
            <Route
              path="/art/*"
              element={
                <Link to="/art">
                  <strong id="art">Art</strong>
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <a href="#AboutMe">
                  Contact Me
                  <MaterialSymbolsContactsRounded id="contactIcon" />
                </a>
              }
            ></Route>
          </Routes>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
