import {Receipt} from "../../api/ReceiptModel";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import {TableCell, TableRow} from "@mui/material";
import {ReceiptTableCellWithActions} from "./ReceiptTableCellWithActions";
import * as React from "react";

interface TableItemProps {
    receipt: Receipt;
    setEditedReceipt: (receipt: Receipt) => void;
    createReceiptController: DialogShowingController
    deleteReceiptDialogController: DialogShowingController
}

export default function TableItem(props: TableItemProps) {
    const handleAction = (controller: DialogShowingController) => {
        props.setEditedReceipt(props.receipt)
        controller.openDialog()
    }

    return (
        <TableRow sx={{
            '&:hover': {
                backgroundColor: '#f5f5f5'
            }
        }}>
            <TableCell sx={{py: 1.5}}>{props.receipt.shop}</TableCell>
            <TableCell sx={{py: 1.5}}>{props.receipt.shoppingTime.toLocaleString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</TableCell>
            <TableCell sx={{py: 1.5}}>{props.receipt.receiptAmount}</TableCell>
            <TableCell sx={{py: 1.5}}>{props.receipt.whoPaid.userName}</TableCell>
            <TableCell sx={{py: 1.5}}>{props.receipt.settled ? "Tak" : "Nie"}</TableCell>
            <ReceiptTableCellWithActions createReceiptController={props.createReceiptController}
                                         deleteReceiptDialogController={props.deleteReceiptDialogController}
                                         handleAction={handleAction}/>
        </TableRow>
    );
}