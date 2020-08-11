import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 100,
        borderRadius: "10px",
    },
    title: {
        padding: "10px 0 0 0",
        // borderBottom: "1px solid grey",
    },
    pos: {
        // marginBottom: 12,
        opacity: 0.8,
    },
    operations: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },
    btn: {
        margin: "10px",
    },
    link: {
        color: "inherit",
    },
});

export default function SimpleCard({ title, content, onDelete, id }) {
    const classes = useStyles();

    const value = content;

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
                <div className={classes.operations}>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                    >
                        <Link className={classes.link} to={`/updateNote/${id}`}>
                            edit
                        </Link>
                    </Button>
                    <Button
                        onClick={() => onDelete(id)}
                        className={classes.btn}
                        variant="contained"
                        color="secondary"
                    >
                        delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
