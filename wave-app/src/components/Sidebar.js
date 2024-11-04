import React from 'react';
import { Link } from 'react-router-dom';
import css from './Sidebar.module.css';

function Sidebar() {
  return (
    <nav className={`${css.sidebar} bg-dark text-light p-3`}>
      <h3 className="text-neon-blue">Wave</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Discover</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Settings</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Support</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
