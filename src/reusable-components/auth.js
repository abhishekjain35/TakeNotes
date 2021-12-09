import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Route, Redirect } from "react-router-dom";
import Spinner from "./spinner";
import { useHistory } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoadingAuth(false);
    });
  }, [history]);
  return loadingAuth ? (
    <Spinner />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  );
};

export default AuthRoute;
