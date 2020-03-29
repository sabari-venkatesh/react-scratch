import { AppContainer } from "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import Routes from "routes/Routes";

const renderApp = Component =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("app")
  );

renderApp(Routes);

if (module.hot) {
  module.hot.accept("routes/Routes", () => {
    renderApp(Routes);
  });
}
