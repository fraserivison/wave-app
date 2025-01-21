import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Track from "./Track";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/TracksPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function TracksPage({ message, filter = "" }) {
  const [tracks, setTracks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { data } = await axiosReq.get(`/tracks/?${filter}search=${query}`);
        setTracks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTracks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className={`h-100 ${styles.TracksPageContainer}`}>
      <Col className="py-2 p-0 p-lg-2" lg={12} md={10} xs={12}>
        <h1>Discover</h1>
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
            placeholder="Search tracks, genre, artist..."
          />
        </Form>

        {hasLoaded ? (
          <>
            {tracks.results.length ? (
              <InfiniteScroll
                dataLength={tracks.results.length}
                loader={<Asset spinner />}
                hasMore={!!tracks.next}
                next={() => fetchMoreData(tracks, setTracks)}
              >
                <Row className={styles.TrackContainerRow}>
                  {tracks.results.map((track) => (
                    <Col
                      key={track.id}
                      xs={6} // 2 items per row on mobile (small devices)
                      sm={6} // 2 items per row on small screens
                      md={4} // 3 items per row on medium screens
                      lg={3} // 4 items per row on large screens
                      className={`mb-2 ${styles.TrackCol}`}
                    >
                      <Track {...track} setTracks={setTracks} />
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
  );
}

export default TracksPage;



