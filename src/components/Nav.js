import React from "react";
import "../App.css"; // Optional, for custom styles
import logo from "../assets/text.png"; // Import image

function Nav() {


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary color">
      <div className="container-fluid" style={{ alignItems:"normal" }}>
        <img
          src={logo} // Use imported image
          alt="Brand Logo"
          className="navbar-brand start"
          style={{ height: "36.06px", width: "188px" }}
        />
      </div>
    </nav>
  );
}

export default Nav;

