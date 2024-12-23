import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './sidebar/Sidebar.module.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`${css.sidebar} ${isExpanded ? css.expanded : ''}`}>
      <h3 onClick={toggleSidebar} className={css.sidebarToggle}>
        {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
      </h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-light">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/discover" className="nav-link text-light">Discover</Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className="nav-link text-light">Support</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;



