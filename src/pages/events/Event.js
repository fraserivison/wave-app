import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { Card } from "react-bootstrap";
import styles from "../../styles/Event.module.css";

const Event = (props) => {
  const {
    id,
    owner,
    name,
    genre,
    location,
    date,
    description,
    setEvents,  // Added to update the events list after delete
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
      if (setEvents) {
        setEvents(prevEvents => ({
          ...prevEvents,
          results: prevEvents.results.filter(event => event.id !== id)
        }));
      }
      history.push('/events');
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  const formattedGenre = genre
    ? genre.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";

  const formattedDate = date ? new Date(date).toLocaleString() : "";

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F1C40F", "#8E44AD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.EventCardWrapper}>
      <Card className={styles.EventCard} style={{ backgroundColor: getRandomColor() }}>
        <Card.Body className={styles.CardBody}>
          <div className={styles.EventHeader}>
            <div className={styles.EventTitle}>
              <span className={styles.EventName}>{name}</span>
            </div>

            <div className={styles.EventDate}>
              <span>{formattedDate}</span>
            </div>

            {is_owner && (
              <div className={styles.DropdownWrapper}>
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </div>

          <div className={styles.EventDetails}>
            <div className={styles.EventGenre}>
              <strong>Genre:</strong> {formattedGenre}
            </div>
            <div className={styles.EventLocation}>
              <strong>Location:</strong> {location}
            </div>
            <div className={styles.EventDescription}>
              <strong>Description:</strong> {description}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;







