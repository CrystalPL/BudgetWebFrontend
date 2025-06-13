import React from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {AILoaderProps} from "../../ai/AILoader";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";

interface FooterComponentProps {
    aiProcessing: boolean;
    setAiProcessing: (aiProcessing: boolean) => void;
    handleNext: () => void;
    aiLoader: AILoaderProps;
    getTransactionDetailsController: DialogShowingController
}

export default function FirstStepFooterForm({
                                                aiProcessing,
                                                handleNext,
                                                aiLoader,
                                                setAiProcessing,
                                                getTransactionDetailsController
                                            }: FooterComponentProps) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between", mt: 4}}>
            <Button disabled variant="outlined">
                Wstecz
            </Button>
            <Button onClick={() => {
                if (aiLoader.aiReceipt != null) {
                    getTransactionDetailsController.openDialog()
                }
            }} component="label" variant="outlined" sx={{
                "&:hover": {
                    backgroundColor: "rgba(75,187,71,0.2)",
                }
            }}>
                {aiProcessing ? <CircularProgress size={24}/> : "Wczytaj paragon (AI)"}
                {aiLoader.aiReceipt == null ? <input type="file" accept="image/*" hidden onChange={async event => {
                    setAiProcessing(true)
                    await aiLoader.loadAiReceipts(event)
                    setAiProcessing(false)
                    getTransactionDetailsController.openDialog()
                }}/> : ""}
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
    );
}