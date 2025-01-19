import React, { useState } from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Track = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    ratings_count,
    rating_id,
    title,
    description,
    genre,
    audio_file,
    album_cover,
    updated_at,
    discoveryPage,
    setTracks
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  
  const [ratingValue, setRatingValue] = useState(null); // For tracking the selected rating

  const handleRate = async (rating) => {
    try {
      const { data } = await axiosRes.post("/ratings/", { title: id, rating }); // Send rating value
      setTracks((prevTracks) => ({
        ...prevTracks,
        results: prevTracks.results.map((track) => {
          return track.id === id
            ? { ...track, ratings_count: track.ratings_count + 1, rating_id: data.id }
            : track;
        }),
      }));
      setRatingValue(rating); // Update the local rating value
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnrate = async () => {
    try {
      await axiosRes.delete(`/ratings/${rating_id}/`);
      setTracks((prevTracks) => ({
        ...prevTracks,
        results: prevTracks.results.map((track) => {
          return track.id === id
            ? { ...track, ratings_count: track.ratings_count - 1, rating_id: null }
            : track;
        }),
      }));
      setRatingValue(null); // Reset the rating value
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Track}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && discoveryPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/tracks/${id}`}>
        <Card.Img src={album_cover} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        {genre && <Card.Text className="text-muted text-center">Genre: {genre}</Card.Text>}
        {audio_file && (
          <div className="text-center">
            <audio controls>
              <source src={audio_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className={styles.TrackBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't rate your own track!</Tooltip>}
            >
              <i className="far fa-star" />
            </OverlayTrigger>
          ) : rating_id ? (
            <span onClick={handleUnrate}>
              <i className={`fas fa-star ${styles.Star}`} />
            </span>
          ) : currentUser ? (
            <DropdownButton
              id="rating-dropdown"
              title={`Rate: ${ratingValue || "Select Rating"}`}
              onSelect={(rating) => handleRate(rating)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <Dropdown.Item key={value} eventKey={value}>
                  {value} Star{value > 1 ? "s" : ""}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to rate tracks!</Tooltip>}
            >
              <i className="far fa-star" />
            </OverlayTrigger>
          )}
          {ratings_count}
          <Link to={`/tracks/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
        {ratingValue && <div className={styles.RatingNumber}>{ratingValue}</div>} {/* Display rating number */}
      </Card.Body>
    </Card>
  );
};

export default Track;


