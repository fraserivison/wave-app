import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [userData] = useState({
    username: "DJAwesome",
    profilePicture: "https://placekitten.com/200/200",
    bio: "I love mixing beats!",
    projects: [{ id: 1, name: "Track 1" }, { id: 2, name: "Track 2" }],
    gigs: [
      { id: 1, name: "Club Neon", city: "Manchester", date: "25th Dec" },
      { id: 2, name: "Bass Fest", city: "London", date: "31st Dec" }
    ],
    playlists: [
      { id: 1, name: "Party Mix", link: "https://example.com/playlist1" },
      { id: 2, name: "Chill Vibes", link: "https://example.com/playlist2" }
    ],
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/djawesome" },
      { platform: "SoundCloud", url: "https://soundcloud.com/djawesome" }
    ]
  });

  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="text-center mb-5">
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="rounded-circle img-fluid mb-3"
          style={{ width: "150px", height: "150px" }}
        />
        <h1 className="mb-2">{userData.username}</h1>
        <p className="text-muted">{userData.bio}</p>
      </div>

      {/* Upcoming Gigs */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Upcoming Gigs</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {userData.gigs.map((gig) => (
            <div key={gig.id} className="gig-container text-center">
              <div className="gig-content">
                <h5 className="gig-venue">{gig.venue}</h5>
                <p className="gig-date">{gig.date}</p>
                <p className="gig-city">{gig.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Featured Playlists</h2>
        <div className="row">
          {userData.playlists.map((playlist) => (
            <div key={playlist.id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{playlist.name}</h5>
                  <a
                    href={playlist.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Listen Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Social Media Links */}
     <div className="text-center">
        <h2 className="mb-4">Connect with Me</h2>
        <div className="d-flex justify-content-center">
          {userData.socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary mx-2"
              style={{ minWidth: "120px" }}
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

