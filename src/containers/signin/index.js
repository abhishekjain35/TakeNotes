import React, { useState } from "react";
import SignInComponent from "../../components/signin";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase";

const SignIn = ({ history }) => {
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

    return (
        <SignInComponent
            handleChange={handleChange}
            handleSignIn={handleSignIn}
        />
    );
};

export default withRouter(SignIn);
