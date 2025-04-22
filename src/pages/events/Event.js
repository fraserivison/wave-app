import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Event.module.css";

const Event = (props) => {
  const { id, owner, name, genre, location, date, description, setEvents } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [eventData, setEventData] = useState({
    name,
    genre,
    location,
    date,
    description,
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosRes.get(`/events/${id}/`);
        setEventData(response.data);
      } catch (err) {
        console.error("Error fetching event data:", err);
      }
    };
    fetchEventData();
  }, [id]);

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      if (setEvents) {
        setEvents((prevEvents) => ({
          ...prevEvents,
          results: prevEvents.results.filter((event) => event.id !== id),
        }));
      }
      history.push("/events");
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  const formattedGenre = genre
    ? genre
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  const formattedDate = date ? new Date(date).toLocaleString() : "";

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F1C40F", "#8E44AD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const preventClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={`${styles.CustomCard} ${styles.cardWithBorderRadius}`}
      onClick={preventClick}
      style={{ backgroundColor: getRandomColor() }}
    >
      <div className={styles.CardBody}>
        <div className={styles.EventHeader}>
          <div className={styles.EventTitle}>
            <span className={styles.EventName}>{eventData.name}</span>
          </div>

          <div className={styles.EventDate}>
            <i className={`fas fa-calendar-alt ${styles.iconStyle}`} />
            <span>{formattedDate}</span>
          </div>

          {is_owner && (
            <div className={styles.DropdownWrapper}>
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          )}
        </div>

        <div className={styles.EventDetails}>
          <div className={styles.EventGenre}>
            <i className={`fas fa-music ${styles.iconStyle}`} />
            <strong>Genre:</strong> {formattedGenre}
          </div>

          <div className={styles.EventLocation}>
            <i className={`fas fa-map-marker-alt ${styles.iconStyle}`} />
            <strong>Location:</strong> {eventData.location}
          </div>

          <div className={`${styles.EventDescription} ${styles.truncatedDescription}`}>
            <i className={`fas fa-align-left ${styles.iconStyle}`} />
            <strong>Description:</strong> {eventData.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
