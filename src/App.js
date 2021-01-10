import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignIn from "./pages/signin";
import Notes from "./pages/notes";
import { firestore, auth } from "./firebase";
import UpdateANote from "./pages/updateNote";
import Spinner from "./reusable-components/spinner";
import NotFound from "./pages/not-found";
import NavBar from "./containers/navbar";

function App({ history }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      firestore.enablePersistence().catch((err) => console.log(err));
      if (!user) {
        history.push("/signin");
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [history]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/takeanote">
          <Notes />
        </Route>
        <Route exact path="/updateNote/:id">
          <UpdateANote />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/not-found">
          <NotFound />
        </Route>
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
