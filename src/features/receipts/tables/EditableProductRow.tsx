import {Autocomplete, IconButton, TableCell, TextField, Tooltip} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {Category, GetProductListResponse, ReceiptItem, UserWhoPaid} from "../api/ReceiptModel";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {verifyFields} from "../VerifyFields";

interface Props {
    editedItem: ReceiptItem | null
    setEditedItem: (item: ReceiptItem | null) => void
    editingIndex: number | null
    setEditingIndex: (index: number | null) => void
    setItems: (items: ReceiptItem[]) => void
    items: ReceiptItem[]
    productList: GetProductListResponse[]
    categoryList: Category[]
    users: UserWhoPaid[]
}

export default function EditableProductRow(props: Props) {
    const snackbarController = useSnackbarContext();

    const showSnackbar = (message: string) => {
        snackbarController.setSnackbarOrigin({vertical: 'top', horizontal: 'center'})
        snackbarController.setStatusMessage(message)
        snackbarController.setStatus('error')
        snackbarController.setOpenSnackbar(true)
    }

    const handleFieldChange = (field: keyof ReceiptItem, value: any) => {
        if (props.editedItem) {
            props.setEditedItem({...props.editedItem, [field]: value});
        }
    };

    const saveEditing = () => {
        if (props.editingIndex !== null && props.editedItem) {
            const error = verifyFields(props.editedItem);
            if (error !== "") {
                showSnackbar(error)
                return

            }

            const newItems = [...props.items];
            newItems[props.editingIndex] = props.editedItem;
            props.setItems(newItems);
            props.setEditingIndex(null);
            props.setEditedItem(null);
        }
    };

    const cancelEditing = () => {
        props.setEditingIndex(null);
        props.setEditedItem(null);
    };

    const handleChangeNumberField = (field: keyof ReceiptItem, value: string) => {
        value = value.replace(",", ".")
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
            handleFieldChange(field, numberValue);
        } else {
            showSnackbar("Niepoprawna wartość pola liczbowego")
        }
    }

    return (
        <>
            <TableCell>
                <Autocomplete
                    freeSolo
                    value={props.editedItem?.productName || ""}
                    options={props.productList}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    onInputChange={(_, newValue) => handleFieldChange('productName', newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            size="small"
                            sx={{
                                input: {
                                    fontSize: "0.875rem",
                                    p: 0,
                                    height: "1.5rem"
                                }
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="left">
                <TextField
                    value={props.editedItem?.quantity || ''}
                    type="text"
                    onChange={(e) => handleChangeNumberField('quantity', e.target.value)}
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
                    value={props.editedItem?.price || ''}
                    type="text"
                    onChange={(e) => handleChangeNumberField('price', e.target.value)}
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
                {(props.editedItem?.price || 0) * (props.editedItem?.quantity || 0)}
            </TableCell>
            <TableCell align="left">
                <Autocomplete
                    value={props.editedItem?.category ?? null}
                    options={props.categoryList}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, newValue) => handleFieldChange('category', newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            size="small"
                            sx={{
                                input: {
                                    fontSize: "0.875rem",
                                    p: 0,
                                    height: "1.5rem"
                                }
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="left">
                <Autocomplete
                    freeSolo
                    forcePopupIcon
                    disableClearable={true}
                    value={props.editedItem?.moneyDividing != null ? `${props.editedItem.moneyDividing}%` : ''}
                    options={['10%', '30%', '50%', '70%', '100%']}
                    onInputChange={(_, newValue) => handleFieldChange('moneyDividing', newValue.replace("%", ""))}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            size="small"
                            sx={{
                                input: {
                                    fontSize: "0.875rem",
                                    p: 0,
                                    height: "1.5rem"
                                }
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="left">
                <Autocomplete
                    value={props.editedItem?.userToReturnMoney ?? null}
                    options={props.users}
                    getOptionLabel={(option) => option?.userName || ''}
                    onChange={(_, newValue) => handleFieldChange('userToReturnMoney', newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            size="small"
                            sx={{
                                input: {
                                    fontSize: "0.875rem",
                                    p: 0,
                                    height: "1.5rem"
                                }
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Zapisz">
                    <IconButton color="success" onClick={saveEditing}
                                size="small">
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
    )
}