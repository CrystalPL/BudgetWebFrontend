import * as React from "react";
import {useRef, useState} from "react";

export interface UserPopoverController {
    anchorElement: React.MutableRefObject<HTMLDivElement | null>
    handleOpen: () => void;
    handleClose: () => void;
    open: boolean;
}

export function GetUserPopoverController(): UserPopoverController {
    const anchorElement = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    return {anchorElement, handleClose, handleOpen, open};
}