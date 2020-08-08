import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import { firestore, auth } from "../../firebase";
import { withRouter } from "react-router-dom";

const HomeContainer = ({ history }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState("");

    useEffect(() => {
        setLoading(true);
        let user = auth.currentUser;
        if (user) {
            setUid(user.uid);
            let arr = [];
            firestore
                .collection("users")
                .where("userId", "==", uid)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        arr.push({ id: doc.id, data: doc.data() });
                    });
                    setData(arr);
                    setLoading(false);
                });
        }
    }, [uid]);
    const onDelete = (id) => {
        setLoading(true);
        firestore
            .collection("users")
            .doc(uid)
            .collection("notes")
            .doc(id)
            .delete()
            .then(() => setLoading(false));

        setData(data.filter((obj) => obj.id !== id));
    };
    return (
        <>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <HomeComponent onDelete={onDelete} data={data} />
            )}
        </>
    );
};

export default withRouter(HomeContainer);
