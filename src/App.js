import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom"; // Import Redirect
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import TrackCreateForm from "./pages/tracks/TrackCreateForm";
import TrackPage from "./pages/tracks/TrackPage";
import TracksPage from "./pages/tracks/TracksPage"; // TracksPage is the discovery page
import TrackEditForm from "./pages/tracks/TrackEditForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Redirect root URL to /discover */}
          <Route exact path="/" render={() => <Redirect to="/discover" />} />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/tracks/create" render={() => <TrackCreateForm />} />
          <Route exact path="/events/create" render={() => <EventCreateForm />} />
          <Route exact path="/tracks/:id" render={() => <TrackPage />} />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route exact path="/tracks/:id/edit" render={() => <TrackEditForm />} />
          
          {/* TracksPage (discovery page) will now be the main route */}
          <Route path="/discover" component={TracksPage} />
          
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

