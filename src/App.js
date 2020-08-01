import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import SignIn from "./components/signin";
import TakeANote from "./components/notes";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route path="/takeanote">
                    <TakeANote />
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
