import { lazy } from "react";
const context = require.context(
  ".",
  true,
  /\.\/[^/]+\/[^/]+\/index\.js$/,
  "lazy"
);

const modules = {};

context.keys().forEach((path) => {
  const name = path.replace(/^.+\/([^/]+)\/index\.js/, "$1");
  modules[name] = lazy(() =>
    import(/* webpackChunkName:"[request]"*/ `${path}`)
  );
});

console.log(modules);

export default modules;
