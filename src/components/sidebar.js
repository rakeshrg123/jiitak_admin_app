import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import logo from "../assets/text.png";
import dashboardIcon from "../assets/Orange.svg";
import "../css/Dashboard.css";

const Sidebar = () => {
  return (
    <aside className="col-md-2 bg-light sidebar">
      <div className="logo mb-4">
        <img src={logo} alt="Brand Logo" className="navbar-brand" />
      </div>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <img
                src={dashboardIcon}
                alt="Dashboard Icon"
                className="nav-icon"
                style={{ fontSize: "20px", marginRight: "10px" }}
              />
              ダッシュボード
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/userList"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <i
                className="bi bi-people"
                style={{ fontSize: "20px", marginRight: "10px" }}
              ></i>
              登録ユーザー
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/gift"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <i
                className="bi bi-gift"
                style={{ fontSize: "20px", marginRight: "10px" }}
              ></i>
              当選者
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/admin"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <i
                className="fa-solid fa-user-tie"
                style={{ fontSize: "20px", marginRight: "10px" }}
              ></i>
              運営管理者
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
