import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: "10px",
    },
    title: {
        padding: "15px 0",
        borderBottom: "1px solid grey"
    },
    pos: {
        marginBottom: 12,
        opacity: 0.8,
    },
});

export default function SimpleCard({ title, content }) {
    const classes = useStyles();

    const [value, setValue] = useState(content);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" className={classes.title} gutterBottom>
                    {title}
                </Typography>
                <div className={classes.pos}>
                    <ReactQuill
                        value={value}
                        readOnly={true}
                        modules={{ toolbar: false }}
                        id="quill"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
