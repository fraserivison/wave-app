import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import TrackCreateForm from "./pages/tracks/TrackCreateForm";
import TrackPage from "./pages/tracks/TrackPage";
import TracksPage from "./pages/tracks/TracksPage";
import TrackEditForm from "./pages/tracks/TrackEditForm";
import EventEditForm from "./pages/events/EventEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Public Routes (Sign-in and Sign-up) */}
          <Route exact path="/signin">
            {currentUser ? <Redirect to="/discover" /> : <SignInForm />}
          </Route>
          <Route exact path="/signup">
            {currentUser ? <Redirect to="/discover" /> : <SignUpForm />}
          </Route>

          {/* Redirect Root ("/") to "/signin" if user is not authenticated */}
          <Route exact path="/">
            {currentUser ? <Redirect to="/discover" /> : <Redirect to="/signin" />}
          </Route>

          {/* Protected Routes */}
          <Route exact path="/tracks/create">
            {currentUser ? <TrackCreateForm /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/events/create">
            {currentUser ? <EventCreateForm /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/tracks/:id">
            {currentUser ? <TrackPage /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/events/:id">
            {currentUser ? <EventPage /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/tracks/:id/edit">
            {currentUser ? <TrackEditForm /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/events/:id/edit">
            {currentUser ? <EventEditForm /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/events">
            {currentUser ? <EventsPage /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/discover">
            {currentUser ? <TracksPage /> : <Redirect to="/signin" />}
          </Route>

          {/* Add routes for ProfilePage and EditProfilePage */}
          <Route exact path="/profiles/:id">
            {currentUser ? <ProfilePage /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/profiles/:id/edit">
            {currentUser ? <ProfileEditForm /> : <Redirect to="/signin" />}
          </Route>

          {/* Fallback Route for "Page Not Found" */}
          <Route>
            <p>Page not found!</p>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;






