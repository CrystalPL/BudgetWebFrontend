import React from "react";
import {Box, Button, CircularProgress} from "@mui/material";

interface FooterComponentProps {
    aiProcessing: boolean;
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
}

export default function FirstStepFooterForm({aiProcessing, handleUpload, handleNext}: FooterComponentProps) {
    return (
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
    );
}