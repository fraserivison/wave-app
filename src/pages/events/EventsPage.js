import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import Asset from "../../components/Asset";
import { useLocation } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";

function EventsPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open

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

  // Function to handle opening and closing dropdowns
  const handleDropdownToggle = (id) => {
    // If the clicked dropdown is already open, close it; otherwise, open it
    if (openDropdownId === id) {
      setOpenDropdownId(null); // Close the dropdown
    } else {
      setOpenDropdownId(id); // Open the clicked dropdown
    }
  };

  return (
    <Container className="py-3">
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={12}>
          <h1>Events</h1>
          <p className={styles.infoBox}>
            Discover, attend and{" "}
            <a href="/events/create" className={styles.link}>
              share
            </a>{" "}
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
                  <Row className={styles.rowNudge}>
                    {events.results.map((event) => (
                      <Col key={event.id} xs={12} md={6} className="mb-4">
                        {/* Pass handleDropdownToggle to each Event component */}
                        <Event
                          {...event}
                          setEvents={setEvents}
                          eventPage={false}
                          openDropdownId={openDropdownId}
                          setOpenDropdownId={handleDropdownToggle}
                        />
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
