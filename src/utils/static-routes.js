import * as Lazy from "utils/lazy-pages";
export const ROUTES = [
  {
    component: Lazy.Session,
    routes: [
      {
        path: "/login",
        component: Lazy.Login
      },
      {
        path: "/forgot-password",
        component: Lazy.ForgotPassword
      }
    ]
  },
  {
    component: Lazy.Landing,
    routes: [
      {
        path: "/",
        component: Lazy.Home,
        isHome: true
      }
    ]
  },
  {
    component: Lazy.Dashboard,
    routes: [
      {
        path: "/dashboard",
        component: Lazy.Home,
        isPrivate: true
      }
    ]
  }
];
