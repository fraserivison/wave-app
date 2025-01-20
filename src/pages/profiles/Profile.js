import React from "react";
import { Card } from "react-bootstrap";

const Profile = ({ profile }) => {
  return (
    <div>
      {/* Tracks Section */}
      <Card className="mb-4">
        <Card.Body>
          <h4>Tracks</h4>
          {profile.tracks.length ? (
            profile.tracks.map((track) => (
              <Card key={track.id} className="mb-2">
                <Card.Body>
                  <h5>{track.title}</h5>
                  <p>
                    <strong>Artist:</strong> {track.artist}
                  </p>
                  <p>
                    <strong>Genre:</strong> {track.genre}
                  </p>
                </Card.Body>
              </Card>
            ))
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
            profile.events.map((event) => (
              <Card key={event.id} className="mb-2">
                <Card.Body>
                  <h5>{event.name}</h5>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No events available</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;






