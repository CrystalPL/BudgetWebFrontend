import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import {Box, Button, Dialog, Divider, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {
    Category,
    GetProductListResponse,
    Receipt,
    ReceiptCreateRequest,
    ReceiptItem,
    ReceiptItemCreateRequest,
    UserWhoPaid
} from "../../api/ReceiptModel";
import {steps} from "../firstStep/FirstStepDialog";
import {getCategories, getProductListResponse, getReceiptItems, saveReceiptRequest} from "../../api/ReceiptService";
import CreateReceiptItemForm from "./CreateReceiptItemForm";
import ReceiptProductsTable from "../../tables/ReceiptProductsTable";
import {FirstStepFormState} from "../firstStep/FirstStepFormState";
import {useSnackbarContext} from "../../../../context/SnackbarContext";
import {HouseholdReloadKeyProps} from "../../../household/api/HouseholdModel";
import {ResponseAPI} from "../../../../service/ResponseAPI";
import {SaveReceiptAdditionalMessage, SaveReceiptMessage} from "../../api/ReceiptMessages";
import AIProductRecognitionDialog from "../../ai/AIProductRecognitionDialog";
import {AILoaderProps} from "../../ai/AILoader";
import CostSharingDialog from "../../components/CostSharingDialog";

interface Props extends HouseholdReloadKeyProps {
    addItemController: DialogShowingController,
    receiptCreatingController: DialogShowingController
    userWhoPaid: UserWhoPaid[]
    editedReceipt: Receipt | null
    firstStepFormState: FirstStepFormState
    aiLoader: AILoaderProps
}

export default function ReceiptProductsManager(props: Props) {
    const [items, setItems] = useState<ReceiptItem[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [productList, setProductList] = useState<GetProductListResponse[]>([])
    const getProductsByAIController: DialogShowingController = GetShowingController()
    const [aiProcessing, setAiProcessing] = useState(false);
    const [costSharingDialogOpen, setCostSharingDialogOpen] = useState(false);
    const snackbarController = useSnackbarContext();

    const addItem = (item: ReceiptItem) => {
        setItems((prevItems) => [...prevItems, item]);
    }

    useEffect(() => {
        if (props.addItemController.openDialogStatus) {
            const fetchDetails = async () => {
                setProductList(await getProductListResponse());
                setCategoryList(await getCategories())
                if (props.editedReceipt !== null && items.length == 0) {
                    setItems(await getReceiptItems(props.editedReceipt.id));
                }
            };

            fetchDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.addItemController.openDialogStatus])

    const handleBack = () => {
        props.addItemController.closeDialog()
        props.receiptCreatingController.openDialog()
    }

    const handleClose = () => {
        props.addItemController.closeDialog()
        setItems([])
    }

    const saveReceipt = async () => {
        const firstStepFormState = props.firstStepFormState;
        const receipt: ReceiptCreateRequest = {
            receiptId: firstStepFormState.receiptId,
            shopName: firstStepFormState.shopName,
            date: firstStepFormState.date,
            isSettled: firstStepFormState?.isSettled || false,
            whoPaidId: firstStepFormState.whoPaid?.userId || 0,
        }

        const receiptItemList: ReceiptItemCreateRequest[] = items.map(item => ({
            receiptItemId: item.id,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            categoryId: item.category.id,
            moneyDividing: item.moneyDividing || null,
            userToReturnMoneyId: item.userToReturnMoney?.userId || null,
        }))

        const response: ResponseAPI<SaveReceiptMessage, SaveReceiptAdditionalMessage> = await saveReceiptRequest({
            receiptDetails: receipt,
            itemsDataList: receiptItemList
        })
        snackbarController.setStatus(response.success ? 'success' : 'error')
        snackbarController.setOpenSnackbar(true)
        snackbarController.setStatusMessage(response.message)
        if (response.additionalData.additionalMessage) {
            snackbarController.setStatusMessage(response.message + "\n" + response.additionalData.additionalMessage)
        }

        if (response.success) {
            props.reloadTable()
            handleClose()
        }
    }

    return (
        <Dialog open={props.addItemController.openDialogStatus} onClose={handleClose}
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
                <Box sx={{display: "flex", flexGrow: 1, flexDirection: {xs: "column", lg: "row"}, overflow: "auto"}}>
                    <CreateReceiptItemForm productList={productList} categoryList={categoryList}
                                           userWhoPaid={props.userWhoPaid} addItem={addItem}
                                           addItemController={props.addItemController} aiProcessing={aiProcessing}
                                           setAiProcessing={setAiProcessing} aiLoader={props.aiLoader}
                                           aiProductRecognitionDialogController={getProductsByAIController}></CreateReceiptItemForm>

                    {/* Divider for mobile */}
                    <Divider sx={{display: {xs: "block", lg: "none"}, my: 2}}/>

                    {/* Right column - Table */}
                    <ReceiptProductsTable setItems={setItems} items={items} productList={productList}
                                          categoryList={categoryList} users={props.userWhoPaid}></ReceiptProductsTable>
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
                    <Box sx={{display: "flex", gap: 2}}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setCostSharingDialogOpen(true)}
                            disabled={items.length === 0}
                        >
                            Podział kosztów
                        </Button>
                        <Button
                            variant="contained"
                            onClick={saveReceipt}
                        >
                            Zakończ
                        </Button>
                    </Box>
                </Box>
            </Box>
            <AIProductRecognitionDialog setAiProcessing={setAiProcessing}
                                        getProductsByAIController={getProductsByAIController}
                                        categoryList={categoryList}
                                        userWhoPaid={props.userWhoPaid}
                                        setItems={setItems} aiLoader={props.aiLoader}/>
            <CostSharingDialog
                open={costSharingDialogOpen}
                onClose={() => setCostSharingDialogOpen(false)}
                items={items}
                whoPaid={props.firstStepFormState.whoPaid || null}
                users={props.userWhoPaid}
            />
        </Dialog>
    )
}
