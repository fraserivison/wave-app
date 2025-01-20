import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";

// Helper function to format genre (e.g., "house_music" -> "House Music")
const formatGenre = (genre) => {
  return genre
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Profile = ({ profile }) => {
  return (
    <div>
      {/* Tracks Section */}
      <Card className="mb-4">
        <Card.Body>
          <h4>Tracks</h4>
          {profile.tracks.length ? (
            <Row xs={1} sm={2} md={2} lg={2} className="g-5"> {/* Increased gap between cards */}
              {profile.tracks.map((track) => (
                <Col key={track.id}>
                  <Card className={`${styles.TrackCard} ${styles.CardTile}`}>
                    <Card.Body>
                      <h5 className="text-white">{track.title}</h5>
                      <p className="text-white">
                        <strong>Artist:</strong> {track.artist}
                      </p>
                      <p className="text-white">
                        <strong>Genre:</strong> {formatGenre(track.genre)}
                      </p>
                      <p className="text-white">
                        <strong>Rating:</strong> {track.average_rating || "N/A"}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No tracks available</p>
          )}
        </Card.Body>
      </Card>

      {/* Events Section */}
      <Card>
        <Card.Body>
          <h4>Events</h4>
          {profile.events.length ? (
            <Row xs={1} sm={2} md={2} lg={2} className="g-5"> {/* Increased gap between cards */}
              {profile.events.map((event) => (
                <Col key={event.id}>
                  <Card className={`${styles.EventCard} ${styles.CardTile}`}>
                    <Card.Body>
                      <h5 className="text-white">{event.name}</h5>
                      <p className="text-white">
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-white">
                        <strong>Location:</strong> {event.location}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No events available</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;








