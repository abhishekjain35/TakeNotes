import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = (props) => {
    const modules = {
        toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["clean"],
        ],
    };

    return (
        <ReactQuill
            placeholder="Take a note"
            style={{ height: "40vh", marginTop: "20px", fontSize: "30px" }}
            modules={modules}
            onChange={props.onChange}
        />
    );
};

export default Editor;
