import React, { useContext, useState } from 'react';
import './Profile.module.css';
import { MusicContext } from '../../contexts/music-context';

const Profile = () => {
  const { music, addMusic } = useContext(MusicContext); // Use music from context
  const [newSong, setNewSong] = useState({ name: '', link: '' });

  // Static user data
  const userData = {
    username: "DJAwesome",
    profilePicture: "https://picsum.photos/200/200",
    bio: "I love mixing beats!",
    highlights: [
      "Performed at Tomorrowland 2023",
      "Winner of DJ Battle 2022",
      "Featured in DJ Mag Top 100 DJs"
    ],
    gigs: [
      { id: 1, name: "Club Neon", city: "Manchester", date: "25th Dec" },
      { id: 2, name: "Bass Fest", city: "London", date: "31st Dec" }
    ],
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/djawesome" },
      { platform: "SoundCloud", url: "https://soundcloud.com/djawesome" }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (newSong.name && newSong.link) {
      addMusic({ id: Date.now(), name: newSong.name, link: newSong.link }); // Use addMusic from context
      setNewSong({ name: '', link: '' }); // Clear form
    }
  };

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

      {/* Highlights */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Highlights</h2>
        <div className="d-flex flex-column align-items-center">
          {userData.highlights.length > 0 ? (
            userData.highlights.map((highlight, index) => (
              <div key={index} className="mb-2 p-3 border rounded">
                <p>{highlight}</p>
              </div>
            ))
          ) : (
            <p>No highlights added yet.</p>
          )}
        </div>
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

      {/* My Music */}
      <div className="mb-5">
        <h2 className="text-center mb-4">My Music</h2>
        <div className="row d-flex justify-content-center">
          {/* Map through music from context */}
          {music.map((track) => (
            <div key={track.id} className="col-md-3 mb-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{track.name}</h5>
                  <a
                    href={track.link}
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

        {/* Upload New Song */}
        <div className="mt-4">
          <h3 className="text-center">Upload a New Song</h3>
          <form onSubmit={handleUpload} className="d-flex flex-column align-items-center">
            <input
              type="text"
              name="name"
              placeholder="Song Name"
              value={newSong.name}
              onChange={handleInputChange}
              className="form-control mb-3"
              style={{ maxWidth: "400px" }}
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Song Link"
              value={newSong.link}
              onChange={handleInputChange}
              className="form-control mb-3"
              style={{ maxWidth: "400px" }}
              required
            />
            <button type="submit" className="btn btn-success">Upload</button>
          </form>
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



