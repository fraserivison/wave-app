import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";

const Profile = ({ profile }) => {
  return (
    <div>
      {/* Events Section */}
      <Card>
        <Card.Body>
          <h4>Events</h4>
          {profile.events.length ? (
            <Row xs={1} sm={2} md={2} lg={2} className="g-5">
              {profile.events.map((event) => (
                <Col key={event.id}>
                  <Card className={`${styles.EventCard} ${styles.CardTile}`}>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <h5 className="text-white text-center">{event.name}</h5>
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







