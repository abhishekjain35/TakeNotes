import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/home";
import firebase, { firestore, auth } from "../../firebase";
import Spinner from "../../reusable-components/spinner";
import SearchBar from "../../components/home/search";
import NavBarContainer from "../navbar";

const HomeContainer = () => {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const [data, setData] = useState({});
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  let recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onspeechend = function () {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = function (event) {
      var text = event.results[0][0].transcript;
      setSearchText(text.toLowerCase());
    };
  }

  useEffect(() => {
    setLoading(true);
    let user = auth.currentUser;
    if (user) {
      let normalItems = [];
      let pinnedItems = [];
      firestore
        .collection("notes")
        .where("userId", "==", user.uid)
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
          let fullData = [...normalItems, ...pinnedItems];
          setTitles(fullData);
          setCombinedData(fullData);
          setData({ pinnedItems, normalItems });
          setLoading(false);
        });
    }
  }, []);

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

  const handlePin = async (id, bool) => {
    setLoading(true);

    try {
      await firestore
        .collection("notes")
        .doc(id)
        .update({
          pinned: bool ? firebase.firestore.FieldValue.delete() : true,
          timestamp: Date.now(),
        });
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    let objs = combinedData.filter((obj) =>
      obj.data.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTitles(objs);
  };

  const handleOptionClick = (text) => {
    setSearchText(text);
  };

  const handleSpeech = () => {
    if (!recognition) {
      setIsSpeechSupported(false);
      return;
    }
    recognition.start();
    setIsListening(true);
  };

  const closeRecognitionError = () => {
    setIsSpeechSupported(true);
  };

  useEffect(() => {
    if (searchText) {
      const res = combinedData.filter((obj) => {
        var currentNode,
          ni = document.createNodeIterator(
            new DOMParser().parseFromString(obj.data.description, "text/html")
              .documentElement,
            NodeFilter.SHOW_ELEMENT
          );
        let text = "";

        while ((currentNode = ni.nextNode())) {
          text += currentNode.textContent;
        }
        return (
          text
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(searchText.toLowerCase().replace(/\s/g, "")) ||
          obj.data.title
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(searchText.toLowerCase().replace(/\s/g, ""))
        );
      });
      setSearchResults(res);
    }
  }, [combinedData, searchText]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NavBarContainer />
          <HomeComponent
            show={!searchText ? true : false}
            onDelete={onDelete}
            data={data}
            handlePin={handlePin}
            searchResults={searchResults}
          >
            <SearchBar
              handleSearch={handleSearch}
              searchText={searchText}
              handleOptionClick={handleOptionClick}
              notes={combinedData}
              titles={titles}
              isSpeechSupported={isSpeechSupported}
              isListening={isListening}
              handleSpeech={handleSpeech}
              closeRecognitionError={closeRecognitionError}
            />
          </HomeComponent>
        </>
      )}
    </>
  );
};

export default HomeContainer;
