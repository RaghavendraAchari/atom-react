import "./NavBar.scss";
import React from "react";
import { MaterialSymbolsContactsRounded } from "../../assets/ImageComponents/ContactImage";
import { Link, Route, Routes } from "react-router-dom";
import { USER_TOKEN } from "../../services/authService";
// import {useMatch} from "react-router-dom";

function NavBar() {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="brandwrapper">
          <Link to="%PUBLIC_URL%" id="brandname">
            {/* Atom <strong className="name">| By Raghav Achari</strong> */}
            <img
              className="brand-logo"
              src={"%PUBLIC_URL%/assets/atom-icon.svg"}
              alt="brand logo"
            />
          </Link>
        </div>
        <nav>
          <Routes>
            <Route
              path={"%PUBLIC_URL%/photography/*"}
              element={
                <Link to={"%PUBLIC_URL%/photography/"}>
                  <strong id="photography">Photography</strong>
                </Link>
              }
            />
            <Route
              path={"%PUBLIC_URL%/art/*"}
              element={
                <Link to={"%PUBLIC_URL%/art"}>
                  <strong id="art">Art</strong>
                </Link>
              }
            />
            <Route
              path={"%PUBLIC_URL%/"}
              element={
                <a href="#AboutMe">
                  Contact Me
                  <MaterialSymbolsContactsRounded id="contactIcon" />
                </a>
              }
            />
            <Route
              path={"%PUBLIC_URL%/admin/*"}
              element={
                <Link to={""}>
                  <strong id="art">
                    {sessionStorage.getItem(USER_TOKEN) ? "Admin" : ""}
                  </strong>
                </Link>
              }
            />
            <Route
              path={"*"}
              element={
                <Link to={"/"}>
                  <strong>Home</strong>
                </Link>
              }
            />
          </Routes>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
