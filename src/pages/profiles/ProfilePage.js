import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { Media } from "react-bootstrap";
import styles from "../../styles/ProfilePage.module.css";
import Profile from "./Profile";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Conditionally show the Edit Profile button if the current user is the owner of the profile
  const showEditButton = profile.is_owner;

  return (
    <div className={styles.ProfileContainerRow}>
      <div className={styles.ProfileCol}>
        <div className={styles.ProfileContainer}>
          {/* Profile Image */}
          <div
            className={styles.ProfileImage}
            style={{ backgroundImage: `url(${profile.image})` }}
          >
            <div className={styles.ProfileHeader}>
              <Media className="d-flex align-items-center justify-content-between">
                <div className={styles.ProfileName}>
                  <h2>{profile.dj_name}</h2>
                </div>
                <div className={styles.ProfileTitleWrapper}>
                  {/* Conditionally render the Edit Profile button */}
                  {showEditButton && (
                    <Link to={`/profiles/${id}/edit`} className={styles.EditProfileButton}>
                      Edit Profile
                    </Link>
                  )}
                </div>
              </Media>
            </div>
          </div>

          {/* Footer Section */}
          <div className={styles.ProfileFooter}>
            <div className={styles.ProfileOwner}>
              <strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}
            </div>
            <p className={styles.Bio}>{profile.bio}</p>
          </div>
        </div>
      </div>
      <Profile profile={profile} />
    </div>
  );
};

export default ProfilePage;
