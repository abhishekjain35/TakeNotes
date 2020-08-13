import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./containers/home";
import Signup from "./containers/signup";
import SignIn from "./containers/signin";
import Notes from "./containers/notes";
import { auth } from "./firebase";
import UpdateANote from "./containers/notes/updateNote";
import Spinner from "./reusable-components/spinner";
import NavBarContainer from "./containers/navbar";

function App({ history }) {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            if (!user) {
                history.push("/signin");
            } else {
                setIsLoggedIn(true);
            }
            setLoading(false);
        });
    }, [history]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="App">
            <NavBarContainer
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <Switch>
                <Route path="/takeanote">
                    <Notes />
                </Route>
                <Route path="/updateNote/:id">
                    <UpdateANote />
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
