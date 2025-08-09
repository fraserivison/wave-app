import React, { useState, useEffect } from "react";
import styles from "../styles/ArtistSpotlight.module.css";

// You can replace the "#" with actual artist-specific links if you have them
const artists = [
  {
    name: "John Mac",
    bio: "John blends dreamy synths and lush vocals to create immersive soundscapes.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993802/dj-4_onhmne.jpg",
    social: {
      soundcloud: "#",
      twitter: "#",
      instagram: "#",
      spotify: "#",
    },
  },
  {
    name: "Vanta",
    bio: "Known for his moody electronica layered with ambient textures.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993803/dj-5_seil4j.jpg",
    social: {
      soundcloud: "#",
      twitter: "#",
      instagram: "#",
      spotify: "#",
    },
  },
  {
    name: "Emma Ryan",
    bio: "Emma merges classical instrumentation with futuristic beats.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993806/dj-6_k4jea2.webp",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
    },
  },
];

const SocialIcon = ({ type }) => {
  // Simple SVG icons for each platform
  switch (type) {
    case "soundcloud":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-label="SoundCloud"
        >
          <path d="M18.5 10a5.5 5.5 0 0 0-10.68-1.87A4.5 4.5 0 0 0 5.5 15h13a3.5 3.5 0 0 0 0-7h-.5z" />
        </svg>
      );
    case "twitter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-label="Twitter"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14.86 5.48 5.48 0 0 0 2.4-3.02 10.9 10.9 0 0 1-3.47 1.33 5.44 5.44 0 0 0-9.28 4.96A15.45 15.45 0 0 1 1.64 2.16a5.44 5.44 0 0 0 1.69 7.27A5.4 5.4 0 0 1 1 8.15v.07a5.44 5.44 0 0 0 4.36 5.33 5.43 5.43 0 0 1-1.46.2 5.32 5.32 0 0 1-1.02-.1 5.44 5.44 0 0 0 5.07 3.77A10.9 10.9 0 0 1 1 19.54a15.38 15.38 0 0 0 8.29 2.43c9.95 0 15.4-8.24 15.4-15.4 0-.23 0-.46-.02-.68A11.1 11.1 0 0 0 23 3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-label="Instagram"
        >
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 1a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
        </svg>
      );
    case "spotify":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-label="Spotify"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.6 14.92a.75.75 0 0 1-1.02.23 8.06 8.06 0 0 0-5.16-1.56 7.75 7.75 0 0 0-4.45 1.38.75.75 0 1 1-.8-1.24 9.29 9.29 0 0 1 5.17-1.63 8.3 8.3 0 0 1 5.5 1.74.75.75 0 0 1 .76 1.08zM16.04 12a.74.74 0 0 1-1 .24 6.1 6.1 0 0 0-3.9-1.18 6.23 6.23 0 0 0-4.1 1.2.75.75 0 0 1-1-1.1 7.6 7.6 0 0 1 5.11-1.56 6.83 6.83 0 0 1 4.15 1.3.74.74 0 0 1 .74 1.3zm0-3.25a.74.74 0 0 1-.95.27 8.22 8.22 0 0 0-5.24-1.46 8.43 8.43 0 0 0-5.67 1.7.74.74 0 1 1-.82-1.26 9.91 9.91 0 0 1 6.44-1.96 8.7 8.7 0 0 1 5.28 1.51.75.75 0 0 1 .96 1.2z" />
        </svg>
      );
    default:
      return null;
  }
};

const ArtistSpotlight = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // controls fade in/out
  const fadeDuration = 500; // ms, match with CSS transition

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % artists.length);
        setFade(true); // fade in new artist
      }, fadeDuration);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const featuredArtist = artists[index];

  return (
    <div
      className={styles.artistSpotlightSection}
      style={{
        "--bg-image": `url(${featuredArtist.bg})`,
      }}
    >
      <h4
        style={{
          opacity: fade ? 1.5 : 0,
          transition: `opacity ${fadeDuration}ms ease-in-out`,
        }}
      >
        {featuredArtist.name}
      </h4>
      <p
        style={{
          opacity: fade ? 1.5 : 0,
          transition: `opacity ${fadeDuration}ms ease-in-out`,
        }}
      >
        {featuredArtist.bio}
      </p>
      <div className={`${styles.socialLinks} ${fade ? styles.visible : ""}`}>
        <a
          href={featuredArtist.social.soundcloud}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SoundCloud"
        >
          <SocialIcon type="soundcloud" />
        </a>
        <a
          href={featuredArtist.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <SocialIcon type="twitter" />
        </a>
        <a
          href={featuredArtist.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <SocialIcon type="instagram" />
        </a>
        <a
          href={featuredArtist.social.spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify"
        >
          <SocialIcon type="spotify" />
        </a>
      </div>
    </div>
  );
};

export default ArtistSpotlight;
