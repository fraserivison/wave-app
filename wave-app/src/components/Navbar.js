import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      welcomeMessage: 'Welcome, please sign in!'
    };
  }

  toggleSignIn = () => {
    this.setState((prevState) => ({
      isSignedIn: !prevState.isSignedIn,
      welcomeMessage: prevState.isSignedIn ? 'Welcome, please sign in!' : 'Welcome back, DJ!'
    }));
  }; 

  render() {
    return (
      <nav className="navbar bg-dark text-light">
        <div className="container-fluid">
            <span className="navbar-brand">My Logo</span>
            <button className="btn btn-outline-light" onClick={this.toggleSignIn}>
              {this.state.isSignedIn ? 'Sign Out' : 'Sign In'} 
            </button>
            <span className="navbar-text">
              {this.state.welcomeMessage}
            </span>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

