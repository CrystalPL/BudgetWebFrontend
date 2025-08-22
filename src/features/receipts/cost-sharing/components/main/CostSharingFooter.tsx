import {Button, DialogActions} from "@mui/material";
import React from "react";
import {DialogShowingController} from "../../../../../controllers/DialogShowingController";

interface CostSharingFooterProps {
    costSharingDialogController: DialogShowingController
}

export default function CostSharingFooter(props: CostSharingFooterProps) {
    return (
        <DialogActions sx={{p: 1.5, bgcolor: 'transparent'}}>
            <Button
                onClick={props.costSharingDialogController.closeDialog}
                variant="contained"
                size="small"
                sx={{
                    borderRadius: 2,
                    px: 3,
                }}
            >
                Zamknij
            </Button>
        </DialogActions>
    )
}