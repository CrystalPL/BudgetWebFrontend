import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    Typography
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import {ErrorOutline} from "@mui/icons-material";
import {CustomFormControl} from "../../../../components/CustomFormControl";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category, GetProductListResponse, ReceiptItem, UserWhoPaid} from "../../api/ReceiptModel";
import {CreateFormField} from "../../api/CustomFormControlProps";
import {suggestCategory} from "../../api/ReceiptService";
import {CreateReceiptItemMessage} from "../../api/ReceiptMessages";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import {AILoaderProps} from "../../ai/AILoader";

interface Props {
    productList: GetProductListResponse[]
    categoryList: Category[]
    aiProcessing: boolean
    userWhoPaid: UserWhoPaid[]
    addItem: (item: ReceiptItem) => void
    addItemController: DialogShowingController
    setAiProcessing: (value: boolean) => void
    aiLoader: AILoaderProps
    aiProductRecognitionDialogController: DialogShowingController
}

export default function CreateReceiptItemForm(props: Props) {
    const quantityFieldProps = CreateFormField("Ilość", "quantity")
    const moneyFieldProps = CreateFormField("Kwota", "money")

    const [category, setCategory] = useState<Category | null>(null)
    const [categoryError, setCategoryError] = useState<string>('')

    const [whoReturn, setWhoReturn] = useState<UserWhoPaid | null>()
    const [whoReturnError, setWhoReturnError] = useState<string>('')

    const [dividing, setDividingMoney] = useState<string>('')
    const [dividingMoneyError, setDividingMoneyError] = useState<string>('')

    const [productName, setProductName] = useState<string>('')
    const [productNameError, setProductNameError] = useState<string>('')

    useEffect(() => {
        if (props.addItemController.openDialogStatus) {
            setProductNameError('')
            setCategoryError('')
            setDividingMoneyError('')
            setWhoReturnError('')
            quantityFieldProps.setError('')
            moneyFieldProps.setError('')

            quantityFieldProps.setValue('')
            moneyFieldProps.setValue('')
            setProductName('')
            setCategory(null)
            setDividingMoney('')
            setWhoReturn(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.addItemController.openDialogStatus])

    const verifyFields = (): boolean => {
        let hasError = false;

        if (quantityFieldProps.value === '') {
            quantityFieldProps.setError(CreateReceiptItemMessage.AMOUNT_EMPTY);
            hasError = true;
        } else {
            const value = Number(quantityFieldProps.value);
            if (isNaN(value)) {
                quantityFieldProps.setError(CreateReceiptItemMessage.AMOUNT_INVALID);
                hasError = true;
            } else if (value < 0) {
                quantityFieldProps.setError(CreateReceiptItemMessage.AMOUNT_NEGATIVE);
                hasError = true;
            }
        }

        if (moneyFieldProps.value === '') {
            moneyFieldProps.setError(CreateReceiptItemMessage.PRICE_EMPTY);
            hasError = true;
        } else {
            const value = Number(moneyFieldProps.value);
            if (isNaN(value)) {
                moneyFieldProps.setError(CreateReceiptItemMessage.PRICE_INVALID);
                hasError = true;
            } else if (value < 0) {
                moneyFieldProps.setError(CreateReceiptItemMessage.PRICE_NEGATIVE);
                hasError = true;
            }
        }

        if (productName === '') {
            setProductNameError(CreateReceiptItemMessage.PRODUCT_NAME_EMPTY);
            hasError = true;
        } else if (productName.length <= 1) {
            setProductNameError(CreateReceiptItemMessage.PRODUCT_NAME_TOO_SHORT);
            hasError = true;
        } else if (productName.length > 64) {
            setProductNameError(CreateReceiptItemMessage.PRODUCT_NAME_TOO_LONG);
            hasError = true;
        }

        if (category === null) {
            setCategoryError(CreateReceiptItemMessage.EMPTY_CATEGORY);
            hasError = true;
        }

        if (dividing !== '') {
            const dividingNumberValue = Number(dividing.replace("%", ""));
            if (isNaN(dividingNumberValue)) {
                setDividingMoneyError(CreateReceiptItemMessage.INVALID_DIVIDING);
                hasError = true;
            } else if (dividingNumberValue > 100) {
                setDividingMoneyError(CreateReceiptItemMessage.DIVIDING_TOO_HIGH);
                hasError = true;
            } else if (dividingNumberValue <= 0) {
                setDividingMoneyError(CreateReceiptItemMessage.DIVIDING_TOO_LOW);
                hasError = true;
            }
        }

        if (dividing !== '' && whoReturn === null) {
            setWhoReturnError(CreateReceiptItemMessage.WHO_RETURN_EMPTY);
            hasError = true;
        }

        if (dividing === '' && whoReturn !== null) {
            setDividingMoneyError(CreateReceiptItemMessage.DIVIDING_EMPTY);
            hasError = true;
        }

        return !hasError;
    };

    const createItem = () => {
        if (!verifyFields()) {
            return
        }

        const dividingNumberValue = Number(dividing.replace("%", ""));
        props.addItem({
            id: 0,
            productName,
            quantity: Number(quantityFieldProps.value),
            price: Number(moneyFieldProps.value),
            category: category!,
            moneyDividing: dividingNumberValue,
            userToReturnMoney: whoReturn || null
        });

        quantityFieldProps.setValue('')
        moneyFieldProps.setValue('')
        setProductName('')
        setCategory(null)
        setDividingMoney('')
        setWhoReturn(null)
    }

    const handleProductNameChange = async (value: string) => {
        if (value === '') {
            return
        }

        const response = await suggestCategory(value)
        const findCategory = props.categoryList.find(category => category.id === response.categoryId)
        if (findCategory) {
            setCategory(findCategory)
        }
    }

    return (
        <Box
            sx={{
                width: {xs: "100%", lg: "40%"},
                p: 3,
                display: "flex",
                flexDirection: "column",
                borderRight: {xs: "none", lg: "1px solid"},
                borderColor: "divider",
            }}
        >
            <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 2}}>
                Dodaj nowy produkt
            </Typography>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid size={{xs: 12, sm: 6}}>
                    <Autocomplete
                        freeSolo
                        forcePopupIcon
                        value={productName}
                        options={props.productList}
                        onFocus={() => setProductNameError('')}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                        onInputChange={(_, newValue) => {
                            setProductName(newValue);
                            handleProductNameChange(newValue)
                        }}
                        renderInput={(params) => (
                            <FormControl fullWidth error={productNameError !== ''} required>
                                <InputLabel
                                    sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}
                                >
                                    Nazwa produktu
                                </InputLabel>
                                <OutlinedInput
                                    {...params.InputProps}
                                    inputProps={params.inputProps}
                                    label={<Typography>Nazwa produktu + {""}</Typography>}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'red',
                                        display: 'flex',
                                        alignItems: 'center',
                                        visibility: productNameError ? 'visible' : 'hidden',
                                    }}
                                >
                                    <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                    {productNameError}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CustomFormControl {...quantityFieldProps.props} />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CustomFormControl {...moneyFieldProps.props} />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Autocomplete
                        options={props.categoryList}
                        value={category}
                        getOptionLabel={(option) => option.name}
                        onFocus={() => setCategoryError('')}
                        onChange={(_, newValue) => setCategory(newValue)}
                        renderInput={(params) => (
                            <FormControl fullWidth error={categoryError !== ''} required>
                                <InputLabel
                                    sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}
                                >
                                    Kategoria
                                </InputLabel>
                                <OutlinedInput
                                    {...params.InputProps}
                                    inputProps={params.inputProps}
                                    label={<Typography>Kategoria + {""}</Typography>}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'red',
                                        display: 'flex',
                                        alignItems: 'center',
                                        visibility: categoryError ? 'visible' : 'hidden',
                                    }}
                                >
                                    <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                    {categoryError}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Autocomplete
                        freeSolo
                        forcePopupIcon
                        value={dividing}
                        onFocus={() => setDividingMoneyError('')}
                        options={['10%', '30%', '50%', '70%', '100%']}
                        onInputChange={(_, newValue) => setDividingMoney(newValue)}
                        renderInput={(params) => (
                            <FormControl fullWidth error={dividingMoneyError !== ''}>
                                <InputLabel
                                    sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}
                                >
                                    Procent zwrotu
                                </InputLabel>
                                <OutlinedInput
                                    {...params.InputProps}
                                    inputProps={params.inputProps}
                                    label={<Typography>Procent zwrotu + {""}</Typography>}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'red',
                                        display: 'flex',
                                        alignItems: 'center',
                                        visibility: dividingMoneyError ? 'visible' : 'hidden',
                                    }}
                                >
                                    <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                    {dividingMoneyError}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Autocomplete
                        options={props.userWhoPaid}
                        value={whoReturn || null}
                        getOptionLabel={(option) => option.userName}
                        onChange={(_, newValue) => setWhoReturn(newValue)}
                        renderInput={(params) => (
                            <FormControl fullWidth error={whoReturnError !== ''}>
                                <InputLabel
                                    sx={{
                                        fontSize: '16px',
                                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                                            fontSize: '22px',
                                        },
                                    }}
                                >
                                    Kto ma oddać
                                </InputLabel>
                                <OutlinedInput
                                    {...params.InputProps}
                                    inputProps={params.inputProps}
                                    label={<Typography>Kto ma oddać + {""}</Typography>}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'red',
                                        display: 'flex',
                                        alignItems: 'center',
                                        visibility: whoReturnError ? 'visible' : 'hidden',
                                    }}
                                >
                                    <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                    {whoReturnError}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 4}}>
                    <Button variant="contained" color="primary" fullWidth onClick={createItem}>
                        Dodaj
                    </Button>
                </Grid>
                <Grid size={{xs: 12, sm: 8}}>
                    <Button onClick={() => {
                        if (props.aiLoader.aiReceipt != null) {
                            props.aiProductRecognitionDialogController.openDialog()
                        }
                    }} component="label" variant="outlined" sx={{
                        "&:hover": {
                            backgroundColor: "rgba(75,187,71,0.2)",
                        }
                    }} fullWidth>
                        {props.aiProcessing ? <CircularProgress size={24}/> : "Wczytaj produkty (AI)"}
                        {props.aiLoader.aiReceipt == null ?
                            <input type="file" accept="image/*" hidden onChange={async event => {
                                props.setAiProcessing(true)
                                await props.aiLoader.loadAiReceipts(event)
                                props.aiProductRecognitionDialogController.openDialog()
                                props.setAiProcessing(false)
                            }}/> : ""}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}