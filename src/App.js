import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Switch>
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
