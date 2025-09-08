'use client'
import {Alert, Snackbar, SnackbarOrigin} from "@mui/material";
import * as React from "react";
import {createContext, ReactNode, useContext, useState} from "react";

export default function SnackbarProvider({children}: { children: ReactNode }) {
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarOrigin, setSnackbarOrigin] = useState<SnackbarOrigin>({vertical: 'bottom', horizontal: 'left'});

    function closeSnackbar() {
        return () => setOpenSnackbar(false);
    }

    return (
        <SnackbarContext.Provider value={{setStatus, setOpenSnackbar, setStatusMessage, setSnackbarOrigin}}>
            {children}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={closeSnackbar()}
                      anchorOrigin={snackbarOrigin}>
                <Alert onClose={closeSnackbar()} severity={status} sx={{width: '100%'}}>
                    {statusMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export interface SnackbarController {
    setStatus: (status: 'success' | 'error') => void
    setOpenSnackbar: (open: boolean) => void
    setStatusMessage: (message: string) => void
    setSnackbarOrigin: (origin: SnackbarOrigin) => void
}

const SnackbarContext = createContext<SnackbarController | undefined>(undefined);

export function useSnackbarContext() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbarContext must be used within an SnackbarProvider');
    }

    return context;
}

