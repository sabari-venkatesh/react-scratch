import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";
import makeStore from "store";
import { ROUTES } from "utils/static-routes";

const store = makeStore();

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default hot(App);
