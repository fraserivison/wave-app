import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    profile: {},
    tracks: [],
  });

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
                  ></div>
                  <div className={styles.TrackDetails}>
                    <h5>{track.title}</h5>
                    <audio controls className={styles.AudioPlayer}>
                      <source src={track.audio_file_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              ))}
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



