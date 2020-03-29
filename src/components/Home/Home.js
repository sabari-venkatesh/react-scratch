import React from "react";
import { connect } from "react-redux";
import { h1 } from "./Home.css";
const Home = ({ title }) => {
  return <h4 className={h1}>{title} sdf sf sdfsd sdfds234234</h4>;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    title: "state.appReducer.title"
  };
};

export default connect(mapStateToProps)(Home);
