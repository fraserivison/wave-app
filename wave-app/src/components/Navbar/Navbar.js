import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import SignUpForm from '../Authentication/SignUpForm';
import SignInForm from '../Authentication/SignInForm';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isSignInFormVisible: false,
      isSignUpFormVisible: false,
    };
  }

  toggleSignUpForm = () => {
    this.setState((prevState) => ({
      isSignUpFormVisible: !prevState.isSignUpFormVisible,
      isSignInFormVisible: false,
    }));
  };

  toggleSignInForm = () => {
    this.setState((prevState) => ({
      isSignInFormVisible: !prevState.isSignInFormVisible,
      isSignUpFormVisible: false,
    }));
  };

  toggleSignIn = () => {
    this.setState((prevState) => ({
      isSignedIn: !prevState.isSignedIn,
    }));
  };

  render() {
    return (
      <>
        <nav className={`${styles.customNavbar} navbar navbar-dark bg-dark`}>
          <div className="container-fluid">
            {/* Logo on the left */}
            <Link className={`${styles.brand}`} to="/">My Logo</Link>
            
            {/* Navbar items on the right */}
            <div className="d-flex align-items-center ms-auto flex-wrap">
              <Link className={`${styles.navLink}`} to="/about">About</Link>
              <Link className={`${styles.navLink}`} to="/contact">Contact</Link>
              {this.state.isSignedIn && (
                <span className="navbar-text me-3">Welcome back, DJ!</span>
              )}
              <button className="btn btn-outline-light btn-sm" onClick={this.toggleSignInForm}>
                {this.state.isSignedIn ? 'Sign Out' : 'Sign In'} 
              </button>
              <button className="btn btn-outline-light ms-2 btn-sm" onClick={this.toggleSignUpForm}>
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        {/* Render the SignInForm if isSignInFormVisible is true */}
        {this.state.isSignInFormVisible && (
          <div className="container mt-3">
            <SignInForm />
          </div>
        )}

        {/* Render the SignUpForm if isSignUpFormVisible is true */}
        {this.state.isSignUpFormVisible && (
          <div className="container mt-3">
            <SignUpForm />
          </div>
        )}
      </>
    );
  }
}

export default Navbar;