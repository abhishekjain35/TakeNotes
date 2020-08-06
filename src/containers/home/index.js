import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import { firestore, auth } from "../../firebase";

const HomeContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let user = auth.currentUser;
        if (user) {
            let arr = [];
            firestore
                .collection("users")
                .doc(user.uid)
                .collection("notes")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        arr.push({ id: doc.id, data: doc.data() });
                    });
                    setData(arr);
                    setLoading(false);
                });
        }
    }, []);
    const onDelete = (id) => {
        console.log("Delete Clicked", data);
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

export default HomeContainer;
