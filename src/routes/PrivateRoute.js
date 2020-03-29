import React from "react";
import { Route, Redirect } from "react-router";
import { isLoggedIn } from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(component);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
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

export default PrivateRoute;
