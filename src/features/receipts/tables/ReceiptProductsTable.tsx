import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useState} from "react";
import {Category, GetProductListResponse, ReceiptItem, UserWhoPaid} from "../api/ReceiptModel";
import EditableProductRow from "./EditableProductRow";

interface Props {
    items: ReceiptItem[];
    setItems: (items: ReceiptItem[]) => void
    productList: GetProductListResponse[]
    categoryList: Category[]
    users: UserWhoPaid[]
}

export default function ReceiptProductsTable(props: Props) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);

    const calculateTotal = () => {
        return props.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditedItem({...props.items[index]});
    };

    const deleteItem = (receiptItem: ReceiptItem) => {
        const updatedItems = props.items.filter(item => JSON.stringify(item) !== JSON.stringify(receiptItem));
        props.setItems(updatedItems);
    };

    return (
        <Box sx={{width: {xs: "100%", lg: "60%"}, p: 3, display: "flex", flexDirection: "column"}}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 2}}>
                Lista produktów
            </Typography>
            {props.items.length > 0 ? (
                <Paper elevation={0} variant="outlined" sx={{
                    mb: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}>
                    <TableContainer sx={{flexGrow: 1, overflow: "auto"}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{px: 1, py: 1, width: "20%"}}>Nazwa produktu</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "10%"}}
                                               align="right">Ilość</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "10%"}} align="right">Cena
                                        (zł)</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "10%"}} align="right">Suma
                                        (zł)</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "15%"}}
                                               align="right">Kategoria</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "5%"}} align="right">Sposób
                                        dzielenia</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "20%"}} align="right">Kto zwraca
                                        kasę</TableCell>
                                    <TableCell sx={{px: 1, py: 1, width: "10%"}}
                                               align="center">Akcje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.items.map((item, index) => (
                                    <TableRow key={index}>
                                        {editingIndex === index ? (
                                            <EditableProductRow editedItem={editedItem} setEditedItem={setEditedItem}
                                                                editingIndex={editingIndex}
                                                                setEditingIndex={setEditingIndex}
                                                                setItems={props.setItems}
                                                                items={props.items} productList={props.productList}
                                                                categoryList={props.categoryList}
                                                                users={props.users}></EditableProductRow>
                                        ) : (
                                            <>
                                                <TableCell
                                                    sx={{px: 1, py: 1}}>{item.productName}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{item.quantity}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{item.price.toFixed(2)}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{item.category.name}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{item.moneyDividing == null || item.moneyDividing == 0 ? "" : item.moneyDividing + "%"}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}}
                                                           align="right">{item.userToReturnMoney ? item.userToReturnMoney.userName : ''}</TableCell>
                                                <TableCell sx={{px: 1, py: 1}} align="right">
                                                    <Tooltip title="Edytuj">
                                                        <IconButton color="primary"
                                                                    onClick={() => startEditing(index)}
                                                                    size="small">
                                                            <EditIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Usuń">
                                                        <IconButton color="error" size="small"
                                                                    onClick={() => deleteItem(item)}>
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </>
                                        )
                                        }
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">
                                        <Typography variant="subtitle2" fontWeight="bold">Suma
                                            całkowita:</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="subtitle2"
                                                    fontWeight="bold">{calculateTotal()} zł</Typography>
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{mb: 3, textAlign: "center"}}>
                    Brak dodanych produktów
                </Typography>
            )
            }
        </Box>
    )
}