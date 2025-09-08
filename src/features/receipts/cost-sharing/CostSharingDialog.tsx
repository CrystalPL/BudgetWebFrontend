import React from 'react';
import {Dialog} from '@mui/material';
import {CostSharingHeader} from "./components/main/CostSharingHeader";
import CostSharingFooter from "./components/main/CostSharingFooter";
import {ReceiptItem, UserWhoPaid} from "../api/ReceiptModel";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import CostSharingMainContent from "./components/main/CostSharingMainContent";

interface CostSharingDialogProps {
    productList: ReceiptItem[];
    whoPaid: UserWhoPaid;
    users: UserWhoPaid[];
    costSharingDialogController: DialogShowingController;
}

export default function CostSharingDialog(props: CostSharingDialogProps) {
    return (
        <Dialog
            open={props.costSharingDialogController.openDialogStatus}
            onClose={props.costSharingDialogController.closeDialog}
            maxWidth="lg"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        maxHeight: '85vh',
                        minHeight: '85vh',
                        background: '#f0f8f0',
                    },
                },
            }}
        >
            <CostSharingHeader/>
            <CostSharingMainContent productList={props.productList} whoPaid={props.whoPaid}
                                    householdUsers={props.users}/>
            <CostSharingFooter costSharingDialogController={props.costSharingDialogController}/>
        </Dialog>
    );
}
