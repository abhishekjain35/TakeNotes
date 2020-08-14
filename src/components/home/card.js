import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
        justifyContent: "space-between",
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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const value = content;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div className={classes.operations}>
                    <Typography
                        variant="h4"
                        className={classes.title}
                        gutterBottom
                    >
                        {title}
                    </Typography>
                    <IconButton
                        style={{ height: "50%" }}
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className={classes.pos}>
                    <ReactQuill
                        value={value}
                        readOnly={true}
                        modules={{ toolbar: false }}
                        id="quill"
                    />
                </div>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <Link className={classes.link} to={`/updateNote/${id}`}>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={<EditIcon />}
                            >
                                edit
                            </Button>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Button
                            onClick={() => onDelete(id)}
                            className={classes.btn}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<DeleteIcon />}
                        >
                            delete
                        </Button>
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
}
