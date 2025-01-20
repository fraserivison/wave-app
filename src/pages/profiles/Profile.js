import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner, dj_name, bio } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Access the profile data from context
  const { userTracks, userEvents } = useProfileData();

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile && currentUser && !is_owner && (following_id ? (
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
      </div>

      {/* DJ Name and Bio Section */}
      <div className="mt-3">
        {dj_name && (
          <div>
            <strong>DJ Name:</strong> <p>{dj_name}</p>
          </div>
        )}
        {bio && (
          <div>
            <strong>Bio:</strong> <p>{bio}</p>
          </div>
        )}
      </div>

      {/* Display user tracks */}
      <div>
        <h3>Tracks:</h3>
        {userTracks.results.length ? (
          userTracks.results.map((track) => (
            <div key={track.id}>
              <h4>{track.title}</h4>
              {/* Display additional track info */}
            </div>
          ))
        ) : (
          <p>No tracks yet</p>
        )}
      </div>

      {/* Display user events */}
      <div>
        <h3>Events:</h3>
        {userEvents.results.length ? (
          userEvents.results.map((event) => (
            <div key={event.id}>
              <h4>{event.name}</h4>
              {/* Display additional event info */}
            </div>
          ))
        ) : (
          <p>No events yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

