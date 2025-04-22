import {Box, Button, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {TextFields} from "@mui/icons-material";
import * as React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

interface RoleDashboardHeaderProps {
    openCreateRoleDialog: () => void
}

export default function RoleDashboardHeader(props: RoleDashboardHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: 'row'
        }}>
            <Typography variant="h4" sx={{fontWeight: 'medium'}}>
                Role
            </Typography>

            <Stack direction={{xs: 'column', lg: 'row'}} component="div" spacing={3} mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TextFields/>}
                    onClick={props.openCreateRoleDialog}
                >
                    Stwórz role
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DateRangeIcon/>}
                    href="/household/roles/logs"
                >
                    Wyświetl zdarzenia
                </Button>
            </Stack>
        </Box>
    )
}