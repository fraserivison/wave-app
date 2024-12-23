import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import SignUpForm from '../Authentication/SignUpForm';
import SignInForm from '../Authentication/SignInForm';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      welcomeMessage: 'Welcome, please sign in!',
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
      welcomeMessage: prevState.isSignedIn
        ? 'Welcome, please sign in!'
        : 'Welcome back, DJ!',
    }));
  };

  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">My Logo</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
             <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </div>
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                {this.state.welcomeMessage}
              </span>
              <button className="btn btn-outline-light" onClick={this.toggleSignInForm}>
                {this.state.isSignedIn ? 'Sign Out' : 'Sign In'} 
              </button>
              <button className="btn btn-outline-light" onClick={this.toggleSignUpForm}>
                  Sign Up
              </button>
            </div>
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

