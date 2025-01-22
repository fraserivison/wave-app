import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";  // Import Alert for error messages

import Event from "./Event";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function EventsPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState(null);  // State to hold any errors

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${query}`
        );
        setEvents(data);
        setHasLoaded(true);
        setErrors(null);  // Reset errors if the request is successful
      } catch (err) {
        console.log(err);
        setHasLoaded(true);
        if (err.response) {
          setErrors(err.response?.data);  // Set errors if the API returns an error
        } else {
          setErrors({ detail: "An error occurred while fetching events." });  // Fallback error message
        }
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Container className="py-3">
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={12}>
          <h1>Events</h1>
          {/* Search bar */}
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search event name, location, genre..."
            />
          </Form>

          {/* Show error messages if there are any */}
          {errors && (
            <Alert variant="danger">
              {errors.detail || "An error occurred. Please try again later."}
            </Alert>
          )}

          {hasLoaded ? (
            <>
              {events.results.length ? (
                <InfiniteScroll
                  children={events.results.map((event) => (
                    <Link key={event.id} to={`/events/${event.id}`}>
                      <Event
                        {...event}
                        setEvents={setEvents}
                        eventPage={false}
                      />
                    </Link>
                  ))}
                  dataLength={events.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!events.next}
                  next={() => fetchMoreData(events, setEvents)}
                />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EventsPage;






