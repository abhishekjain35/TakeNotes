import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import SearchIcon from "@material-ui/icons/Search";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import "./search.css";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
  },
  listbox: {
    width: 300,
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
  },
}));

const SearchBar = ({ notes, searchText, handleSearch, handleOptionClick }) => {
  const classes = useStyles();
  const [inputRef, setRef] = React.useState(null);

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

  React.useEffect(() => {
    if (focused) {
      let list = document.querySelector(".searchBox");
      setRef(list);
    }
  }, [focused]);

  return (
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
      <MicIcon className="MicIcon" />
      <input type="submit" value="Search" className="searchButton" />
      {groupedOptions.length > 0 ? (
        <ul
          className={classes.listbox}
          {...getListboxProps()}
          id="listContainer"
        >
          {groupedOptions.map((option, index) => (
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
  );
};

export default SearchBar;
