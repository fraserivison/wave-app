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
          <Link to="/" className={`${styles.navLink} nav-link text-light`}>
            <FaHome className={styles.icon} />
            {isExpanded && <span className={styles.text}>Home</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className={`${styles.navLink} nav-link text-light`}>
            <FaUser className={styles.icon} />
            {isExpanded && <span className={styles.text}>Profile</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/discover" className={`${styles.navLink} nav-link text-light`}>
            <FaSearch className={styles.icon} />
            {isExpanded && <span className={styles.text}>Discover</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className={`${styles.navLink} nav-link text-light`}>
            <FaQuestion className={styles.icon} />
            {isExpanded && <span className={styles.text}>Support</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
