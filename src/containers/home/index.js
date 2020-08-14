import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import { firestore, auth } from "../../firebase";
import { withRouter } from "react-router-dom";
import Spinner from "../../reusable-components/spinner";

const HomeContainer = ({ history }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setLoading(true);
        let user = auth.currentUser;
        if (user) {
            setUid(user.uid);
            let arr = [];
            firestore
                .collection("notes")
                .where("userId", "==", uid)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        arr.push({ id: doc.id, data: doc.data() });
                    });
                    setData(
                        arr.sort((a, b) => b.data.timestamp - a.data.timestamp)
                    );
                    setLoading(false);
                });
        }
    }, [uid]);
    const onDelete = (id) => {
        setLoading(true);
        firestore
            .collection("notes")
            .doc(id)
            .delete()
            .then(() => setLoading(false))
            .catch((err) => console.log(err));

        setData(data.filter((obj) => obj.id !== id));
    };
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <HomeComponent
                    open={open}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    onDelete={onDelete}
                    data={data}
                    anchorEl={anchorEl}
                />
            )}
        </>
    );
};

export default withRouter(HomeContainer);
