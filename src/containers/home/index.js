import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import firebase, { firestore, auth } from "../../firebase";
import Spinner from "../../reusable-components/spinner";
import SearchBar from "../../components/home/search";
import Snackbar from "../../reusable-components/snackbar";

const HomeContainer = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    setLoading(true);
    let user = auth.currentUser;
    if (user) {
      setUid(user.uid);
      let normalItems = [];
      let pinnedItems = [];
      firestore
        .collection("notes")
        .where("userId", "==", uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().pinned) {
              pinnedItems.push({ id: doc.id, data: doc.data() });
            } else {
              normalItems.push({ id: doc.id, data: doc.data() });
            }
          });
          normalItems.sort((a, b) => b.data.timestamp - a.data.timestamp);
          pinnedItems.sort((a, b) => b.data.timestamp - a.data.timestamp);
          setData({ pinnedItems, normalItems });
          setLoading(false);
        });
    }
  }, [uid]);

  const onDelete = (id, pinned) => {
    setLoading(true);
    firestore
      .collection("notes")
      .doc(id)
      .delete()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));

    if (pinned) {
      setData({
        ...data,
        pinnedItems: data.pinnedItems.filter((obj) => obj.id !== id),
      });
    } else {
      setData({
        ...data,
        normalItems: data.normalItems.filter((obj) => obj.id !== id),
      });
    }
    setLoading(false);
  };

  const handlePin = (id, bool) => {
    setLoading(true);
    firestore
      .collection("notes")
      .doc(id)
      .update({
        pinned: bool ? firebase.firestore.FieldValue.delete() : true,
        timestamp: Date.now(),
      })
      .then(() => {
        if (bool) {
          let item = data.pinnedItems.find((ele) => ele.id === id);
          item.pinned = !bool;
          let arr = data.pinnedItems.filter((ele) => ele.id !== id);
          setData({
            normalItems: [item, ...data.normalItems],
            pinnedItems: arr,
          });
        } else {
          let item = data.normalItems.find((ele) => ele.id === id);
          item.pinned = !bool;
          let arr = data.normalItems.filter((ele) => ele.id !== id);
          setData({
            normalItems: arr,
            pinnedItems: [item, ...data.pinnedItems],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <HomeComponent onDelete={onDelete} data={data} handlePin={handlePin}>
          <SearchBar
            notes={
              data.normalItems || data.pinnedItems
                ? [...data.normalItems, ...data.pinnedItems]
                : []
            }
          />
          <Snackbar />
        </HomeComponent>
      )}
    </>
  );
};

export default HomeContainer;
