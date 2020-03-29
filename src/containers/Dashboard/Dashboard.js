import React from "react";
import styles from "./Dashboard.css";

const Dashboard = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
export default Dashboard;
