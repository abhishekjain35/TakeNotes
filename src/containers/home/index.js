import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import { firestore, auth } from "../../firebase";
import Spinner from "../../reusable-components/spinner";

const HomeContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState("");

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
                <HomeComponent onDelete={onDelete} data={data} />
            )}
        </>
    );
};

export default HomeContainer;
