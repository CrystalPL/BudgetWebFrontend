import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {ReactNode} from "react";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content: string | ReactNode;
    confirmText: string;
    confirmAction: () => void;
    confirmColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    cancelText?: string;
}

export default function CustomDialog({
                                         open,
                                         onClose,
                                         title,
                                         content,
                                         confirmText,
                                         confirmAction,
                                         confirmColor = "primary",
                                         cancelText = "Anuluj",
                                     }: CustomDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{fontWeight: "medium"}}>{title}</DialogTitle>
            <DialogContent>
                {typeof content === "string" ? <Typography>{content}</Typography> : content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="text"
                        sx={{"&:hover": {backgroundColor: "rgba(169, 190, 119, 0.2)"}}}>
                    {cancelText}
                </Button>
                <Button onClick={confirmAction} variant="contained" color={confirmColor}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
