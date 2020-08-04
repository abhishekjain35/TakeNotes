import React, { useState } from "react";
import TakeNoteComponent from "../../components/notes";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";

const TakeNote = ({ history }) => {
    const [text, setText] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [uid, setUid] = useState("");

    auth.onAuthStateChanged((user) => {
        if (user) {
            setUid(user.uid);
        }
    });

    const handleQuillChange = (value) => {
        setText(value);
    };

    const handleHeadingChange = (e) => {
        setHeadingText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        firestore
            .collection("users")
            .doc(uid)
            .collection("notes")
            .doc()
            .set({
                title: headingText,
                description: text,
            })
            .then(() => {
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <TakeNoteComponent
            text={text}
            handleQuillChange={handleQuillChange}
            headingText={headingText}
            handleHeadingChange={handleHeadingChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default withRouter(TakeNote);
