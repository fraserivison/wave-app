import React, { useState, useEffect } from "react";
import styles from "../styles/ArtistSpotlight.module.css";

const artists = [
  {
    name: "John Mac",
    bio: "John blends dreamy synths and lush vocals to create immersive soundscapes.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993802/dj-4_onhmne.jpg",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
    },
  },
  {
    name: "Nova",
    bio: "Known for his moody electronica layered with ambient textures.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1753993803/dj-5_seil4j.jpg",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
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
  {
    name: "Tony De Cruz",
    bio: "Lena infuses deep house with hypnotic tribal rhythms and textures.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1757368200/dj-4_tf9tvr.jpg",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
    },
  },
  {
    name: "Kai Rivero",
    bio: "Kai crafts pulsating techno beats layered with atmospheric sounds.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1757368201/dj-23_jbrt0u.jpg",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
    },
  },
  {
    name: "Sophie Vale",
    bio: "Sophie blends ambient tones with experimental electronic elements.",
    image: "https://via.placeholder.com/150",
    bg: "https://res.cloudinary.com/dmylma7bf/image/upload/v1757368203/dj-44_atyuxb.jpg",
    social: {
      soundcloud: "https://www.soundcloud.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com",
      spotify: "https://www.spotify.com",
    },
  },
];

// 🔥 Preload function
const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const SocialIcon = ({ type }) => {
  switch (type) {
    case "soundcloud":
      return <i className="fab fa-soundcloud" />;
    case "twitter":
      return <i className="fab fa-twitter" />;
    case "instagram":
      return <i className="fab fa-instagram" />;
    case "spotify":
      return <i className="fab fa-spotify" />;
    default:
      return null;
  }
};

const ArtistSpotlight = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const fadeDuration = 500;

  // ✅ Preload all bg images once
  useEffect(() => {
    const bgUrls = artists.map((artist) => artist.bg);
    preloadImages(bgUrls);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % artists.length);
        setFade(true);
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
          opacity: fade ? 1 : 0,
          transition: `opacity ${fadeDuration}ms ease-in-out`,
        }}
      >
        {featuredArtist.name}
      </h4>
      <p
        style={{
          opacity: fade ? 1 : 0,
          transition: `opacity ${fadeDuration}ms ease-in-out`,
        }}
      >
        {featuredArtist.bio}
      </p>
      <div className={`${styles.socialLinks} ${fade ? styles.visible : ""}`}>
        {Object.entries(featuredArtist.social).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon type={platform} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArtistSpotlight;
