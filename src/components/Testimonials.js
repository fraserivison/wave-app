import React from "react";
import styles from "../styles/Testimonials.module.css";

const Testimonials = () => {
  const feedback = [
    { id: 1, name: "Alex North", quote: "It's helped me discover new artists to use for my mixes- this is a gamechanger!" },
    { id: 2, name: "Jamie Jacksyn", quote: "Uploading my music here was the best move to expose me to the world." },
    { id: 3, name: "DJ Sammi", quote: "Love the community here, it's for electric music lovers!" },
    { id: 4, name: "Taylor Made", quote: "I can't believe how easy it is to find new tracks here." },
    { id: 5, name: "Jordi", quote: "Collaborating with artists here has been amazing! BIG things coming soon!" },
    { id: 6, name: "Prysm", quote: "I love how interactive and welcoming the community is, long-term user right here." },
  ];

  return (
    <div className={styles.testimonialSection}>
      <h3>What Our Users Say</h3>
      <div className={styles.testimonialGrid}>
        {feedback.map((item) => (
          <blockquote key={item.id} className={styles.testimonialCard}>
            <p>"{item.quote}"</p>
            <footer>{item.name}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
