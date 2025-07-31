import React, { useState, useEffect } from "react";
import styles from "../styles/ArtistSpotlight.module.css";

const artists = [
  {
    name: "Nova",
    bio: "Nova blends dreamy synths and lush vocals to create immersive soundscapes.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993802/dj-4_onhmne.jpg"
  },
  {
    name: "Vanta",
    bio: "Vanta is known for moody electronica layered with ambient textures.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993803/dj-5_seil4j.jpg"
  },
  {
    name: "Aeris",
    bio: "Aeris merges classical instrumentation with futuristic beats.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993806/dj-6_k4jea2.webp"
  }
];

const ArtistSpotlight = () => {
  const [index, setIndex] = useState(0);
  const featuredArtist = artists[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % artists.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.artistSpotlightSection}
      style={{
        "--bg-image": `url(${featuredArtist.bg})`
      }}
    >
      <img
        src={featuredArtist.image}
        alt={featuredArtist.name}
        className={styles.artistImage}
      />
      <h4>{featuredArtist.name}</h4>
      <p>{featuredArtist.bio}</p>
    </div>
  );
};

export default ArtistSpotlight;
