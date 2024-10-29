import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  handleSignInOut = () => {
    this.setState((prevState) => ({
      isSignedIn: !prevState.isSignedIn,
    }));
  };  

  render() {
    return (
      <nav className="navbar bg-dark text-light p-3">
        <h3 className="navbar-logo">Logo Here</h3>
        <p className="navbar-welcome">
          {this.state.isSignedIn ? 'Welcome back!' : 'Welcome, please sign in'}
        </p>
        <button className="btn btn-outline-light" onClick={this.handleSignInOut}>
          {this.state.isSignedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
    );
  }
}

export default Navbar;
