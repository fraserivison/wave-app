import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

import TopTracks from "../../components/TopTracks";
import ArtistSpotlight from "../../components/ArtistSpotlight";
import StatsSection from "../../components/StatsSection";
import Testimonials from "../../components/Testimonials";

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
      <Col xs={12} lg={8} className="py-2 p-0 p-lg-2">
        <h1>Discover</h1>
        <p className={styles.infoBox}>
          Discover, rate and{" "}
          <Link to="/tracks/create" className={styles.link}>share</Link>{" "}
          your music with the community.
        </p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search tracks, genre, artist..."
          />
        </Form>

        {hasLoaded ? (
          tracks.results.length ? (
            <InfiniteScroll
              dataLength={tracks.results.length}
              loader={<Asset spinner />}
              hasMore={!!tracks.next}
              next={() => fetchMoreData(tracks, setTracks)}
            >
              <Row className={styles.TrackContainerRow}>
                {tracks.results.map((track) => (
                  <Col key={track.id} xs={6} sm={6} md={4} lg={4}>
                    <Track {...track} setTracks={setTracks} />
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

      <Col xs={12} lg={4} className="py-2 p-0 p-lg-2">
        <TopTracks />
        <ArtistSpotlight />
        <StatsSection />
        <Testimonials />
      </Col>
    </Row>
  );
}

export default TracksPage;
