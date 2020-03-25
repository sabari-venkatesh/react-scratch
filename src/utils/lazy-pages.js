import { lazy } from "react";

const Home = lazy(() =>
  import(/* webpackChunkName:'Home' */ "components/consumer/Home/Home")
);
const Landing = lazy(() =>
  import(/* webpackChunkName:'Landing' */ "components/consumer/")
);

export { Home, Landing };
