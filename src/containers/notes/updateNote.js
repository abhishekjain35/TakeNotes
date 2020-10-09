import React, { useState } from "react";
import UpdateNoteComponent from "../../components/notes/updateNote";
import { firestore } from "../../firebase";
import { useLocation, useParams, useHistory } from "react-router-dom";

const UpdateNote = () => {
    const {id} = useParams();
    const history = useHistory()
    const location = useLocation()
    const [text, setText] = useState(location.state.content);
    const [headingText, setHeadingText] = useState(location.state.title);

    const handleQuillChange = (value) => {
        setText(value);
    };

    const handleHeadingChange = (e) => {
        setHeadingText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        firestore
            .collection("notes")
            .doc(id)
            .update({
                title: headingText,
                description: text,
                timestamp: Date.now(),
            })
            .then(() => {
                history.push("/")
            })
            .catch((err) => console.log(err));
    };

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

export default UpdateNote;
