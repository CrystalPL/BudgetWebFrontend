import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import {Box, Button, Dialog, Divider, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category, GetProductListResponse, Receipt, ReceiptItem, UserWhoPaid} from "../../api/ReceiptModel";
import {steps} from "../firstStep/FirstStepDialog";
import {getCategories, getProductListResponse, getReceiptItems} from "../../api/ReceiptService";
import CreateReceiptItemForm from "./CreateReceiptItemForm";
import ReceiptProductsTable from "../../tables/ReceiptProductsTable";

interface Props {
    addItemController: DialogShowingController,
    receiptCreatingController: DialogShowingController
    userWhoPaid: UserWhoPaid[]
    editedReceipt: Receipt | null
}

export default function ReceiptProductsManager(props: Props) {
    const [items, setItems] = useState<ReceiptItem[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [productList, setProductList] = useState<GetProductListResponse[]>([])

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
    }, [props.addItemController.openDialogStatus])

    const handleBack = () => {
        props.addItemController.closeDialog()
        props.receiptCreatingController.openDialog()
    }

    const handleClose = () => {
        props.addItemController.closeDialog()
        setItems([])
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
                                           addItemController={props.addItemController}></CreateReceiptItemForm>

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
                    <Button
                        variant="contained">Zakończ</Button> {/*{initialData ? "Zapisz zmiany" : "Zapisz paragon"}*/}
                </Box>
            </Box>
            {/*<AIProductRecognitionDialog setAiProcessing={setAiProcessing} ref={aiComponentRef}*/}
            {/*                          getProductsByAIController={getProductsByAIController}/>*/}
        </Dialog>
    )
}
