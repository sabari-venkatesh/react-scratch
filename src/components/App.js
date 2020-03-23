import React from "react";
import { hot } from "react-hot-loader";
import { title } from "./App.css";
function App() {
  return <h1 className={title}>Hello webpack 2 4 </h1>;
}

export default hot(module)(App);
