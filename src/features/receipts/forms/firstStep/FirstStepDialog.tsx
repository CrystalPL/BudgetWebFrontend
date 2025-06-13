'use client'
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import {Dialog, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import {CreateReceiptDetails, Receipt} from "../../api/ReceiptModel";
import AITransactionDetailsDialog from "../../ai/AITransactionDetailsDialog";
import {getCreateReceiptDetails} from "../../api/ReceiptService";
import {validateLength} from "../../../auth/util/DataValidator";
import {CreateReceiptDetailMessage} from "../../api/ReceiptMessages";
import FirstStepFooterForm from "./FirstStepFooterForm";
import FirstStepFormContent from "./FirstStepFormContent";
import {FirstStepFormState} from "./FirstStepFormState";
import {AILoaderProps} from "../../ai/AILoader";

interface Props {
    creatingController: DialogShowingController
    addItemsToReceiptController: DialogShowingController
    editedReceipt: Receipt | null
    setEditedReceipt: (newReceipt: Receipt | null) => void
    createReceiptDetails: CreateReceiptDetails | null
    setCreateReceiptDetails: (value: CreateReceiptDetails | null) => void
    firstStepFormState: FirstStepFormState
    aiLoader: AILoaderProps
}

export const steps = ["Informacje o paragonie", "Dodaj produkty"]

export default function FirstStepDialog(props: Props) {
    const [aiProcessing, setAiProcessing] = useState<boolean>(false);
    const aiTransactionDetailsDialog: DialogShowingController = GetShowingController()

    useEffect(() => {
        if (props.creatingController.openDialogStatus) {
            const fetchCreateReceiptDetails = async () => {
                const response = await getCreateReceiptDetails();
                props.setCreateReceiptDetails(response);
            };

            if (props.editedReceipt) {
                props.firstStepFormState.setReceiptId(props.editedReceipt.id);
                props.firstStepFormState.setShopName(props.editedReceipt.shop);
                props.firstStepFormState.setDate(props.editedReceipt.shoppingTime);
                props.firstStepFormState.setIsSettled(props.editedReceipt.settled);
                props.firstStepFormState.setWhoPaid(props.editedReceipt.whoPaid);
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

    const loadByAi = (shopName: string, date: Date) => {
        props.firstStepFormState.setShopName(shopName);
        props.firstStepFormState.setDate(date);
    }

    useEffect(() => {
        if (!props.creatingController.openDialogStatus && !props.addItemsToReceiptController.openDialogStatus) {
            handleClose()
        }
    }, [props.addItemsToReceiptController.openDialogStatus])

    const handleClose = () => {
        props.creatingController.closeDialog()
        props.firstStepFormState.setIsSettled(false)
        props.firstStepFormState.setDate(null)
        props.firstStepFormState.setDateError('')
        props.firstStepFormState.setShopName('')
        props.firstStepFormState.setShopNameError('')
        props.firstStepFormState.setWhoPaid(null)
        props.firstStepFormState.setWhoPaidError('')
        props.setEditedReceipt(null)
    }

    const validateForm = (): boolean => {
        let isValid = true;

        if (!props.firstStepFormState.shopName) {
            props.firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_EMPTY);
            isValid = false;
        } else if (validateLength(props.firstStepFormState.shopName, 1)) {
            props.firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_TOO_SHORT);
            isValid = false;
        } else if (!validateLength(props.firstStepFormState.shopName, 64)) {
            props.firstStepFormState.setShopNameError(CreateReceiptDetailMessage.SHOP_NAME_TOO_LONG);
            isValid = false;
        }

        if (!props.firstStepFormState.whoPaid) {
            props.firstStepFormState.setWhoPaidError(CreateReceiptDetailMessage.WHO_PAID_EMPTY);
            isValid = false;
        }

        if (!props.firstStepFormState.date) {
            props.firstStepFormState.setDateError(CreateReceiptDetailMessage.DATE_EMPTY);
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
                    firstStepFormState={props.firstStepFormState}
                />

                <FirstStepFooterForm aiProcessing={aiProcessing} handleNext={handleNext}
                                     setAiProcessing={setAiProcessing} aiLoader={props.aiLoader}
                                     getTransactionDetailsController={aiTransactionDetailsDialog}/>
            </Paper>
            <AITransactionDetailsDialog onChange={loadByAi}
                                        getTransactionDetailsByAIController={aiTransactionDetailsDialog}
                                        aiLoader={props.aiLoader}/>
        </Dialog>
    )
}