import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";
import { ROUTES } from "utils/static-routes";
const App = () => {
  return (
    <Router>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dynamic">Landing</NavLink>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {ROUTES.consumerRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default hot(App);
