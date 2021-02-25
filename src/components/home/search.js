import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import "./search.css";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    marginTop: "50px",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    borderRadius: "5px",
    '& li[data-focus="true"]': {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "rgba(0, 0, 0, 0.87)",
      cursor: "pointer",
    },
    "& li": {
      padding: "10px",
    },
    "& li:active": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& div": {
      display: "flex",
      justifyContent: "flex-end",
    },
    "& svg": {
      cursor: "pointer",
    },
  },
  margin: {
    margin: theme.spacing(1),
    minWidth: 0,
  },
}));

const SearchBar = ({
  notes,
  searchText,
  handleSearch,
  handleOptionClick,
  titles,
  isListening,
  handleSpeech,
  isSpeechSupported,
  closeRecognitionError,
}) => {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: notes,
    getOptionLabel: (option) => option.data.title,
  });
  const classes = useStyles();
  const [inputRef, setRef] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  React.useEffect(() => {
    if (focused) {
      let list = document.querySelector(".searchBox");
      setRef(list);
    }
  }, [focused]);

  return (
    <>
      <div className="searchContainer" {...getRootProps()}>
        <SearchIcon className="searchIcon" />
        <input
          className="searchBox"
          type="search"
          name="search"
          placeholder="Search..."
          {...getInputProps()}
          value={searchText}
          onChange={handleSearch}
        />
        <div id="speech">
          <MicIcon className="MicIcon" onClick={handleSpeech} />
          <div className={isListening ? "pulse-ring" : null}></div>
        </div>
        {showSuggestions && groupedOptions.length && titles.length ? (
          <ul
            className={classes.listbox}
            {...getListboxProps()}
            id="listContainer"
          >
            <div onClick={() => setShowSuggestions(false)}>
              <ClearIcon />
            </div>
            {titles.map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                onClick={() => {
                  handleOptionClick(option.data.title);
                  inputRef.blur();
                }}
              >
                {option.data.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {!isSpeechSupported ? (
        <div className="errContainer">
          <p className="msg">
            Sorry, speech recognition is not supported in your browser :(
          </p>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={closeRecognitionError}
          >
            <CloseIcon />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
