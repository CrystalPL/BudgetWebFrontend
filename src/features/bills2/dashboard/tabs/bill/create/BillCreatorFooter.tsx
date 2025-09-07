import React from "react";
import {DialogShowingController} from "../../../../../../controllers/DialogShowingController";
import {Button, DialogActions} from "@mui/material";

interface BillCreatorFooterProps {
    billCreatorDialogController: DialogShowingController;
}

export default function BillCreatorFooter(props: BillCreatorFooterProps) {
    return (
        <DialogActions sx={{p: 1.5, bgcolor: 'transparent'}}>
            <Button
                onClick={props.billCreatorDialogController.closeDialog}
                variant="contained"
                size="small"
                sx={{
                    borderRadius: 2,
                    px: 3,
                }}
            >
                Zamknij
            </Button>
            <Button
                variant="contained"
                // onClick={saveReceipt}
            >
                Zakończ
            </Button>
        </DialogActions>
    )
}