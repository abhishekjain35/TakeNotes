import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const SnackbarComponent = ({ handleSnackbarClose, snackbarProps }) => {
  return (
    <Snackbar
      open={snackbarProps.state}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity={snackbarProps.type}
      >
        {snackbarProps.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarComponent;
