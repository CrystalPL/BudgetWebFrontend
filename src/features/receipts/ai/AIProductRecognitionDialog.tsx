'use client'
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {AIReceiptItem, Category, ReceiptItem, UserWhoPaid} from "../api/ReceiptModel";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {AILoaderProps} from "./AILoader";

interface Props {
    getProductsByAIController: DialogShowingController;
    setAiProcessing: (ai: boolean) => void;
    categoryList: Category[]
    userWhoPaid: UserWhoPaid[]
    setItems: (receiptItems: ReceiptItem[]) => void
    aiLoader: AILoaderProps
}

export default function AIProductRecognitionDialog(props: Props) {
    const [aiRecognizedItems, setAiRecognizedItems] = useState<AIReceiptItem[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<AIReceiptItem | null>(null);

    useEffect(() => {
        if (props.aiLoader.aiReceipt !== null) {
            setAiRecognizedItems(props.aiLoader.aiReceipt.items)
        }
    }, [props.aiLoader.aiReceipt]);

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditedItem({...aiRecognizedItems[index]});
    };

    const cancelEditing = () => {
        setEditingIndex(null);
        setEditedItem(null);
    };

    const saveEditing = () => {
        if (editingIndex !== null && editedItem) {
            const updatedItems = [...aiRecognizedItems];
            updatedItems[editingIndex] = editedItem;
            setAiRecognizedItems(updatedItems);
            setEditingIndex(null);
            setEditedItem(null);
        }
    };

    const handleFieldChange = (field: keyof AIReceiptItem, value: any) => {
        if (editedItem) {
            setEditedItem({...editedItem, [field]: value});
        }
    };

    const mapAiItemsToReceiptItems = (aiItems: AIReceiptItem[]) => {
        const receiptItems: ReceiptItem[] = aiItems.map(item => ({
            id: 0,
            productName: item.productName || "",
            quantity: item.quantity || 0,
            price: item.price || 0,
            category: item.category,
            moneyDividing: 0,
            userToReturnMoney: null
        }));
        props.setItems(receiptItems);
        props.getProductsByAIController.closeDialog();
    }

    return (
        <Dialog open={props.getProductsByAIController.openDialogStatus}
                onClose={props.getProductsByAIController.closeDialog} maxWidth="lg" fullWidth>
            <DialogTitle>Odczytane produkty</DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: "20%"}}>Nazwa produktu</TableCell>
                                <TableCell align="left" sx={{width: "10%"}}>Ilość</TableCell>
                                <TableCell align="left" sx={{width: "10%"}}>Cena (zł)</TableCell>
                                <TableCell align="left" sx={{width: "10%"}}>Suma (zł)</TableCell>
                                <TableCell align="left" sx={{width: "15%"}}>Kategoria</TableCell>
                                <TableCell align="right" sx={{width: "10%"}}>Akcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {aiRecognizedItems.map((item, index) => (
                                <TableRow key={index}>
                                    {editingIndex === index ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    value={editedItem?.productName || ""}
                                                    onChange={(e) => handleFieldChange('productName', e.target.value)}
                                                    variant="standard"
                                                    fullWidth
                                                    size="small"
                                                    sx={{input: {fontSize: "0.875rem", p: 0, height: "1.5rem"}}}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    value={editedItem?.quantity || 0}
                                                    type="number"
                                                    onChange={(e) => handleFieldChange('quantity', Number(e.target.value))}
                                                    variant="standard"
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        input: {
                                                            fontSize: "0.875rem",
                                                            p: 0,
                                                            height: "1.5rem",
                                                            textAlign: "left"
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    value={editedItem?.price || 0}
                                                    type="number"
                                                    onChange={(e) => handleFieldChange('price', Number(e.target.value))}
                                                    variant="standard"
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        input: {
                                                            fontSize: "0.875rem",
                                                            p: 0,
                                                            height: "1.5rem",
                                                            textAlign: "left"
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {(editedItem?.price || 0) * (editedItem?.quantity || 0)}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Select
                                                    value={editedItem?.category?.id || ""}
                                                    onChange={(e) => {
                                                        const selected = props.categoryList.find(c => c.id === e.target.value);
                                                        handleFieldChange('category', selected);
                                                    }}
                                                    variant="standard"
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        fontSize: "0.875rem",
                                                        '.MuiSelect-select': {
                                                            p: 0,
                                                            height: "1.5rem",
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }
                                                    }}
                                                >
                                                    {props.categoryList.map(cat => (
                                                        <MenuItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Zapisz">
                                                    <IconButton color="success" onClick={saveEditing} size="small">
                                                        <SaveIcon fontSize="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Anuluj">
                                                    <IconButton onClick={cancelEditing} size="small">
                                                        <CloseIcon fontSize="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell align="left">{item.quantity}</TableCell>
                                            <TableCell align="left">{item.price?.toFixed(2) || 0}</TableCell>
                                            <TableCell
                                                align="left">{((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}</TableCell>
                                            <TableCell sx={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                            }} align="left">{item.category?.name}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edytuj">
                                                    <IconButton color="primary" onClick={() => startEditing(index)}
                                                                size="small">
                                                        <EditIcon fontSize="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Usuń">
                                                    <IconButton color="error" size="small">
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{mt: 3, display: "flex", justifyContent: "flex-end"}}>
                    <Button onClick={() => {
                        props.getProductsByAIController.closeDialog()
                    }} sx={{
                        mr: 2,
                        "&:hover": {
                            backgroundColor: "rgba(75,187,71,0.2)",
                        },
                    }}>Anuluj</Button>
                    <Button
                        variant="contained" onClick={() => mapAiItemsToReceiptItems(aiRecognizedItems)}>
                        Zatwierdź i dodaj do listy
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};