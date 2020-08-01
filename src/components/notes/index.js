import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextareaAutosize } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase";

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
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = ({ history }) => {
    const classes = useStyles();

    const [values, setvalues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (name) => (e) => {
        setvalues({ ...values, [name]: e.target.value });
    };

    const handleSignin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(values.email, values.password).then(
            () => {
                history.push("/");
            }
        );
    };

    return (
        <Container component="main" maxWidth="xs">
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
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        label="Enter Title"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange("email")}
                        margin="normal"
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextareaAutosize
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange("password")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs={12}>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(SignIn);
