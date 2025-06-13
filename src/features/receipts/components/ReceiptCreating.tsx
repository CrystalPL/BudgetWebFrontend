import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {
    CircularProgress,
    Dialog,
    FormControl,
    FormHelperText,
    Grid2,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,
    StepLabel,
    Stepper,
    Switch,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ErrorOutline} from "@mui/icons-material";
import * as React from "react";
import {useRef, useState} from "react";
import {CustomFormControl} from "../../../components/CustomFormControl";
import {CreateFormField} from "../api/CustomFormControlProps";
import {users} from "../../../app/(dashboard)/household/receipts/page";
import DateChooserComponent from "./DateChooserComponent";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Receipt} from "../api/ReceiptModel";
import GetTransactionDetailsByAIComponent, {
    GetTransactionDetailsByAIComponentRef
} from "./GetTransactionDetailsByAIComponent";

interface Props {
    creatingController: DialogShowingController
    addItemsToReceiptController: DialogShowingController
}

export const steps = ["Informacje o paragonie", "Dodaj produkty"]

export default function ReceiptCreatingComponent(props: Props) {
    const [receipt, setReceipt] = useState<Receipt>({
        id: 0,
        receiptAmount: 0,
        settled: false,
        shop: "",
        shoppingTime: new Date(),
        whoPaid: {id: 1, name: "Anna Kowalska"}
    })
    const [aiProcessing, setAiProcessing] = useState(false);
    const getProductsByAIController: DialogShowingController = GetShowingController()

    const cancel = () => {

    }

    const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setReceipt({...receipt, [name]: value})
    }

    const shopFieldProps = CreateFormField("Sklep", "shop")
    const whoPaidProps = CreateFormField("Kto zapłacil", "whoPaid")

    const handleNext = () => {
        props.creatingController.closeDialog()
        props.addItemsToReceiptController.openDialog()
    }

    const aiComponentRef = useRef<GetTransactionDetailsByAIComponentRef>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        aiComponentRef.current?.handleUpload(e);
    };

    const [choosenWhoPaid, setChoosenWhoPaid] = useState<string | String>()
    const [isSettled, setIsSettled] = useState<boolean>(false)

    const loadByAi = (shopName: string, date: Date) => {
        setReceipt({...receipt, ['shop']: shopName})
        setReceipt({...receipt, ['shoppingTime']: date})
    }

    return (
        <Dialog open={props.creatingController.openDialogStatus} onClose={props.creatingController.closeDialog}
                maxWidth="md" fullWidth>
            <Paper elevation={3} sx={{p: 3}}>
                <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                    <Typography variant="h5">Dodaj Nowy
                        Paragon</Typography> {/*{initialData ? "Edytuj Paragon" : "Dodaj Nowy Paragon"}*/}
                </Box>

                <Stepper activeStep={0} sx={{mb: 4}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box component="form" sx={{mb: 2}}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, sm: 6}} mt={2}>
                            <CustomFormControl {...shopFieldProps.props} />
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}} mt={2}>
                            <FormControl fullWidth error={whoPaidProps.error !== ""}>
                                <InputLabel sx={{
                                    fontSize: '16px',
                                    '&.Mui-focused, &.MuiInputLabel-shrink': {
                                        fontSize: '22px',
                                    },
                                }}>Kto zapłacił</InputLabel>
                                <Select
                                    value={choosenWhoPaid}
                                    label={<Typography>Kto zapłacił + {""}</Typography>}
                                    onChange={(e) => setChoosenWhoPaid(e.target.value)}
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
                                    visibility: whoPaidProps.error ? "visible" : "hidden"
                                }}>
                                    <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                    {whoPaidProps.error}
                                </FormHelperText>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}} mt={2}>
                            <DateChooserComponent
                                defaultValue={new Date()}
                                onChange={(newDate) => setReceipt({
                                    ...receipt,
                                    ['shoppingTime']: newDate ? newDate : new Date()
                                })}
                            />
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}} mt={2}>
                            <FormControlLabel
                                control={
                                    <Switch checked={isSettled}
                                            onChange={event => setIsSettled(event.target.checked)}/>
                                }
                                label="Paragon opłacony?"
                            />
                        </Grid2>
                    </Grid2>
                </Box>

                <Box sx={{display: "flex", justifyContent: "space-between", mt: 4}}>
                    <Button disabled variant="outlined">
                        Wstecz
                    </Button>
                    <Button component="label" variant="outlined" sx={{
                        "&:hover": {
                            backgroundColor: "rgba(75,187,71,0.2)",
                        }
                    }}>
                        {aiProcessing ? <CircularProgress size={24}/> : "Wczytaj paragon (AI)"}
                        <input type="file" accept="image/*" hidden onChange={handleUpload}/>
                    </Button>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            Dalej
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <GetTransactionDetailsByAIComponent onChange={loadByAi} ref={aiComponentRef}
                                                getTransactionDetailsByAIController={getProductsByAIController}
                                                setAiProcessing={setAiProcessing}/>
        </Dialog>
    )
}