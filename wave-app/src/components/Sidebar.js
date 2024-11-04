import React from 'react';
import css from './Sidebar.module.css';

function Sidebar() {
  return (
    <nav className={`${css.sidebar} bg-dark text-light p-3`}>
      <h3 className="text-neon-blue">Wave</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="#link1" className="nav-link text-light">Home</a>
        </li>
        <li className="nav-item">
          <a href="#link2" className="nav-link text-light">Discover</a>
        </li>
        <li className="nav-item">
          <a href="#link3" className="nav-link text-light">Profile</a>
        </li>
        <li className="nav-item">
          <a href="#link3" className="nav-link text-light">Settings</a>
        </li>
        <li className="nav-item">
          <a href="#link3" className="nav-link text-light">Support</a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
