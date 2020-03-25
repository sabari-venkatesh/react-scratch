import * as Lazy from "utils/lazy-pages";
export const ROUTES = {
  mainRoute: [],
  consumerRoutes: [
    {
      path: "/",
      component: Lazy.Home
    },
    {
      path: "/dynamic",
      component: Lazy.Landing
    }
  ]
};
