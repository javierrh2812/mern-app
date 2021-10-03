import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AUTH_ROUTES, NO_AUTH_ROUTES, _404 as NotFound } from "./pages";
import Layout from "components/layout";
import { useAuth } from "hooks/useUser";
import { useSocket } from "hooks/useSocket";

function App() {
  const { user, checkAuth } = useAuth();
  const { connect, disconnect } = useSocket();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log("user state changet");
    if (user) connect();
    return () => {
      disconnect(user);
    };

    //eslint-disable-next-line
  }, [user]);
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to={user ? "/home" : "/login"} />
            </Route>
            {NO_AUTH_ROUTES.map((route) => (
              <NoAuthRoute {...route} />
            ))}
            {AUTH_ROUTES.map((route) => (
              <PrivateRoute key={route.path} {...route} />
            ))}
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ ...props }) =>
        user ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        ) : (
          <Component />
        )
      }
    />
  );
};
