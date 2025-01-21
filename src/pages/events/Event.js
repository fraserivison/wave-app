import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    name, // Use 'name' as the event title
    genre,
    updated_at,
    date,
    location,
    description,
    eventPage = false
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  // Format the genre to be more readable (e.g., "dub_step" -> "Dubstep")
  const formattedGenre = genre
    ? genre.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";

  // Format the date to be more readable
  const formattedDate = date ? new Date(date).toLocaleString() : "";

  // Format the location (you can add more logic if needed to simplify or modify the location format)
  const formattedLocation = location || "";

  return (
    <Card className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && eventPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`} />
      <Card.Body>
        {/* Display the event name */}
        {name && (
          <Card.Title>{name}</Card.Title>
        )}
        {description && <Card.Text>{description}</Card.Text>}
        {formattedGenre && (
          <Card.Text>
            <strong>Genre:</strong> {formattedGenre}
          </Card.Text>
        )}
        {formattedDate && (
          <Card.Text>
            <strong>Date:</strong> {formattedDate}
          </Card.Text>
        )}
        {formattedLocation && (
          <Card.Text>
            <strong>Location:</strong> {formattedLocation}
          </Card.Text>
        )}
        <div className={styles.EventBar}></div>
      </Card.Body>
    </Card>
  );
};

export default Event;



