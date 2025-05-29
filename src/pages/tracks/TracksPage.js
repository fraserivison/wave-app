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

const infoCardData = [
  {
    icon: "🎧",
    shortTitle: "Explore",
    fullTitle: "Explore Trending Genres",
    description:
      "Stay updated with the latest sounds and filter through your favourites."
  },
  {
    icon: "📢",
    shortTitle: "Promote",
    fullTitle: "Promote Your Tracks",
    description:
      "Boost your reach by submitting your music to playlists and featured spots."
  },
  {
    icon: "🤝",
    shortTitle: "Connect",
    fullTitle: "Connect with Artists",
    description:
      "Rate tracks, leave feedback and build your network."
  },
  {
    icon: "💡",
    shortTitle: "Support",
    fullTitle: "Get Artist Support",
    description:
      "Access resources, tips, and feedback to help you grow your music career and reach new audiences."
  }
];

function InfoCard({ icon, shortTitle, fullTitle, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.infoCard}>
      {!expanded ? (
        <>
          <div className={styles.iconCenter}>{icon}</div>
          <h5 className={`${styles.infoHeader} ${styles.titleCenter}`}>
            {shortTitle}
          </h5>
        </>
      ) : (
        <>
          <h5 className={styles.infoHeader}>{fullTitle}</h5>
          <p className={styles.infoText}>{description}</p>
        </>
      )}
      <div
        className={styles.learnMoreLink}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show less" : "Learn more"}
      </div>
    </div>
  );
}


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
    <Container fluid className={styles.pageWrapper}>
      <Row className={styles.heroSection}>
        <Col>
          <div className={styles.heroContent}>
            <h1>Discover</h1>
            <p className={styles.infoBox}>
              Discover, rate and <Link to="/tracks/create" className={styles.link}>share</Link> your music with the community.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-3" style={{ alignItems: "stretch" }}>
        {[0, 2].map((startIndex) => (
          <Col key={startIndex} xs={12} md={4} className={styles.infoCol}>
            <div className={styles.infoCardWrapper}>
              {infoCardData.slice(startIndex, startIndex + 2).map((card, idx) => (
                <InfoCard key={idx} {...card} />
              ))}
            </div>
          </Col>
        ))}

        <Col xs={12} md={4}>
          <TopTracks />
          <ArtistSpotlight />
          <StatsSection />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div className={styles.infoImage} aria-label="Music promotion" />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Testimonials />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
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
                    <Col key={track.id} xs={12} sm={6} md={4} lg={3}>
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
      </Row>
    </Container>
  );
}

export default TracksPage;

