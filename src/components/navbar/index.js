import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    svg: {
        flexGrow: 1,
        textAlign: "left"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        flexGrow: 1,
        // alignContent: "flex-start",
        textAlign: "left",
    },
    formButton: {
        "&:focus": {
            backgroundColor: "inherit",
        },
    },
    link: {
        color: "inherit",
    },
    flexDiv: {
        display: "flex",
        justifyContent: "flex-start"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.menuButton}>
                        <Link className={classes.link} color="inherit" to="/">
                            News
                        </Link>
                    </Typography>
                        <div className={classes.flexDiv} className={classes.menuButton}>
                            <Button style={{backgroundColor: "white"}}>
                                <SvgIcon
                                    color="secondary"
                                    height="448pt"
                                    viewBox="0 0 448 448"
                                    width="448pt"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={classes.svg}
                                >
                                    <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
                                </SvgIcon>
                            </Button>
                        </div>
                    <Link className={classes.link} color="inherit" to="/login">
                        <Button className={classes.formButton} color="inherit">
                            Login
                        </Button>
                    </Link>
                    <Link className={classes.link} color="inherit" to="/signup">
                        <Button className={classes.formButton} color="inherit">
                            Signup
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
