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
        {" "}
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            <FaHome className="icon" style={{ color: "#00ffcc" }} />
            {isExpanded && " Home"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-light">
            <FaUser className="icon" style={{ color: "#00ffcc" }} />
            {isExpanded && " Profile"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/discover" className="nav-link text-light">
            <FaSearch className="icon" style={{ color: "#00ffcc" }} />
            {isExpanded && " Discover"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className="nav-link text-light">
            <FaQuestion className="icon" style={{ color: "#00ffcc" }} />
            {isExpanded && " Support"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
