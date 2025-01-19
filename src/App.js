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

// PrivateRoute component
function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />

          {/* Redirect unauthenticated users */}
          <Route exact path="/" render={() => <Redirect to="/discover" />} />

          {/* Private Routes */}
          <PrivateRoute exact path="/tracks/create" component={TrackCreateForm} />
          <PrivateRoute exact path="/events/create" component={EventCreateForm} />
          <PrivateRoute exact path="/tracks/:id" component={TrackPage} />
          <PrivateRoute exact path="/events/:id" component={EventPage} />
          <PrivateRoute exact path="/tracks/:id/edit" component={TrackEditForm} />
          <PrivateRoute path="/events" component={EventsPage} />
          <PrivateRoute path="/discover" component={TracksPage} />

          {/* Fallback Route */}
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;


