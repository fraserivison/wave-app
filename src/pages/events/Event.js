import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    genre,
    updated_at,
    date,
    location,
    description,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={currentUser?.profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && eventPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}></Link>
      <Card.Body>
        {description && <Card.Text>{description}</Card.Text>}
        {genre && (
          <Card.Text>
            <strong>Genre:</strong> {genre}
          </Card.Text>
        )}
        {date && (
          <Card.Text>
            <strong>Date:</strong> {date}
          </Card.Text>
        )}
        {location && (
          <Card.Text>
            <strong>Location:</strong> {location}
          </Card.Text>
        )}
        <div className={styles.EventBar}></div>
      </Card.Body>
    </Card>
  );
};

export default Event;
