import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContext } from './context/snackBarContext';
import { useContext } from 'react';

export default function MySnackbar({message}) {

  const { snackbar, showSnackbar, hideSnackbar }=useContext(SnackbarContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hideSnackbar();
  };

  return (
    <div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={`${snackbar.message}`}
      />
    </div>
  );
}
