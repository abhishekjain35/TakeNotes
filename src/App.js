import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignIn from "./pages/signin";
import Notes from "./pages/notes";
import { auth } from "./firebase";

function App({ history }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            if (!user) {
                history.push("/signin");
            }
            setLoading(false);
        });
    }, [history]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="App">
            <Switch>
                <Route path="/takeanote">
                    <Notes />
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

export default withRouter(App);
