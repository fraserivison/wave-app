import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Media,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Track = (props) => {
  const {
    id,
    owner,
    profile_id,
    ratings_count,
    rating_id,
    title,
    genre,
    audio_file_url, // changed to audio_file_url
    album_cover,
    updated_at,
    setTracks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [averageRating, setAverageRating] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axiosRes.get(`/tracks/${id}/`);
        const track = response.data;
        setAverageRating(track.average_rating);
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
      const { data } = await axiosRes.post("/ratings/", { title: id, rating });

      const trackResponse = await axiosRes.get(`/tracks/${id}/`);
      const updatedTrack = trackResponse.data;

      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              return {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating,
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
      await axiosRes.delete(`/ratings/${rating_id}/`);

      const trackResponse = await axiosRes.get(`/tracks/${id}/`);
      const updatedTrack = trackResponse.data;

      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => {
        return {
          ...prevTracks,
          results: prevTracks.results.map((track) => {
            if (track.id === id) {
              return {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating,
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

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.TrackContainer}>
      <div
        className={styles.TrackImage}
        style={{ backgroundImage: `url(${album_cover})` }}
      >
        <div className={styles.TrackHeader}>
          <Media className="d-flex align-items-center justify-content-between">
            {/* Profile Name */}
            <div className={styles.ProfileName}>
              {is_owner ? (
                <span className={styles.TrackOwner}>{owner}</span>
              ) : (
                <Link
                  to={`/profiles/${profile_id}`}
                  className={styles.TrackOwner}
                >
                  {owner}
                </Link>
              )}
            </div>

            {/* Title */}
            <div className={styles.TrackTitleWrapper}>
              <span className={styles.TrackTitle}>{title}</span>
            </div>

            {/* Updated At */}
            <div className={styles.UpdatedAt}>
              <span>{updated_at}</span>
            </div>

            {/* More Dropdown */}
            {is_owner && (
              <div className={styles.DropdownWrapper}>
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </Media>
        </div>

        <div className={styles.TrackCenter}>
          <button className={styles.PlayButton} onClick={togglePlayPause}>
            {isPlaying ? (
              <i
                className="fas fa-pause-circle"
                style={{ fontSize: "2.5rem", color: "#ffffff" }}
              />
            ) : (
              <i
                className="fas fa-play-circle"
                style={{ fontSize: "2.5rem", color: "#ffffff" }}
              />
            )}
          </button>
          {/* Audio element for playing the track */}
          <audio ref={audioRef} src={audio_file_url} /> {/* Changed to audio_file_url */}
        </div>

        <div className={styles.TrackFooter}>
          {/* Bottom Left - Star Rating */}
          <div className={styles.StarRating}>
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
                title={`Select Rating`}
                onSelect={(rating) => handleRate(rating)}
                variant="link"
                size="sm"
                drop="up"
                className="rating-dropdown"
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

          {/* Bottom Right - Average Rating */}
          <div className={styles.AverageRating}>
            <strong>Avg. Rating:</strong>{" "}
            {averageRating !== null ? averageRating.toFixed(1) : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
