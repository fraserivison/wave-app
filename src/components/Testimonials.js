import React, { useEffect, useRef } from "react";
import styles from "../styles/Testimonials.module.css";

const Testimonials = () => {
  const feedback = [
    { id: 1, name: "Alex North", quote: "It's helped me discover new artists to use for my mixes- gamechanger!" },
    { id: 2, name: "Jamie Jacksyn", quote: "Uploading my music here was the best move to expose me to the world." },
    { id: 3, name: "DJ Sammi", quote: "Love the community here, it's for electric music lovers!" },
    { id: 4, name: "Taylor Made", quote: "I can't believe how easy it is to find new tracks here." },
    { id: 5, name: "Jordi", quote: "Collaborating with artists here has been amazing! BIG things coming soon!" },
    { id: 6, name: "Prysm", quote: "I love how interactive and welcoming the community is, love it!." },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            entry.target.style.animationDelay = `${idx * 0.2}s`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.testimonialSection}>
      <h3>What Our Users Say...</h3>
      <div className={styles.testimonialGrid}>
        {feedback.map((item, index) => (
          <blockquote
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={styles.testimonialCard}
          >
            <p>"{item.quote}"</p>
            <footer>{item.name}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
