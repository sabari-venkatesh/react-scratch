import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "react-dom";
import App from "components/App";

// const renderApp = () =>
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>,
//     document.getElementById("app")
//   );

// renderApp(App);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
// if (module.hot) {
//   module.hot.accept("components/App", () => {
//     require("components/App");
//     renderApp(App);
//   });
// }
