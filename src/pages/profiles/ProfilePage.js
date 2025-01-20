import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  // Fetch profile data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
          <div className="mt-2">
            <strong>DJ Name: </strong>
            <span>{profile?.dj_name}</span>
          </div>
          <div className="mt-2">
            <strong>Bio: </strong>
            <span>{profile?.bio}</span>
          </div>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <h4>Tracks by {profile?.owner}</h4>
        {/* Display the tracks related to this user */}
        {/* fetch tracks data related to this profile */}
        {/* Placeholder */}
        <p>Track list goes here</p>
      </div>
      <hr />
      <div className="text-center">
        <h4>Events by {profile?.owner}</h4>
        {/* Display events related to this user */}
        {/* fetch event data related to this profile */}
        <p>Event list goes here</p>
      </div>
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            mainProfile
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Profile mobile profile={profile} />
      </Col>
    </Row>
  );
}

export default ProfilePage;
