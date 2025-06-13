import Container from "@mui/material/Container";
import * as React from "react";
import ReceiptDashboardHeader from "./ReceiptHeader";
import ReceiptTable from "./components/ReceiptTable";
import {HouseholdReloadKeyProps} from "../household/api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../controllers/DialogShowingController";
import ReceiptCreatingComponent from "./components/ReceiptCreating";
import {Receipt} from "./api/ReceiptModel";
import ReceiptItemsComponent from "./components/ReceiptItemsComponent";

interface ReceiptDashboardData extends HouseholdReloadKeyProps {
    receipts: Receipt[];

}

export default function ReceiptDashboard(props: ReceiptDashboardData) {
    const createReceiptDialogController: DialogShowingController = GetShowingController()
    const addItemsToReceipt: DialogShowingController = GetShowingController()

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
            <ReceiptTable receipts={props.receipts} reloadTable={props.reloadTable}/>
            <ReceiptCreatingComponent creatingController={createReceiptDialogController}
                                      addItemsToReceiptController={addItemsToReceipt}/>
            <ReceiptItemsComponent addItemController={addItemsToReceipt}
                                   receiptCreatingController={createReceiptDialogController}></ReceiptItemsComponent>
        </Container>
    )
}