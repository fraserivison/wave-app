import React from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Track = (props) => {
  const {
    id,
    owner,
    profile_id,
    comments_count,
    ratings_count,
    rating_id,
    title,
    description,
    genre,
    audio_file,
    album_cover,
    updated_at,
    trackPage,
    setTracks,
  } = props;

  console.log("Track props:", props); // Debug log for the props passed to Track

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    console.log("Navigating to edit page for track:", id); // Debug log when edit is triggered
    history.push(`/tracks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting track:", id); // Debug log when delete is triggered
      await axiosRes.delete(`/tracks/${id}/`);
      history.goBack();
    } catch (err) {
      console.log("Error deleting track:", err); // Debug log for delete error
    }
  };

  const handleRate = async (rating) => {
    console.log("Rating track:", id, "with rating:", rating); // Debug log for rating action
    try {
      const { data } = await axiosRes.post("/ratings/", { title: id, rating });
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              const newRatingsCount = track.ratings_count + 1;
              return {
                ...track,
                ratings_count: newRatingsCount,
                rating_id: data.id,
              };
            }
            return track;
          }),
        };
      });
    } catch (err) {
      console.log("Error rating track:", err); // Debug log for rating error
    }
  };

  const handleUnrate = async () => {
    console.log("Removing rating for track:", id); // Debug log for unrating action
    try {
      await axiosRes.delete(`/ratings/${rating_id}/`);
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              const newRatingsCount = track.ratings_count - 1;
              return {
                ...track,
                ratings_count: newRatingsCount,
                rating_id: null,
              };
            }
            return track;
          }),
        };
      });
    } catch (err) {
      console.log("Error removing rating:", err); // Debug log for unrating error
    }
  };

  return (
    <Card className={styles.Track}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={currentUser?.profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && trackPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/tracks/${id}`}>
        <Card.Img src={album_cover} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        {genre && (
          <Card.Text className="text-muted text-center">
            Genre: {genre}
          </Card.Text>
        )}
        {audio_file && (
          <div className="text-center">
            <audio controls>
              <source src={audio_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className={styles.TrackBar}>
          <div className="d-flex align-items-center">
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
                title={`Rate: Select Rating`}
                onSelect={(rating) => handleRate(rating)}
                variant="link"
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
          </div>

          <div className="d-flex align-items-center ml-3">
            <Link to={`/tracks/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {comments_count}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Track;

