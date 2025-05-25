'use client'
import {
    Box,
    Button,
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
import {forwardRef, useImperativeHandle, useState} from "react";
import {categories, ReceiptItem} from "../api/ReceiptModel";
import {users} from "../../../app/(dashboard)/household/receipts/page";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export interface GetProductsByAIComponentRef {
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
    getProductsByAIController: DialogShowingController;
    setAiProcessing: (ai: boolean) => void;
}

const AIProductRecognitionDialog = forwardRef<GetProductsByAIComponentRef, Props>((props, ref) => {
    const [aiRecognizedItems, setAiRecognizedItems] = useState<ReceiptItem[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);

    useImperativeHandle(ref, () => ({
        handleUpload
    }));

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.setAiProcessing(true);

            setTimeout(() => {
                const newItems: ReceiptItem[] = [
                    {
                        productName: "Bread",
                        quantity: 2,
                        price: 10.00,
                        category: categories[0],
                        moneyDividing: 5.00,
                        userToReturnMoney: users[1]
                    },
                    {
                        productName: "Bread",
                        quantity: 2,
                        price: 10.00,
                        category: categories[0],
                        moneyDividing: 5.00,
                        userToReturnMoney: users[1]
                    },
                    {
                        productName: "Bread",
                        quantity: 2,
                        price: 10.00,
                        category: categories[0],
                        moneyDividing: 5.00,
                        userToReturnMoney: users[1]
                    },
                    {
                        productName: "Laptop",
                        quantity: 1,
                        price: 3500.00,
                        category: categories[1],
                        moneyDividing: 1750.00,
                        userToReturnMoney: users[2]
                    },
                    {
                        productName: "Detergent",
                        quantity: 3,
                        price: 45.00,
                        category: categories[2],
                        moneyDividing: 15.00,
                        userToReturnMoney: users[0]
                    }
                ];
                props.setAiProcessing(false);
                setAiRecognizedItems(newItems);
                props.getProductsByAIController.openDialog();
            }, 3000);
        }
    };

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

    const handleFieldChange = (field: keyof ReceiptItem, value: any) => {
        if (editedItem) {
            setEditedItem({...editedItem, [field]: value});
        }
    };

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
                                <TableCell align="left" sx={{width: "5%"}}>Sposób dzielenia</TableCell>
                                <TableCell align="left" sx={{width: "20%"}}>Kto zwraca
                                    kasę</TableCell>
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
                                                    value={editedItem?.category.id || ""}
                                                    onChange={(e) => {
                                                        const selected = categories.find(c => c.id === e.target.value);
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
                                                    {categories.map(cat => (
                                                        <MenuItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    value={editedItem?.moneyDividing || 0}
                                                    type="number"
                                                    onChange={(e) => handleFieldChange('moneyDividing', Number(e.target.value))}
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
                                                <Select
                                                    value={editedItem?.userToReturnMoney.id || ""}
                                                    onChange={(e) => {
                                                        const selected = users.find(u => u.id === e.target.value);
                                                        handleFieldChange('userToReturnMoney', selected);
                                                    }}
                                                    variant="standard"
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        maxWidth: "150px",
                                                        fontSize: "0.875rem",
                                                        '.MuiSelect-select': {
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                        }
                                                    }}
                                                >
                                                    {users.map(u => (
                                                        <MenuItem key={u.id} value={u.id}>
                                                            {u.name}
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
                                            <TableCell align="left">{item.price.toFixed(2)}</TableCell>
                                            <TableCell
                                                align="left">{(item.price * item.quantity).toFixed(2)}</TableCell>
                                            <TableCell sx={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                            }} align="left">{item.category.name}</TableCell>
                                            <TableCell align="left">{item.moneyDividing}</TableCell>
                                            <TableCell align="left" sx={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis"
                                            }}>
                                                {item.userToReturnMoney.name}
                                            </TableCell>
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
                        variant="contained"> {/* onClick={() => setItems(prev => [...prev, ...aiRecognizedItems])} */}
                        Zatwierdź i dodaj do listy
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
});
AIProductRecognitionDialog.displayName = "AIProductRecognitionDialog";

export default AIProductRecognitionDialog;
