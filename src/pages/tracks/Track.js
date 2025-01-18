import React from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

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
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
            <span onClick={() => {}}>
              <i className={`fas fa-star ${styles.Star}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-star ${styles.StarOutline}`} />
            </span>
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
      </Card.Body>
    </Card>
  );
};

export default Track;
