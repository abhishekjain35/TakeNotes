import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
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
    },
    pos: {
        opacity: 0.8,
    },
    operations: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
    },
    link: {
        color: "inherit",
    },
    verticalIcon: {
        "&:focus": {
            backgroundColor: "transparent",
        },
    },
});

export default function SimpleCard({
    title,
    content,
    onDelete,
    id,
    handleClick,
    handleClose,
    anchorEl,
    open,
}) {
    const classes = useStyles();

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
                        className={classes.verticalIcon}
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
                            width: "15ch",
                        },
                    }}
                >
                    <Link className={classes.link} to={`/updateNote/${id}`}>
                        <MenuItem onClick={handleClose}>
                            <div>Edit</div>
                        </MenuItem>
                    </Link>
                    <div onClick={() => onDelete(id)}>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </div>
                </Menu>
            </CardContent>
        </Card>
    );
}
