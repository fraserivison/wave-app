import React, { useState } from 'react';

const Profile = () => {
  const [userData] = useState({
    username: "DJAwesome",
    profilePicture: "https://placekitten.com/200/200",
    bio: "I love mixing beats!",
    projects: [{ id: 1, name: "Track 1" }, { id: 2, name: "Track 2" }],
    activity: [{ id: 1, description: "Uploaded new mix" }, { id: 2, description: "Shared playlist" }]
  });

  return (
    <div className="profile">
      <h1>{userData.username}'s Profile</h1>
      <img src={userData.profilePicture} alt="Profile" />
      <p>{userData.bio}</p>

      <h2>Recent Projects</h2>
      <ul>
        {userData.projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>

      <h2>Recent Activity</h2>
      <ul>
        {userData.activity.map((activity) => (
          <li key={activity.id}>{activity.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;


