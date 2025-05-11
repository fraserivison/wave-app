import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Track.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Track = (props) => {
  const {
    id,
    owner,
    ratings_count,
    rating_id,
    title,
    audio_file_url,
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
        setAverageRating(response.data.average_rating);
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchTrackData();
  }, [id]);

  const handleEdit = () => history.push(`/tracks/${id}/edit`);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tracks/${id}/`);
      if (setTracks) {
        setTracks((prevTracks) => ({
          ...prevTracks,
          results: prevTracks.results.filter((track) => track.id !== id),
        }));
      }
      history.push("/discover");
    } catch (err) {
      console.log("Error deleting track:", err);
    }
  };

  const handleRate = async (rating) => {
    try {
      const { data } = await axiosRes.post("/ratings/", { title: id, rating });
      const updatedTrack = (await axiosRes.get(`/tracks/${id}/`)).data;
      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => ({
        ...prevTracks,
        results: prevTracks.results.map((track) =>
          track.id === id
            ? {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating,
                rating_id: data.id,
              }
            : track
        ),
      }));
    } catch (err) {
      console.log("Error rating track:", err);
    }
  };

  const handleUnrate = async () => {
    try {
      await axiosRes.delete(`/ratings/${rating_id}/`);
      const updatedTrack = (await axiosRes.get(`/tracks/${id}/`)).data;
      setAverageRating(updatedTrack.average_rating);
      setTracks((prevTracks) => ({
        ...prevTracks,
        results: prevTracks.results.map((track) =>
          track.id === id
            ? {
                ...track,
                ratings_count: updatedTrack.ratings_count,
                average_rating: updatedTrack.average_rating,
                rating_id: null,
              }
            : track
        ),
      }));
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
          <div className={styles.ProfileName}>
            <span className={styles.TrackOwner}>{owner}</span>
          </div>
          <div className={styles.TrackTitleWrapper}>
            <span className={styles.TrackTitle}>{title}</span>
          </div>
          <div className={styles.UpdatedAt}>
            <span>{updated_at}</span>
          </div>

          {is_owner && (
            <div className={styles.DropdownWrapper}>
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          )}
        </div>

        <div className={styles.TrackCenter}>
          <button className={styles.PlayButton} onClick={togglePlayPause}>
            {isPlaying ? (
              <i className={`fas fa-pause-circle ${styles.Icon}`} />
            ) : (
              <i className={`fas fa-play-circle ${styles.Icon}`} />
            )}
          </button>
          <audio ref={audioRef} src={audio_file_url} />
        </div>

        <div className={styles.TrackFooter}>
          <div className={styles.StarRating}>
            {is_owner ? (
              <OverlayTrigger placement="top" overlay={<Tooltip>You can't rate your own track!</Tooltip>}>
                <i className={`far fa-star ${styles.Icon}`} />
              </OverlayTrigger>
            ) : rating_id ? (
              <span onClick={handleUnrate}>
                <i className={`fas fa-star ${styles.Icon}`} />
              </span>
            ) : currentUser ? (
              <Dropdown
                className={`${styles.RatingDropdown}`}
                drop="up"
                popperConfig={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 4], // vertical offset
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "viewport",
                      },
                    },
                  ],
                }}
              >
                <Dropdown.Toggle variant="link" className={styles.RateButton}>
                  <i className="fas fa-star" style={{ fontSize: "10px", color: "transparent" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.RatingMenu}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Dropdown.Item
                      key={value}
                      onClick={() => handleRate(value)}
                      className={styles.RatingItem}
                    >
                      <span className={styles.DropdownStar}>{"★".repeat(value)}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <OverlayTrigger placement="top" overlay={<Tooltip>Log in to rate tracks!</Tooltip>}>
                <i className={`far fa-star ${styles.Icon}`} />
              </OverlayTrigger>
            )}
            {ratings_count}
          </div>

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







