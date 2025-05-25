'use client'
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import {Dialog, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {CreateReceiptDetails, Receipt} from "../../api/ReceiptModel";
import AITransactionDetailsDialog, {GetTransactionDetailsByAIComponentRef} from "../../ai/AITransactionDetailsDialog";
import {getCreateReceiptDetails} from "../../api/ReceiptService";
import {validateLength} from "../../../auth/util/DataValidator";
import {CreateReceiptDetailMessage} from "../../api/ReceiptMessages";
import FirstStepFooterForm from "./FirstStepFooterForm";
import FirstStepFormContent from "./FirstStepFormContent";
import {FirstStepFormState, useFirstStepFormState} from "./FirstStepFormState";

interface Props {
    creatingController: DialogShowingController
    addItemsToReceiptController: DialogShowingController
    editedReceipt: Receipt | null
    setEditedReceipt: (newReceipt: Receipt | null) => void
    createReceiptDetails: CreateReceiptDetails | null
    setCreateReceiptDetails: (value: CreateReceiptDetails | null) => void
}

export const steps = ["Informacje o paragonie", "Dodaj produkty"]

export default function FirstStepDialog(props: Props) {
    const [aiProcessing, setAiProcessing] = useState<boolean>(false);
    const aiTransactionDetailsDialog: DialogShowingController = GetShowingController()
    const firstStepFormState: FirstStepFormState = useFirstStepFormState();

    useEffect(() => {
        if (props.creatingController.openDialogStatus) {
            const fetchCreateReceiptDetails = async () => {
                const response = await getCreateReceiptDetails();
                props.setCreateReceiptDetails(response);
            };

            if (props.editedReceipt) {
                firstStepFormState.setShopName(props.editedReceipt.shop);
                firstStepFormState.setDate(props.editedReceipt.shoppingTime);
                firstStepFormState.setIsSettled(props.editedReceipt.settled);
                firstStepFormState.setWhoPaid(props.editedReceipt.whoPaid);
            }

            fetchCreateReceiptDetails();
        }
    }, [props.creatingController.openDialogStatus])
    const handleNext = () => {
        if (validateForm()) {
            props.creatingController.closeDialog();
            props.addItemsToReceiptController.openDialog();
        }
    };

    const aiComponentRef = useRef<GetTransactionDetailsByAIComponentRef>(null);
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        aiComponentRef.current?.handleUpload(e);
    };


    const loadByAi = (shopName: string, date: Date) => {
        // setReceipt({...receipt, ['shop']: shopName})
        // setReceipt({...receipt, ['shoppingTime']: date})
    }

    const handleClose = () => {
        props.creatingController.closeDialog()
        firstStepFormState.setIsSettled(false)
        firstStepFormState.setDate(null)
        firstStepFormState.setDateError('')
        firstStepFormState.setShopName('')
        firstStepFormState.setShopNameError('')
        firstStepFormState.setWhoPaid(null)
        firstStepFormState.setWhoPaidError('')
        props.setEditedReceipt(null)
    }

    const validateForm = (): boolean => {
        let isValid = true;

        if (!firstStepFormState.shopName) {
            firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_EMPTY);
            isValid = false;
        } else if (validateLength(firstStepFormState.shopName, 1)) {
            firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_TOO_SHORT);
            isValid = false;
        } else if (!validateLength(firstStepFormState.shopName, 64)) {
            firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_TOO_LONG);
            isValid = false;
        }

        if (!firstStepFormState.whoPaid) {
            firstStepFormState.setWhoPaidError(CreateReceiptDetailMessage.WHO_PAID_EMPTY);
            isValid = false;
        }

        if (!firstStepFormState.date) {
            firstStepFormState.setDateError(CreateReceiptDetailMessage.DATE_EMPTY);
            isValid = false;
        }

        return isValid;
    };

    return (
        <Dialog open={props.creatingController.openDialogStatus} onClose={handleClose}
                maxWidth="md" fullWidth>
            <Paper elevation={3} sx={{p: 3}}>
                <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                    <Typography
                        variant="h5"> {props.editedReceipt ? "Edytuj Paragon" : "Dodaj Nowy Paragon"}</Typography>
                </Box>

                <Stepper activeStep={0} sx={{mb: 4}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FirstStepFormContent
                    createReceiptDetails={props.createReceiptDetails}
                    editedReceipt={props.editedReceipt}
                    firstStepFormState={firstStepFormState}
                />

                <FirstStepFooterForm aiProcessing={aiProcessing} handleUpload={handleUpload} handleNext={handleNext}/>
            </Paper>
            <AITransactionDetailsDialog onChange={loadByAi} ref={aiComponentRef}
                                        getTransactionDetailsByAIController={aiTransactionDetailsDialog}
                                        setAiProcessing={setAiProcessing}/>
        </Dialog>
    )
}