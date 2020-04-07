import { lazy } from "react";
// /\.\/[^/]+\/[^/]+\/index\.js$/
const context = require.context("./pages", true, /\.js$/, "lazy");

const modules = {};

context.keys().forEach((path) => {
  const name = path.replace(/^.+\/([^/]+)\/index\.js/, "$1");
  modules[name] = lazy(() =>
    import(/* webpackChunkName:"[request]"*/ `components/pages/${name}`)
  );
});

export { modules };

// export const Dashboard = lazy(() =>
//   import(/* webpackChunkName:"Dashboard"*/ "components/pages/Dashboard")
// );

// export const Home = lazy(() =>
//   import(/* webpackChunkName:"Home"*/ "components/pages/Home")
// );
