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
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const [errors, setErrors] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

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

  const handleDropdownToggle = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <Container fluid className={styles.pageWrapper}>
      {/* Hero Section */}
      <Row className={styles.heroSection}>
        <Col>
          <div className={styles.heroContent}>
          <h1 className={styles.eventsHeading}>Events</h1>
            <p className={styles.infoBox}>
              Promote, attend and
              <Link to="/events/create" className={styles.link}>
                {" share "}
              </Link>
              events.
            </p>
          </div>
        </Col>
      </Row>

      {/* Info Section */}
      <Row className="mt-3">
        <Col xs={12} md={6}>
          <div className={styles.eventsCard}>
            <h5 className={styles.eventsSubHeading}>Local Community Events</h5>
            <p className={styles.eventsText}>
              Discover events happening near you! Connect with local talent and
              music lovers nearby.
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className={styles.eventsCard}>
            <h5 className={styles.eventsSubHeading}>Strictly Electronic</h5>
            <p className={styles.eventsText}>
              Discover DJ sets, underground raves, and electronic music
              nights— house, techno, the lot!
            </p>
          </div>
        </Col>
      </Row>

      <Row className={`mt-3 ${styles.eventsRow}`}>
        <Col xs={12} md={6}>
          <div className={styles.eventsCard}>
            <h5 className={styles.eventsSubHeading}>Host Your Own</h5>
            <p className={styles.eventsText}>
              Planning a house gig, festival, or DJ night? Share your event and
              invite fans to join.
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className={styles.eventsCard}>
            <h5 className={styles.eventsSubHeading}>Stay Informed</h5>
            <p className={styles.eventsText}>
              Get updates on trending events and music releases from your
              favourites- never miss a beat!
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12}>
          <div className={styles.eventsCard}>
            <h5 className={styles.eventsHeading}>Get Involved</h5>
            <p className={styles.eventsText}>
              Join groups, volunteer, or attend open discussions with peers.
            </p>
          </div>
        </Col>
      </Row>

      {/* Search Bar & Event Results */}
      <Row className="mt-4">
        <Col>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search event name, location, genre..."
            />
          </Form>

          {errors && (
            <Alert variant="danger" className="mt-3">
              {errors.detail || "An error occurred. Please try again later."}
            </Alert>
          )}

          {hasLoaded ? (
            events.results.length ? (
              <InfiniteScroll
                dataLength={events.results.length}
                loader={<Asset spinner />}
                hasMore={!!events.next}
                next={() => fetchMoreData(events, setEvents)}
              >
                <Row className={styles.rowNudge}>
                  {events.results.map((event) => (
                    <Col key={event.id} xs={12} md={6} className="mb-4">
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
            )
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
