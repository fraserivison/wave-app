import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Profile.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    profile: {},
    tracks: [],
  });
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const { tracks } = profileData;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data: profile } = await axiosReq.get(`/profiles/${id}/`);
        const { data: tracks } = await axiosReq.get(`/tracks/?profile=${id}`);
        setProfileData({ profile, tracks: tracks.results });
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [id]);

  const handlePlayPause = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Pause current track
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play new track or resume
      if (audioRef.current) {
        audioRef.current.pause(); // Stop the currently playing track
      }
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  return (
    <Container className={styles.ProfileContainer}>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className={styles.TracksSection}>
          <h4 className={styles.SectionHeader}>Tracks</h4>
          {tracks.length ? (
            <div className={styles.TracksList}>
              {tracks.map((track) => (
                <div key={track.id} className={styles.TrackItem}>
                  <div
                    className={styles.TrackImage}
                    style={{ backgroundImage: `url(${track.album_cover})` }}
                  >
                    <div className={styles.TrackDetails}>
                      <h5>{track.title}</h5>
                      <Button
                        onClick={() => handlePlayPause(track)}
                        className={styles.PlayButton}
                      >
                        {currentTrack?.id === track.id && isPlaying
                          ? "Pause"
                          : "Play"}
                      </Button>
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
    </Container>
  );
};

export default Profile;




