import {Box, IconButton, TableCell, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {History} from "@mui/icons-material";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";

interface CellWithActionsProps {
    createReceiptController: DialogShowingController
    deleteReceiptDialogController: DialogShowingController
    handleAction: (controller: DialogShowingController) => void
}

export function ReceiptTableCellWithActions(props: CellWithActionsProps) {
    return (
        <TableCell sx={{py: 1.5}} align="right">
            <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                <Tooltip title="Edytuj paragon">
                    <IconButton
                        color="primary"
                        onClick={() => props.handleAction(props.createReceiptController)}
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(75,187,71,0.2)",
                            },
                        }}
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Usuń paragon">
                    <IconButton
                        color="error"
                        onClick={() => props.handleAction(props.deleteReceiptDialogController)}
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
    );
}