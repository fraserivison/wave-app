import React from 'react';
import { Link } from 'react-router-dom';
import css from './Sidebar.module.css';

function Sidebar() {
  return (
    <nav className={css.sidebar}>
      <h3>Wave</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/discover" className="nav-link text-light">Discover</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-light">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className="nav-link text-light">Support</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

