import React from "react";
import styles from "../styles/Testimonials.module.css";

const Testimonials = () => {
  const feedback = [
    { id: 1, name: "Alex", quote: "WaveApp helped me discover my favourite indie artist." },
    { id: 2, name: "Jamie", quote: "Uploading my tracks here was the best move for exposure." },
    { id: 3, name: "Sam", quote: "A vibrant community for music lovers!" },
  ];

  return (
    <div className={styles.testimonialSection}>
      <h3>What Our Users Say</h3>
      {feedback.map((item) => (
        <blockquote key={item.id} className={styles.testimonialCard}>
          <p>"{item.quote}"</p>
          <footer>- {item.name}</footer>
        </blockquote>
      ))}
    </div>
  );
};

export default Testimonials;
