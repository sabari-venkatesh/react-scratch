import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";
import store from "store";
import PrivateRoute from "./PrivateRoute";
import SubRoute from "./SubRoute";
import { ROUTES } from "utils/static-routes";
import * as Lazy from "utils/lazy-pages";

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <ul>
          <li>
            <Link to="/">Home page</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/forgot-password">Forgot Password</Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route component={Lazy.Session}>
              <Route component={Lazy.Login} path="/login" />
              <Route component={Lazy.ForgotPassword} path="/forgot-password" />
            </Route> */}
            <Route component={Lazy.Landing} path="/">
              <Route component={Lazy.Home} />
            </Route>
            <Route component={Lazy.Dashboard}>
              <PrivateRoute component={Lazy.Login} path="/dashboard" />
            </Route>
            {/* {ROUTES.map((route, index) => {
              if (route.isPrivate) {
                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                );
              }
              return <SubRoute key={index} {...route} />;
            })} */}
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default hot(Routes);
