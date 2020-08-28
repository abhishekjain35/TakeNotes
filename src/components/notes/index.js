import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../index.css";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(10, 0, 2),
    },
}));

const TakeNoteComponent = ({
    text,
    headingText,
    handleQuillChange,
    handleHeadingChange,
    handleSubmit,
    quill,
    modules,
}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CreateOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Take a Note
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Enter Title"
                        autoFocus
                        value={headingText}
                        onChange={handleHeadingChange}
                    />
                    <ReactQuill
                        placeholder="Take a note"
                        className="reactQuill"
                        value={text}
                        onChange={handleQuillChange}
                        modules={modules}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Create Note
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default TakeNoteComponent;
