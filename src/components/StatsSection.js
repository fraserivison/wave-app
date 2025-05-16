import React from "react";
import styles from "../styles/StatsSection.module.css";

const StatsSection = () => {
  return (
    <div className={styles.statsSection}>
      <h3>Community Stats</h3>
      <ul>
        <li><strong>1,200+</strong> Tracks uploaded</li>
        <li><strong>300+</strong> Active artists</li>
        <li><strong>5,000+</strong> Plays today</li>
      </ul>
    </div>
  );
};

export default StatsSection;