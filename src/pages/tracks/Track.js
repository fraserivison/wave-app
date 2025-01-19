import React, { useState, useEffect } from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip, Dropdown, DropdownButton } from "react-bootstrap";
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

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // This will hold the current average rating
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    // Fetch the track details when the component mounts or when the rating changes
    const fetchTrackData = async () => {
      try {
        const response = await axiosRes.get(`/tracks/${id}/`);
        const track = response.data;
        setAverageRating(track.average_rating);  // Set the initial average rating
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchTrackData();
  }, [id]);

  const handleEdit = () => {
    history.push(`/tracks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tracks/${id}/`);
      history.goBack();
    } catch (err) {
      console.log("Error deleting track:", err);
    }
  };

  const handleRate = async (rating) => {
    try {
      // Post the rating to the backend
      const { data } = await axiosRes.post("/ratings/", { title: id, rating });

      // Fetch the updated track data with the new average_rating
      const trackResponse = await axiosRes.get(`/tracks/${id}/`);
      const updatedTrack = trackResponse.data;

      // Update the frontend with the new average rating
      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              return {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating, // Update average_rating with the latest from backend
                rating_id: data.id,
              };
            }
            return track;
          }),
        };
      });
    } catch (err) {
      console.log("Error rating track:", err);
    }
  };

  const handleUnrate = async () => {
    try {
      // Remove the rating
      await axiosRes.delete(`/ratings/${rating_id}/`);

      // Fetch the updated track data with the new average_rating after removing the rating
      const trackResponse = await axiosRes.get(`/tracks/${id}/`);
      const updatedTrack = trackResponse.data;

      // Update the frontend with the new average rating
      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              return {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating, // Update average_rating with the latest from backend
                rating_id: null,
              };
            }
            return track;
          }),
        };
      });
    } catch (err) {
      console.log("Error removing rating:", err);
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
        <div className="mt-2">
          <strong>Average Rating:</strong> {averageRating !== null ? averageRating.toFixed(1) : "Loading..."}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Track;




