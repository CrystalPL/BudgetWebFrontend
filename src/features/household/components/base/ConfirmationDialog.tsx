import * as React from "react";
import CustomDialog from "../../../../components/CustomDialog";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

interface ConfirmationDialogProps {
    open: boolean;
    closeDialog: () => void;
    title: string;
    content: string;
    confirmText: string;
    confirmColor?: "primary" | "secondary" | "error";
    action: () => Promise<{ success: boolean, message: string }>;
    reloadTable?: () => void;
}

export default function ConfirmationDialog({
                                               open,
                                               closeDialog,
                                               title,
                                               content,
                                               confirmText,
                                               confirmColor = "primary",
                                               action,
                                               reloadTable
                                           }: ConfirmationDialogProps) {
    const snackbarController = useSnackbarContext();

    const handleAction = async () => {
        const response = await action();
        if (response.success && reloadTable) {
            reloadTable();
        }

        snackbarController.setStatus(response.success ? "success" : "error");
        snackbarController.setStatusMessage(response.message);
        snackbarController.setOpenSnackbar(true);

        closeDialog();
    };

    return (
        <CustomDialog
            open={open}
            onClose={closeDialog}
            title={title}
            content={content}
            confirmText={confirmText}
            confirmAction={handleAction}
            confirmColor={confirmColor}
        />
    );
}