import {Bill, BillingPeriod} from "../../../api/BillModel";
import {DialogShowingController} from "../../../../../controllers/DialogShowingController";
import {Avatar, Box, Chip, IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import * as React from "react";
import {AttachFile, Visibility} from "@mui/icons-material";
import BillTabTableItemCellWithActions from "./BillTabTableItemCellWithActions";

interface BillTabTableItemProps {
    bill: Bill
    deleteBillDialogController: DialogShowingController
}

export default function BillTabTableItem(props: BillTabTableItemProps) {
    const handleAction = (controller: DialogShowingController) => {
        // props.setEditedReceipt(props.receipt)
        controller.openDialog()
    }

    return (
        <TableRow sx={{
            '&:hover': {
                backgroundColor: '#f5f5f5'
            }
        }}>
            <GetTypeCell {...props.bill}/>
            <TableCell sx={{py: 1.5}}>{props.bill.amount}</TableCell>
            <TableCell sx={{py: 1.5}}>{mapDateToString(props.bill.dueDate)}</TableCell>
            <TableCell sx={{py: 1.5}}>{mapDateToString(props.bill.paymentDate)}</TableCell>
            <GetPeriodCell {...props.bill}/>
            <TableCell sx={{py: 1.5}}>{props.bill.whoPaid.userName}</TableCell>
            <GetPaidCell {...props.bill}/>
            <TableCell sx={{py: 1.5}}><GetAttachmentCell {...props.bill}/></TableCell>
            <BillTabTableItemCellWithActions
                deleteBillDialogController={props.deleteBillDialogController}
                handleAction={handleAction}
            />
        </TableRow>
    )
}

function GetAttachmentCell(bill: Bill) {
    if (bill.attachments.length == 0) {
        return (
            <Tooltip title="Brak załącznika">
                <IconButton size="small" disabled>
                    <AttachFile/>
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Tooltip title='Zobacz załącznik'>
            <IconButton
                size="small"
                // onClick={() => handleViewAttachment(bill)}
                color="primary"
            >
                <Visibility/>
            </IconButton>
        </Tooltip>
    )
}

function GetPaidCell(bill: Bill) {
    return (
        <TableCell sx={{py: 1.5}}>
            <Chip
                label={bill.isPaid ? 'Opłacony' : 'Nieopłacony'}
                color={bill.isPaid ? 'success' : 'error'}
                size="small"
            />
        </TableCell>
    )
}

function GetPeriodCell(bill: Bill) {
    const period: BillingPeriod = bill.period;
    return (
        <TableCell sx={{py: 1.5}}>
            {mapDateToString(period.from)} - {mapDateToString(period.to)}
        </TableCell>
    )
}

function GetTypeCell(bill: Bill) {
    return (
        <TableCell sx={{py: 1.5}}>
            <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{width: 24, height: 24, fontSize: 14}}>
                    {bill.billType.icon || '📄'}
                </Avatar>
                {bill.billType.name}
            </Box>
        </TableCell>
    )
}

function mapDateToString(date: Date | null) {
    if (!date) {
        return ''
    }

    return date.toLocaleString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}