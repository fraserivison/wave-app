import React from "react";
import styles from "../styles/TopTracks.module.css";

const TopTracks = () => {
  const dummyTracks = [
    { id: 1, title: "Sunset Drive", artist: "EchoTone" },
    { id: 2, title: "Midnight Haze", artist: "Nova" },
    { id: 3, title: "Electric Sky", artist: "Lumen" },
    { id: 4, title: "Cloud Pulse", artist: "Aether" },
    { id: 5, title: "Oceanic", artist: "Swell" },
  ];

  return (
    <div className={styles.topTracksSection}>
      <h3>Top 10 Tracks of the Day</h3>
      <ul>
        {dummyTracks.map((track) => (
          <li key={track.id}>
            <strong>{track.title}</strong> by {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;