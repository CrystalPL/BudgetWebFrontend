import * as React from "react";
import {useRef, useState} from "react";

export interface NotificationsPopoverController {
    anchorElement: React.MutableRefObject<HTMLDivElement | null>
    handleOpen: () => void;
    handleClose: () => void;
    open: boolean;
}

export function GetNotificationsPopoverController(): NotificationsPopoverController {
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