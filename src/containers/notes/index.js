import React, { useState, useEffect } from "react";
import TakeNoteComponent from "../../components/notes";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";

const TakeNote = ({ history }) => {
    const [text, setText] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
        let user = auth.currentUser;
        if (user) {
            setUid(user.uid);
        }
    }, []);

    const handleQuillChange = (value) => {
        setText(value);
    };

    const handleHeadingChange = (e) => {
        setHeadingText(e.target.value);
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [2, 3, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["code"],
            ],
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        firestore
            .collection("notes")
            .doc()
            .set({
                title: headingText,
                description: text,
                userId: uid,
                timestamp: Date.now(),
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
            modules={modules}
        />
    );
};

export default withRouter(TakeNote);
