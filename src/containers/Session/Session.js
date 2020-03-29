import React from "react";
import styles from "./Session.css";

const Session = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
export default Session;
