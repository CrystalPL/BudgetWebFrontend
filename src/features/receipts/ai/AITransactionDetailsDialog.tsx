import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    Tooltip
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import EditIcon from "@mui/icons-material/Edit";
import {ErrorOutline} from "@mui/icons-material";
import DateChooserComponent from "../forms/DateChooserComponent";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {AILoaderProps} from "./AILoader";

interface Props {
    getTransactionDetailsByAIController: DialogShowingController;
    onChange: (shopName: string, date: Date) => void;
    aiLoader: AILoaderProps;
}

export default function AITransactionDetailsDialog(props: Props) {
    const [shopName, setShopName] = useState<string>('');
    const [date, setDate] = useState<Date>();

    const [tempShopName, setTempShopName] = useState<string>('');
    const [tempShopNameError, setTempShopNameError] = useState('');
    const [tempDate, setTempDate] = useState<Date | null>(null);

    const [editingField, setEditingField] = useState<"none" | "shopName" | "transactionDate">("none");

    useEffect(() => {
        let aiReceipt = props.aiLoader.aiReceipt;
        if (aiReceipt != null) {
            setShopName(aiReceipt?.shop || '')
            setTempShopName(aiReceipt?.shop || '')
            setDate(aiReceipt.shoppingTime || undefined)
            setTempDate(aiReceipt?.shoppingTime || null)
        }
    }, [props.aiLoader.aiReceipt]);

    useEffect(() => {
        console.log("tempShopName po zmianie:", tempShopName);
    }, [tempShopName]);

    const startEditing = (field: "shopName" | "transactionDate") => {
        setTempShopName(shopName)
        setTempDate(date ?? null)
        setEditingField(field);
    };

    const saveEditShopName = () => {
        setEditingField("none");
        setShopName(tempShopName);
    };

    const cancelEditShopName = () => {
        setEditingField("none");
        setTempShopName(shopName)
    }

    const saveEditDate = () => {
        setEditingField("none");
        setDate(tempDate ? tempDate : new Date());
    }

    const cancelEditDate = () => {
        setEditingField("none");
        setTempDate(date ?? null)
    }

    const close = () => {
        setEditingField("none");
        props.getTransactionDetailsByAIController.closeDialog()
        setTempDate(null)
        setTempShopNameError('')
        setTempShopName('')
    }


    const validateShopName = () => {
        if (tempShopName === '') {
            setTempShopNameError("Podaj nazwę sklepu")
        }
    }

    return (
        <Dialog open={props.getTransactionDetailsByAIController.openDialogStatus}
                onClose={props.getTransactionDetailsByAIController.closeDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Odczytane dane transakcji</DialogTitle>
            <DialogContent>
                <Box sx={{mb: 1, display: "flex", alignItems: "center"}}>
                    <FormControl required margin="normal" fullWidth error={tempShopNameError !== ""}>
                        <InputLabel sx={{
                            fontSize: '16px',
                            '&.Mui-focused, &.MuiInputLabel-shrink': {
                                fontSize: '22px',
                            },
                        }}>Kto zapłacił</InputLabel>
                        <FilledInput
                            // name={shopName}
                            value={tempShopName}
                            onChange={(e) => setTempShopName(e.target.value)}
                            onBlur={validateShopName}
                            onFocus={() => setTempShopNameError('')}
                            disabled={editingField !== "shopName"}
                            sx={{
                                '& .MuiFilledInput-input': {
                                    backgroundColor: 'white',
                                }
                            }}
                        />
                        <FormHelperText sx={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            visibility: tempShopNameError != '' ? "visible" : "hidden"
                        }}>
                            <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                            {tempShopNameError}
                        </FormHelperText>
                    </FormControl>

                    {editingField !== "shopName" ? (
                        <Tooltip title="Edytuj">
                            <IconButton
                                color="primary"
                                onClick={() => startEditing("shopName")}
                                size="medium"
                                sx={{
                                    ml: 1,
                                    "&:hover": {
                                        backgroundColor: "rgba(75,187,71,0.2)",
                                    },
                                }}
                            >
                                <EditIcon fontSize="medium"/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Zapisz">
                                <IconButton color="success" onClick={saveEditShopName} size="medium">
                                    <SaveIcon fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Anuluj">
                                <IconButton onClick={cancelEditShopName} size="medium">
                                    <CloseIcon fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                </Box>

                {/* Data transakcji */}
                <Box sx={{mb: 3, display: "flex", alignItems: "center"}}>
                    <DateChooserComponent disabled={editingField !== "transactionDate"}
                                          date={tempDate}
                                          setDate={setTempDate}></DateChooserComponent>
                    {editingField !== "transactionDate" ? (
                        <Tooltip title="Edytuj">
                            <IconButton color="primary" onClick={() => startEditing("transactionDate")} size="medium"
                                        sx={{ml: 1}}>
                                <EditIcon fontSize="medium"/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Zapisz">
                                <IconButton color="success" onClick={saveEditDate} size="medium">
                                    <SaveIcon fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Anuluj">
                                <IconButton onClick={cancelEditDate} size="medium">
                                    <CloseIcon fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>

                {/* Przycisk anuluj i zapisz */}
                <Box sx={{mt: 3, display: "flex", justifyContent: "flex-end"}}>
                    {editingField !== "none" ? (
                            <Button variant="contained" disabled>Zapisz wszystkie zmiany</Button>
                        ) :
                        (
                            <>
                                <Button onClick={close} sx={{
                                    mr: 2,
                                    "&:hover": {
                                        backgroundColor: "rgba(75,187,71,0.2)",
                                    }
                                }}>Anuluj</Button>
                                <Button variant="contained"
                                        onClick={() => {
                                            props.onChange(shopName, date ? date : new Date())
                                            close()
                                        }}>Zapisz</Button>
                            </>
                        )
                    }
                </Box>
            </DialogContent>
        </Dialog>
    );
}
