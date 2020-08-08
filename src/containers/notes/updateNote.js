import React, { useState, useEffect } from "react";
import UpdateNoteComponent from "../../components/notes/updateNote";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";

const UpdateNote = ({ history, match }) => {
    const [text, setText] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [uid, setUid] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        let user = auth.currentUser;
        if (user) {
            setUid(user.uid);
        }
        firestore
            .collection("users")
            .doc(match.params.id)
            .get()
            .then((doc) => {
                if (mounted) {
                    setText(doc.data().description);
                    setHeadingText(doc.data().title);
                    setLoading(false);
                }
            });
        return function cleanup() {
            mounted = false;
        };
    }, [match.params.id]);

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
            .doc(match.params.id)
            .update({
                title: headingText,
                description: text,
            })
            .then(() => {
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <UpdateNoteComponent
            text={text}
            handleQuillChange={handleQuillChange}
            headingText={headingText}
            handleHeadingChange={handleHeadingChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default withRouter(UpdateNote);
