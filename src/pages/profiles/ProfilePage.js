import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
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

  return (
    <div className={styles.ProfilePage}>
      <div className="text-center">
        <Avatar src={profile.image} height={100} />
        <h2>{profile.dj_name}</h2>
        <p>{profile.bio}</p>
      </div>
      <div className="text-center">
        <Link to={`/profiles/${id}/edit`} className="btn btn-primary">
          Edit Profile
        </Link>
      </div>
      <div className={styles.Details}>
        <p>
          <strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(profile.updated_at).toLocaleDateString()}
        </p>
      </div>

      {/* Profile Section */}
      <Profile profile={profile} />

      
    </div>
  );
};

export default ProfilePage;


