import {Box, Button, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {DialogShowingController} from "../../../controllers/DialogShowingController";

interface BillDashboardHeaderProps {
    creatingController: DialogShowingController
}

export default function BillDashboardHeader(props: BillDashboardHeaderProps) {
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={4} flexDirection='column'>
            <Typography variant="h4" sx={{fontWeight: 'medium'}}>
                Zarządzanie rachunkami mediów
            </Typography>

            <Stack direction={{xs: 'column', lg: 'row'}} component="div" spacing={3} mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={props.creatingController.openDialog}
                >
                    Dodaj rachunek
                </Button>
            </Stack>
        </Box>
    )
}
