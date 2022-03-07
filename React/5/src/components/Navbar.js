import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header>
        <nav className="navbar">
          <NavLink
            to="/"
            className={"navbar__link"}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
          >
            Home
          </NavLink>
          <NavLink
            to="./students"
            className={"navbar__link"}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
          >
            Students
          </NavLink>
          <NavLink
            to="./contact-us"
            className={"navbar__link"}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
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
