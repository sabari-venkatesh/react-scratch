import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ROUTES } from "routes";
import "components/_config/base.css";
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Link to="/">ertert</Link>
      <Link to="/dashboard">ett</Link>
      <Switch>
        {ROUTES.map((route) => (
          <Route
            key={route.id}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        {/* <Route path="/" component={ROUTES[0].component} exact />
        <Route path="/dashboard" component={Lazy.Home} /> */}
      </Switch>
    </Suspense>
  );
};

export default hot(App);
