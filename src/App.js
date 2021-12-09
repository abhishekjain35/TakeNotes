import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignIn from "./pages/signin";
import Notes from "./pages/notes";
import UpdateANote from "./pages/updateNote";
import NotFound from "./pages/not-found";
import AuthRoute from "./reusable-components/auth";

function App() {
  return (
    <div className="App">
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
        <AuthRoute exact path="/" component={Home} />
        <Route path="/not-found">
          <NotFound />
        </Route>
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
