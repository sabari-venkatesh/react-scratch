import modules from "components";
console.log(modules.Home);
export const ROUTES = [
  {
    id: "home",
    path: "/",
    component: modules.Login,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    component: modules.Dashboard,
  },
  {
    id: "not-found",
    path: "*",
    component: modules.NotFound,
  },
];
