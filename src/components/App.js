import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ROUTES } from "routes";
import "components/_config/base.css";
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {ROUTES.map((route) => (
          <Route
            key={route.id}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default hot(App);
