import React, { useState } from "react";
import { auth } from "../../firebase";
import { withRouter } from "react-router-dom";
import SignUpComponent from "../../components/signup";

const Signup = ({ history }) => {
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
                        history.push("/")
                    });
            });
    };
    
    return (
        <SignUpComponent
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default withRouter(Signup);
