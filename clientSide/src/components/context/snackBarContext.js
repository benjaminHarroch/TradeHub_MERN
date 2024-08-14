
import React, { createContext, useState } from 'react';

// Create the Snackbar context
export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({ message: '', open: false });

    const showSnackbar = (message) => {
        setSnackbar({ message:message, open: true });
    };

    const hideSnackbar = (message) => {
        setSnackbar({ message:message, open: false });
    };

    return (
        <SnackbarContext.Provider value={{ snackbar, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};