'use client'
import {useCallback, useState} from "react";

export interface DialogShowingController {
    openDialogStatus: boolean
    closeDialog: () => void
    openDialog: () => void
}

export function GetShowingController(): DialogShowingController {
    const [open, setOpen] = useState(false)

    const closeDialog = useCallback(() => {
        setOpen(false)
    }, []);

    const openDialog = useCallback(() => {
        setOpen(true)
    }, []);

    return {openDialogStatus: open, closeDialog, openDialog}
}