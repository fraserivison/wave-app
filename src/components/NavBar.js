import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const location = useLocation();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const addTrackIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/tracks/create"
    >
      <i className={`far fa-plus-square ${styles.NavIcon}`}></i>Add track
    </NavLink>
  );

  const addEventIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/events/create"
    >
      <i className={`far fa-plus-square ${styles.NavIcon}`}></i>Add event
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/discover"
      >
        <i className={`fas fa-music ${styles.NavIcon}`}></i>Discover
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/events"
      >
        <i className={`fas fa-calendar-alt ${styles.NavIcon}`}></i>Events
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className={`fas fa-sign-out-alt ${styles.NavIcon}`}></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className={`fas fa-sign-in-alt ${styles.NavIcon}`}></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className={`fas fa-user-plus ${styles.NavIcon}`}></i>Sign up
      </NavLink>
    </>
  );

  // Determine if current path is homepage
  const isHomePage = location.pathname === "/";

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <h3
              className={`${styles.Branding} ${
                isHomePage ? styles.active : ""
              }`}
            >
              <i className="fa-solid fa-headphones-simple"></i>
              Wave
            </h3>
          </Navbar.Brand>
        </NavLink>

        {currentUser && (
          <>
            {addTrackIcon}
            {addEventIcon}
          </>
        )}

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          className={styles.NavToggle}
        >
          <i className="fas fa-bars"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
