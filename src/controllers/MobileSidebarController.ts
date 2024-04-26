import {useState} from "react";
import * as React from "react";

export interface MobileSidebarController {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

export default function GetMobileSidebarController(): MobileSidebarController {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    return {open, handleOpen, handleClose};
}