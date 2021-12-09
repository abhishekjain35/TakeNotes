import React, { useState } from "react";
import SignInComponent from "../../components/signin";
import { withRouter } from "react-router-dom";
import firebase, { auth } from "../../firebase";
import NavBarContainer from "../navbar";

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
    auth.signInWithEmailAndPassword(values.email, values.password).then(() => {
      history.push("/");
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBarContainer />
      <SignInComponent
        handleChange={handleChange}
        handleSignIn={handleSignIn}
        handleGoogleSignIn={handleGoogleSignIn}
      />
    </>
  );
};

export default withRouter(SignInContainer);
