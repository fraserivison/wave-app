import React, { useState } from 'react';

const Profile = () => {
  const [userData] = useState({
    username: "DJAwesome",
    profilePicture: "https://placekitten.com/200/200",
    bio: "I love mixing beats!",
    projects: [{ id: 1, name: "Track 1" }, { id: 2, name: "Track 2" }],
    gigs: [
      { id: 1, name: "Club XYZ", date: "25th Dec" },
      { id: 2, name: "Festival ABC", date: "31st Dec" }
    ],
    playlists: [
      { id: 1, name: "Party Mix", link: "https://example.com/playlist1" },
      { id: 2, name: "Chill Vibes", link: "https://example.com/playlist2" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/djawesome",
      soundcloud: "https://soundcloud.com/djawesome"
    }
  });

  return (
    <div className="profile">
      <h1>{userData.username}'s Profile</h1>
      <img src={userData.profilePicture} alt="Profile" />
      <p>{userData.bio}</p>

      <h2>Recent Projects</h2>
      <ul>
          {userData.projects && userData.projects.length > 0 ? (
            userData.projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))
          ) : (
          <li>No projects to display</li>
          )}
      </ul>

      <h2>Upcoming Gigs</h2>
      <ul>
        {userData.gigs && userData.gigs.length > 0 ? (
          userData.gigs.map((gig) => (
            <li key={gig.id}>
              {gig.name} - {gig.date}
            </li>
          ))
        ) : (
          <li>No upcoming gigs</li>
        )}
      </ul>

      <h2>Featured Playlists</h2>
      <ul>
        {userData.playlists && userData.playlists.length > 0 ? (
          userData.playlists.map((playlist) => (
            <li key={playlist.id}>
              <a href={playlist.link} target="_blank" rel="noopener noreferrer">
                {playlist.name}
              </a>
            </li>
          ))
        ) : (
          <li>No playlists available</li>
        )}
      </ul>

      <h2>Connect with Me</h2>
      <ul>
        {userData.socialLinks ? (
          <>
            <li>
              <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={userData.socialLinks.soundcloud} target="_blank" rel="noopener noreferrer">
                SoundCloud
              </a>
            </li>
          </>
        ) : (
          <li>No social media links available</li>
        )}
      </ul>
    </div>
  );
};

export default Profile;