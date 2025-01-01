import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/Header.css"; // External CSS file

const Header = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogout = () => {
      // Clear any session or authentication data if needed
      localStorage.removeItem("authToken"); // Example: Remove authentication token
      sessionStorage.clear(); // Clear session data
  
      // Redirect to login page
      navigate("/login");
    };
  return (
    <header className="d-flex justify-content-end p-3">
      <div className="dropdown">
        {/* User Icon as Dropdown Trigger */}
        <i
          className="fa-regular fa-circle-user"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ fontSize: "20px", cursor: "pointer" }}
        ></i>

        {/* Dropdown Menu */}
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li>
            <a className="dropdown-item" href="/my-account">
              <i className="fa-regular fa-user me-2"></i>マイアカウント
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleLogout}  style={{
                cursor: "pointer",
              }}>
              <i className="fa-solid fa-right-from-bracket me-2"></i>ログアウト
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
