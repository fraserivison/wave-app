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
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/signin">
            {currentUser ? <Redirect to="/discover" /> : <SignInForm />}
          </Route>
          <Route exact path="/signup">
            {currentUser ? <Redirect to="/discover" /> : <SignUpForm />}
          </Route>

          {/* Redirect "/" based on authentication */}
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
          <Route path="/events">
            {currentUser ? <EventsPage /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/discover">
            {currentUser ? <TracksPage /> : <Redirect to="/signin" />}
          </Route>

          {/* Fallback Route */}
          <Route>
            <p>Page not found!</p>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;


