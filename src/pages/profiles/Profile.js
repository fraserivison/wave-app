import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [id]);

  const togglePlayPause = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Container className={styles.ProfileContainer}>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className={styles.ProfileHeader}>
          <div className="text-center">
            <img
              src={profile.image}
              alt={`${profile.dj_name}'s avatar`}
              className={styles.Avatar}
            />
            <h2>{profile.dj_name}</h2>
            <p>{profile.bio}</p>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Tracks Section */}
        <Col md={{ span: 8, offset: 2 }} className={styles.TracksSection}>
          <h4 className={styles.SectionHeader}>Tracks</h4>
          {profile.tracks?.length ? (
            <div className={styles.TracksList}>
              {profile.tracks.map((track) => (
                <div key={track.id} className={styles.TrackItem}>
                  <div
                    className={styles.TrackImage}
                    style={{ backgroundImage: `url(${track.album_cover})` }}
                  >
                    <h5 className={styles.TrackTitle}>{track.title}</h5>
                    <div className={styles.TrackCenter}>
                      <button
                        className={styles.PlayButton}
                        onClick={() => togglePlayPause(track)}
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
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
                    </div>
                  </div>
                </div>
              ))}
              {currentTrack && (
                <audio
                  ref={audioRef}
                  src={currentTrack.audio_file_url}
                  onEnded={() => setIsPlaying(false)}
                />
              )}
            </div>
          ) : (
            <p>No tracks uploaded yet.</p>
          )}
        </Col>
      </Row>

      {/* Events Section */}
      <Row>
        <Col md={{ span: 8, offset: 2 }} className={styles.EventsSection}>
          <h4 className={styles.SectionHeader}>Events</h4>
          {profile.events?.length ? (
            <div className={styles.EventsList}>
              {profile.events.map((event) => (
                <div key={event.id} className={styles.EventItem}>
                  <h5 className={styles.EventTitle}>{event.name}</h5>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Location: {event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events listed yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;






