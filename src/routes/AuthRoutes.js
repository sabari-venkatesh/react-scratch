import React from "react";
import { Route, Redirect } from "react-router";
import Auth from "./Auth";

const AuthRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.getAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AuthRoutes;
