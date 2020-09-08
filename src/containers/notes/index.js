import React, { useState } from "react";
import TakeNoteComponent from "../../components/notes";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";

const TakeNote = ({ history }) => {
    const [text, setText] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleQuillChange = (value) => {
        setText(value);
    };

    const handleHeadingChange = (e) => {
        setHeadingText(e.target.value);
    };

    const handleSnackBarClose = () => {
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!headingText || !text) {
            setErrorMessage("Please, fill out all the fields");
            return;
        }
        firestore
            .collection("notes")
            .doc()
            .set({
                title: headingText,
                description: text,
                userId: auth.currentUser.uid,
                timestamp: Date.now(),
            })
            .then(() => {
                history.push("/");
            })
            .catch((err) => console.log("ERROR: ", err));
    };

    return (
        <TakeNoteComponent
            text={text}
            headingText={headingText}
            handleQuillChange={handleQuillChange}
            handleHeadingChange={handleHeadingChange}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            handleSnackBarClose={handleSnackBarClose}
        />
    );
};

export default withRouter(TakeNote);
