import {Box, Button, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {TextFields} from "@mui/icons-material";
import * as React from "react";

interface CategoryDashboardHeaderProps {
    openCreateCategoryDialog: () => void
}

export default function CategoryDashboardHeader(props: CategoryDashboardHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: 'row'
        }}>
            <Typography variant="h4" sx={{fontWeight: 'medium'}}>
                Kategorie
            </Typography>

            <Stack direction={{xs: 'column', lg: 'row'}} component="div" spacing={3} mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TextFields/>}
                    onClick={props.openCreateCategoryDialog}
                >
                    Stwórz kategorie
                </Button>
            </Stack>
        </Box>
    )
}