import React from "react";
import styles from "./default.css";

const DefaultTemplate = ({ children, ...props }) => {
  return (
    <main {...props} className={styles.root}>
      {children}
    </main>
  );
};

export default DefaultTemplate;
