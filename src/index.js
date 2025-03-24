import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileProvider } from "./contexts/ProfileContext";

ReactDOM.render(
  <Router>
    <CurrentUserProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </CurrentUserProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();

