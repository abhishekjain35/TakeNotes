import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import { auth } from "../../firebase";

const useStyles = makeStyles((theme) => ({
    link: {
        color: "inherit",
    },
    flexToolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            }
        });
    });
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.flexToolbar}>
                    <Typography variant="h6">
                        <Link className={classes.link} color="inherit" to="/">
                            TakeNotes
                        </Link>
                    </Typography>
                    {isLoggedIn && (<div>
                        <Button style={{ backgroundColor: "white" }}>
                            <SvgIcon
                                color="secondary"
                                height="448pt"
                                viewBox="0 0 448 448"
                                width="448pt"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
                            </SvgIcon>
                        </Button>
                    </div>)}
                    {!isLoggedIn && (
                        <div>
                            <Link
                                className={classes.link}
                                color="inherit"
                                to="/login"
                            >
                                <Button color="inherit">Login</Button>
                            </Link>
                            <Link
                                className={classes.link}
                                color="inherit"
                                to="/signup"
                            >
                                <Button color="inherit">Signup</Button>
                            </Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
