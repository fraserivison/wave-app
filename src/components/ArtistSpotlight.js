import React from "react";
import styles from "../styles/ArtistSpotlight.module.css";

const ArtistSpotlight = () => {
  const featuredArtist = {
    name: "Nova",
    bio: "Nova blends dreamy synths and lush vocals to create immersive soundscapes.",
    image: "https://via.placeholder.com/150"
  };

  return (
    <div className={styles.artistSpotlightSection}>
      <h3>Artist Spotlight</h3>
      <img src={featuredArtist.image} alt={featuredArtist.name} />
      <h4>{featuredArtist.name}</h4>
      <p>{featuredArtist.bio}</p>
    </div>
  );
};

export default ArtistSpotlight;
