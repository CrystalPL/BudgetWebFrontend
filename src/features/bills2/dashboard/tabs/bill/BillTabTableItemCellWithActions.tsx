import {Box, IconButton, TableCell, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {History} from "@mui/icons-material";
import {DialogShowingController} from "../../../../../controllers/DialogShowingController";

interface BillTableTableItemCellWithActionsProps {
    deleteBillDialogController: DialogShowingController
    handleAction: (controller: DialogShowingController) => void
}

export default function BillTabTableItemCellWithActions(props: BillTableTableItemCellWithActionsProps) {
    return (
        <TableCell sx={{py: 1.5}} align="right">
            <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                <Tooltip title="Edytuj rachunek">
                    <IconButton
                        color="primary"
                        // onClick={() => props.handleAction(props.createReceiptController)}
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(75,187,71,0.2)",
                            },
                        }}
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Usuń rachunek">
                    <IconButton
                        color="error"
                        onClick={() => props.handleAction(props.deleteBillDialogController)}
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(206,21,21,0.2)",
                            },
                        }}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Historia zmian">
                    <IconButton
                        color="error"
                        // onClick={() => handleAction(receipt, deleteCategoryDialogController)}
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(206,21,21,0.2)",
                            },
                        }}
                    >
                        <History/>
                    </IconButton>
                </Tooltip>
            </Box>
        </TableCell>
    )
}