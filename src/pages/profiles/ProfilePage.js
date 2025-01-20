import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/ProfilePage.module.css";
import Profile from "./Profile"; // Import Profile component

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  // Fetch profile and events/tracks data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`);
        setProfile(data);  // Store the complete profile including tracks and events
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

      {/* Event Section */}
      <div className="events-section">
        <h3>Upcoming Events</h3>
        {profile.events && profile.events.length > 0 ? (
          <ul>
            {profile.events.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong><br />
                {event.date} at {event.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events listed.</p>
        )}
      </div>

      {/* Tracks Section */}
      <div className="tracks-section">
        <h3>Tracks</h3>
        {profile.tracks && profile.tracks.length > 0 ? (
          <ul>
            {profile.tracks.map((track) => (
              <li key={track.id}>
                <strong>{track.title}</strong><br />
                {track.genre} | {track.rating} Stars
              </li>
            ))}
          </ul>
        ) : (
          <p>No tracks uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;


