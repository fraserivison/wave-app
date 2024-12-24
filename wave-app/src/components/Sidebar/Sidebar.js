import React, { useState } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaHome,
  FaUser,
  FaSearch,
  FaQuestion,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`${styles.sidebar} ${isExpanded ? styles.expanded : ""}`}>
      <h3 onClick={toggleSidebar} className={styles.sidebarToggle}>
        {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
      </h3>
      <ul className="nav flex-column gap-4">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            <div className="icon-container">
              <FaHome className="icon" style={{ color: "#00ffcc" }} />
            </div>
            {isExpanded && <div className="text-container">Home</div>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-light">
            <div className="icon-container">
              <FaUser className="icon" style={{ color: "#00ffcc" }} />
            </div>
            {isExpanded && <div className="text-container">Profile</div>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/discover" className="nav-link text-light">
            <div className="icon-container">
              <FaSearch className="icon" style={{ color: "#00ffcc" }} />
            </div>
            {isExpanded && <div className="text-container">Discover</div>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className="nav-link text-light">
            <div className="icon-container">
              <FaQuestion className="icon" style={{ color: "#00ffcc" }} />
            </div>
            {isExpanded && <div className="text-container">Support</div>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
