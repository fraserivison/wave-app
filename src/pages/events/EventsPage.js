import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
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
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${query}`
        );
        setEvents(data);
        setHasLoaded(true);
        setErrors(null);
      } catch (err) {
        console.log(err);
        setHasLoaded(true);
        if (err.response) {
          setErrors(err.response?.data);
        } else {
          setErrors({ detail: "An error occurred while fetching events." });
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
          <p className={styles.infoBox}>
            Discover, attend and{" "}
            <Link to="/events/create" className={styles.link}>
              share
            </Link>{" "}
            events with the community.
          </p>
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
                  dataLength={events.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!events.next}
                  next={() => fetchMoreData(events, setEvents)}
                >
                  <Row>
                    {events.results.map((event) => (
                      <Col key={event.id} xs={12} md={6} className="mb-4">
                        <Link to={`/events/${event.id}`} className="text-decoration-none">
                          <Event
                            {...event}
                            setEvents={setEvents}
                            eventPage={false}
                          />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </InfiniteScroll>
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


