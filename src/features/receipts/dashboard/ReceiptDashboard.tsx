'use client'
import Container from "@mui/material/Container";
import * as React from "react";
import {useState} from "react";
import ReceiptDashboardHeader from "./ReceiptDashboardHeader";
import ReceiptsOverviewTable from "../tables/ReceiptsOverviewTable";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import FirstStepDialog from "../forms/firstStep/FirstStepDialog";
import {CreateReceiptDetails, Receipt} from "../api/ReceiptModel";
import ReceiptProductsManager from "../forms/secondStep/ReceiptProductsManager";

interface ReceiptDashboardData extends HouseholdReloadKeyProps {
    receipts: Receipt[];

}

export default function ReceiptDashboard(props: ReceiptDashboardData) {
    const createReceiptDialogController: DialogShowingController = GetShowingController()
    const addItemsToReceipt: DialogShowingController = GetShowingController()
    const [editedReceipt, setEditedReceipt] = useState<Receipt | null>(null)
    const [createReceiptDetails, setCreateReceiptDetails] = useState<CreateReceiptDetails | null>(null)

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '90%',
                lg: '80%',
                xl: '88%',
            },
        }}>
            <ReceiptDashboardHeader creatingController={createReceiptDialogController}/>
            <ReceiptsOverviewTable receipts={props.receipts} reloadTable={props.reloadTable}
                                   editedReceipt={editedReceipt}
                                   setEditedReceipt={setEditedReceipt}
                                   createReceiptController={createReceiptDialogController}/>
            <FirstStepDialog creatingController={createReceiptDialogController}
                             addItemsToReceiptController={addItemsToReceipt}
                             editedReceipt={editedReceipt}
                             setEditedReceipt={setEditedReceipt} createReceiptDetails={createReceiptDetails}
                             setCreateReceiptDetails={setCreateReceiptDetails}/>
            <ReceiptProductsManager addItemController={addItemsToReceipt}
                                    receiptCreatingController={createReceiptDialogController}
                                    userWhoPaid={createReceiptDetails?.whoPaidLists || []}
                                    editedReceipt={editedReceipt}></ReceiptProductsManager>
        </Container>
    )
}