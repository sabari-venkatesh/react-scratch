import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTES } from "utils/static-routes";
import styles from "./Landing.css";

const Landing = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
export default Landing;
