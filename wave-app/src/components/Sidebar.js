import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar bg-dark text-light p-3">
      <h3 className="text-neon-blue">Wave</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="#link1" className="nav-link text-light">Home</a>
        </li>
        <li className="nav-item">
          <a href="#link2" className="nav-link text-light">Discover</a>
        </li>
        <li className="nav-item">
          <a href="#link3" className="nav-link text-light">Projects</a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
