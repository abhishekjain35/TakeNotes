import React, { useState, useCallback } from "react";
import SignInComponent from "../../components/signin";
import { withRouter } from "react-router-dom";
import firebase, { auth } from "../../firebase";

const SignInContainer = ({ history }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(values.email, values.password).then(
            () => {
                history.push("/");
            }
        );
    };

    const handleGoogleSignIn = useCallback(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        history.push("/");
    }, [history]);

    return (
        <SignInComponent
            handleChange={handleChange}
            handleSignIn={handleSignIn}
            handleGoogleSignIn={handleGoogleSignIn}
        />
    );
};

export default withRouter(SignInContainer);
