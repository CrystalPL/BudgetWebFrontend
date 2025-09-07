import React, {useEffect, useState} from "react";
import {DialogShowingController} from "../../../../../../controllers/DialogShowingController";
import {Dialog} from "@mui/material";
import {BillCreatorHeader} from "./BillCreatorHeader";
import BillCreatorFooter from "./BillCreatorFooter";
import BillCreatorContent from "./content/BillCreatorContent";
import {CreateBillDetails} from "../../../../api/BillModel";
import {getCreateBillDetails} from "../../../../api/BillService";

interface BillCreatorDialogProps {
    billCreatorDialogController: DialogShowingController;
}

export default function BillCreatorDialog(props: BillCreatorDialogProps) {
    const [createBillDetails, setCreateBillDetails] = useState<CreateBillDetails>(null)


    useEffect(() => {
        if (!props.billCreatorDialogController.openDialogStatus) {
            return
        }

        const fetch = async () => {
            setCreateBillDetails(getCreateBillDetails());
        }

        fetch()

    }, [props.billCreatorDialogController.openDialogStatus]);

    return (
        <Dialog
            open={props.billCreatorDialogController.openDialogStatus}
            onClose={props.billCreatorDialogController.closeDialog}
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
            <BillCreatorHeader/>
            <BillCreatorContent createBillDetails={createBillDetails}/>
            <BillCreatorFooter {...props}/>
        </Dialog>
    );
}