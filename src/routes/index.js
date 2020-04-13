import modules from "components";
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
