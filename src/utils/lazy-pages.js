import { lazy } from "react";

const Landing = lazy(() =>
  import(/* webpackChunkName:'Landing' */ "containers/Landing/Landing")
);

const Home = lazy(() =>
  import(/* webpackChunkName:'Home' */ "components/Home/Home")
);

const Session = lazy(() =>
  import(/* webpackChunkName:'Session' */ "containers/Session/Session")
);

const Login = lazy(() =>
  import(/* webpackChunkName:'Login' */ "components/Login/Login")
);

const ForgotPassword = lazy(() =>
  import(
    /* webpackChunkName:'ForgotPassword' */ "components/ForgotPassword/ForgotPassword"
  )
);

const Dashboard = lazy(() =>
  import(/* webpackChunkName:'Dashboard' */ "containers/Dashboard/Dashboard")
);

const Story = lazy(() =>
  import(/* webpackChunkName:'Story' */ "components/Story/Story")
);

export { Landing, Home, Session, Login, ForgotPassword, Dashboard, Story };
