import React from "react";
import styles from "../styles/TopTracks.module.css";

const TopTracks = () => {
  const dummyTracks = [
    { id: 1, title: "Sunset twice a day", artist: "Lionel Mellor" },
    { id: 2, title: "Midnight Walker", artist: "Nova" },
    { id: 3, title: "Low Tide Vibes", artist: "Andy Lumen" },
    { id: 4, title: "Come get it", artist: "McArthur" },
    { id: 5, title: "Out of the ocean", artist: "Ryan McCurrie" },
    { id: 6, title: "Dancing on my own", artist: "Paul Beckingfield" },
    { id: 7, title: "Tailor Swifty", artist: "DJ Bob Clarke" },
    { id: 8, title: "Business Trip", artist: "Duski" },
    { id: 9, title: "Three's a crowd", artist: "Phillipe Noir" },
    { id: 10, title: "Obsidian", artist: "Teddy Tex" },
  ];

  return (
    <div className={styles.topTracksSection}>
      <h3>Today's Top 10</h3>
      <div className={styles.columnsWrapper}>
        <div className={styles.column}>
          {dummyTracks.slice(0, 5).map((track, index) => (
            <div key={track.id} className={styles.trackWrapper}>
              <div className={styles.trackNumber}>{index + 1}</div>
              <div className={styles.trackCard}>
                <div className={styles.trackTitle}>{track.title}</div>
                <div className={styles.trackArtist}>
                  {track.artist.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.column}>
          {dummyTracks.slice(5).map((track, index) => (
            <div key={track.id} className={styles.trackWrapper}>
              <div className={styles.trackNumber}>{index + 6}</div>
              <div className={styles.trackCard}>
                <div className={styles.trackTitle}>{track.title}</div>
                <div className={styles.trackArtist}>
                  {track.artist.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTracks;
