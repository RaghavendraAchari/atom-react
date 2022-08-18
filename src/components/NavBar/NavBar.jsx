import "./NavBar.css";
import React from "react";
import { MaterialSymbolsContactsRounded } from "../../assets/ImageComponents/ContactImage";

class NavBar extends React.Component {
  state = {
    brandName: "Atom",
  };
  render() {
    return (
      <header>
        <div className="nav-wrapper">
          <div className="brand-name">
            <img src="./assets/atom-logo.svg" alt="brand logo" />

            {this.state.brandName}
          </div>
          <nav>
            <a href="#contactme">
              Contact Me
              <MaterialSymbolsContactsRounded style={{ margin: "0 4px" }} />
            </a>
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
