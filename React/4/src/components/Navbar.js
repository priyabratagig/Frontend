import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  console.log("Nav");
  return (
    <>
      <header>
        <nav className="navbar">
          <NavLink
            to="./home"
            className={"navbar__link"}
            activeStyle={{ color: "red" }}
          >
            Home
          </NavLink>
          <NavLink
            to="./students"
            className={"navbar__link"}
            activeStyle={{ color: "red" }}
          >
            Students
          </NavLink>
          <NavLink
            to="./contact-us"
            className={"navbar__link"}
            activeStyle={{ color: "red" }}
          >
            Contact Us
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
