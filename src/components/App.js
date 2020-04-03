import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { modules as Lazy } from "components";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {console.log(Lazy)}
      <Link to="/">ertert</Link>
      <Link to="/dashboard">ett</Link>
      <Switch>
        <Route path="/" component={Lazy.Dashboard} exact />
        <Route path="/dashboard" component={Lazy.Home} />
      </Switch>
    </Suspense>
  );
};

export default hot(App);
