import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    Divider,
    FormControl,
    FormHelperText,
    Grid2,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";
import * as React from "react";
import {useRef, useState} from "react";
import {CreateFormField} from "../api/CustomFormControlProps";
import {CustomFormControl} from "../../../components/CustomFormControl";
import {categories, Category, ReceiptItem, receiptItems, User} from "../api/ReceiptModel";
import DeleteIcon from "@mui/icons-material/Delete";
import GetProductsByAIComponent, {GetProductsByAIComponentRef} from "./GetProductsByAIComponent";
import {steps} from "./ReceiptCreating";
import {users} from "../../../app/(dashboard)/household/receipts/page";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
    addItemController: DialogShowingController,
    receiptCreatingController: DialogShowingController
}

export default function ReceiptItemsComponent(props: Props) {
    const productFieldProps = CreateFormField("Nazwa produktu", "productName")
    const quantityFieldProps = CreateFormField("Ilość", "quantity")
    const moneyFieldProps = CreateFormField("Kwota", "money")

    const [items, setItems] = useState<ReceiptItem[]>(receiptItems);
    const getProductsByAIController: DialogShowingController = GetShowingController()
    const [aiProcessing, setAiProcessing] = useState(false);

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.money * item.quantity, 0).toFixed(2)
    }

    const aiComponentRef = useRef<GetProductsByAIComponentRef>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        aiComponentRef.current?.handleUpload(e);
    };

    const handleBack = () => {
        props.addItemController.closeDialog()
        props.receiptCreatingController.openDialog()
    }

    const [choosenCategory, setChoosenCategory] = useState<Category | string>()
    const [categoryError, setCategoryError] = useState<string>('')

    const [choosenWhoReturn, setChoosenWhoReturn] = useState<User | string>()
    const [whoReturnError, setWhoReturnError] = useState<string>('')

    const [divingMoney, setDividingMoney] = useState<number>()
    const [dividingMoneyError, setDividingMoneyError] = useState<string>('')

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);

    const saveEditing = () => {
        if (editingIndex !== null && editedItem) {
            items[editingIndex] = editedItem;
            setEditingIndex(null);
            setEditedItem(null);
        }
    };

    const handleFieldChange = (field: keyof ReceiptItem, value: any) => {
        if (editedItem) {
            setEditedItem({...editedItem, [field]: value});
        }
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditedItem({...items[index]});
    };

    const cancelEditing = () => {
        setEditingIndex(null);
        setEditedItem(null);
    };


    return (
        <Dialog open={props.addItemController.openDialogStatus} onClose={props.addItemController.closeDialog}
                fullWidth PaperProps={{
            sx: {
                height: "90vh",
                maxWidth: "80%",
                display: "flex",
                flexDirection: "column",
                margin: "auto"
            },
        }}>
            <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                {/* Header Section */}
                <Paper elevation={0} sx={{p: 3, flexShrink: 0, pb: '10px'}}>
                    <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                        <Typography variant="h5">Panel produktów</Typography>
                    </Box>

                    <Stepper activeStep={1} sx={{mb: 2}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                {/* Main content */}
                <Box sx={{display: "flex", flexGrow: 1, flexDirection: {xs: "column", md: "row"}, overflow: "auto"}}>
                    {/* Left column - Form */}
                    <Box
                        sx={{
                            width: {xs: "100%", md: "40%"},
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            borderRight: {xs: "none", md: "1px solid"},
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 2}}>
                            Dodaj nowy produkt
                        </Typography>
                        <Grid2 container spacing={1} alignItems="flex-end">
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <CustomFormControl {...productFieldProps.props} />
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <CustomFormControl {...quantityFieldProps.props} />
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <CustomFormControl {...moneyFieldProps.props} />
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <FormControl fullWidth error={categoryError !== ''}>
                                    <InputLabel sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}>Kategoria</InputLabel>
                                    <Select
                                        value={choosenCategory}
                                        label={<Typography>Kategoria + {""}</Typography>}
                                        onChange={(e) => setChoosenCategory(e.target.value)}
                                        variant="outlined"
                                    >
                                        {categories.map((user) => (
                                            <MenuItem key={user.id} value={user.name}>
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText sx={{
                                        color: "red",
                                        display: "flex",
                                        alignItems: "center",
                                        visibility: categoryError ? "visible" : "hidden"
                                    }}>
                                        <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                        {categoryError}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <FormControl fullWidth error={dividingMoneyError !== ""}>
                                    <InputLabel sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}>Sposób dzielenia</InputLabel>
                                    <Select
                                        value={divingMoney}
                                        label={<Typography>Sposób dzielenia + {""}</Typography>}
                                        onChange={(e) => setDividingMoney(e.target.value)}
                                        variant="outlined"
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.id} value={user.name}>
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText sx={{
                                        color: "red",
                                        display: "flex",
                                        alignItems: "center",
                                        visibility: dividingMoneyError ? "visible" : "hidden"
                                    }}>
                                        <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                        {dividingMoneyError}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6}}>
                                <FormControl fullWidth error={whoReturnError !== ""}>
                                    <InputLabel sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}>Kto zapłacił</InputLabel>
                                    <Select
                                        value={choosenWhoReturn}
                                        label={<Typography>Kto zapłacił + {""}</Typography>}
                                        onChange={(e) => setChoosenWhoReturn(e.target.value)}
                                        variant="outlined"
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.id} value={user.name}>
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText sx={{
                                        color: "red",
                                        display: "flex",
                                        alignItems: "center",
                                        visibility: whoReturnError ? "visible" : "hidden"
                                    }}>
                                        <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                        {whoReturnError}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 4}}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Dodaj
                                </Button>
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 8}}>
                                <Button component="label" variant="outlined" sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(75,187,71,0.2)",
                                    }
                                }} fullWidth>
                                    {aiProcessing ? <CircularProgress size={24}/> : "Wczytaj produkty (AI)"}
                                    <input type="file" accept="image/*" hidden onChange={handleUpload}/>
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Box>

                    {/* Divider for mobile */}
                    <Divider sx={{display: {xs: "block", md: "none"}, my: 2}}/>

                    {/* Right column - Table */}
                    <Box sx={{width: {xs: "100%", md: "60%"}, p: 3, display: "flex", flexDirection: "column"}}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 2}}>
                            Lista produktów
                        </Typography>
                        {items.length > 0 ? (
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
                                            {items.map((item, index) => (
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
                                                                    sx={{
                                                                        input: {
                                                                            fontSize: "0.875rem",
                                                                            p: 0,
                                                                            height: "1.5rem"
                                                                        }
                                                                    }}
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
                                                                    value={editedItem?.money || 0}
                                                                    type="number"
                                                                    onChange={(e) => handleFieldChange('money', Number(e.target.value))}
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
                                                                {(editedItem?.money || 0) * (editedItem?.quantity || 0)}
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
                                                    ) : (
                                                        <>
                                                            <TableCell
                                                                sx={{px: 1, py: 1}}>{item.productName}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{item.quantity}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{item.money.toFixed(2)}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{(item.money * item.quantity).toFixed(2)}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{item.category.name}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{item.moneyDividing}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}}
                                                                       align="right">{item.userToReturnMoney.name}</TableCell>
                                                            <TableCell sx={{px: 1, py: 1}} align="right">
                                                                <Tooltip title="Edytuj">
                                                                    <IconButton color="primary"
                                                                                onClick={() => startEditing(index)}
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
                        )}
                    </Box>
                </Box>

                {/* Footer */}
                <Box sx={{
                    p: 3,
                    borderTop: 1,
                    borderColor: "divider",
                    flexShrink: 0,
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Button sx={{
                        "&:hover": {
                            backgroundColor: "rgba(75,187,71,0.2)",
                        }
                    }} onClick={handleBack}>Wstecz</Button>
                    <Button
                        variant="contained">Zakończ</Button> {/*{initialData ? "Zapisz zmiany" : "Zapisz paragon"}*/}
                </Box>
            </Box>
            <GetProductsByAIComponent setAiProcessing={setAiProcessing} ref={aiComponentRef}
                                      getProductsByAIController={getProductsByAIController}/>
        </Dialog>
    )
}
