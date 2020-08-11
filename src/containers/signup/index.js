import React, { useState, useCallback } from "react";
import { auth } from "../../firebase";
import { withRouter } from "react-router-dom";
import SignUpComponent from "../../components/signup";
import firebase from "../../firebase";

const SignupContainer = ({ history }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = values;

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await auth
            .createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                userData.user
                    .updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        history.push("/");
                    });
            });
    };

    const handleGoogleSignIn = useCallback(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        history.push("/");
    }, [history]);

    return (
        <SignUpComponent
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleGoogleSignIn={handleGoogleSignIn}
        />
    );
};

export default withRouter(SignupContainer);
