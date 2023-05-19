import "./NavBar.scss";
import React from "react";
import { MaterialSymbolsContactsRounded } from "../../assets/ImageComponents/ContactImage";
import { Link, Route, Routes } from "react-router-dom";
import { USER_TOKEN } from "../../services/authService";
import { HashLink } from "react-router-hash-link";

function NavBar() {
  return (
    <header>
      <div className="nav-wrapper">
        <div className="brandwrapper">
          <Link to="/" id="brandname">
            {/* Atom <strong className="name">| By Raghav Achari</strong> */}
            <img
              className="brand-logo"
              src={process.env.PUBLIC_URL + "/assets/atom-icon.svg"}
              alt="brand logo"
            />
          </Link>
        </div>
        <nav>
          <Routes>
            <Route
              path={"/photography/*"}
              element={
                <Link to={"/photography/"}>
                  <strong id="photography">Photography</strong>
                </Link>
              }
            />
            <Route
              path={"/art/*"}
              element={
                <Link to={"/art"}>
                  <strong id="art">Art</strong>
                </Link>
              }
            />
            <Route
              path={"/"}
              element={
                <HashLink to="/#AboutMe">
                  Contact Me
                  <MaterialSymbolsContactsRounded id="contactIcon" />
                </HashLink>
              }
            />
            <Route
              path={"/admin/*"}
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
