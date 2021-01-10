import React from "react";
import MicIcon from "@material-ui/icons/Mic";
import { makeStyles } from "@material-ui/core/styles";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import useAutocomplete from '@material-ui/lab/useAutocomplete';


const useStyles = makeStyles((theme) => ({
  label: {
    display: 'block',
  },
  listbox: {
    width: 300,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    marginTop: "50px",
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    borderRadius: "5px",
    '& li[data-focus="true"]': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      color: 'rgba(0, 0, 0, 0.87)',
      cursor: 'pointer',
    },
    '& li':{
      padding: "10px"
    },
    '& li:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
}));

const SearchBar = ({ notes }) => {
  const classes = useStyles();
  console.log(notes);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: notes,
    getOptionLabel: (option) => option.data.title,
  });

  return (
    <div className="searchContainer" {...getRootProps()}>
      <SearchIcon className="searchIcon" />
      <input
        className="searchBox"
        type="search"
        name="search"
        placeholder="Search..."
        {...getInputProps()}
      />
      <MicIcon className="MicIcon" />
      <input type="submit" value="Search" className="searchButton" />
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.data.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
