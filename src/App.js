import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Navbar from "./containers/navbar";
import Signup from "./containers/signup";
import SignIn from "./containers/signin";
import TakeNote from "./containers/notes";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route path="/takeanote">
                    <TakeNote />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
