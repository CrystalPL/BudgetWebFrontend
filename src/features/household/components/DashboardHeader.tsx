import {Box, Button, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {AdminPanelSettings, TextFields} from "@mui/icons-material";
import * as React from "react";

interface DashboardHeaderProps {
    openInvitingDialog: () => void
}

export default function DashboardHeader(props: DashboardHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: {xs: 'column', md: 'row'}
        }}>
            <Typography variant="h5" sx={{fontWeight: 'medium'}}>
                Zarządzanie gospodarstwem
            </Typography>

            <Stack direction={{xs: 'column', md: 'row'}} component="div" spacing={3} mt={{xs: 3, md: 0}}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TextFields/>}
                    // onClick={zmiana nazwy}
                >
                    Zmień nazwe
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={props.openInvitingDialog}
                >
                    Zaproś użytkownika
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DateRangeIcon/>}
                    href="/household/logs"
                >
                    Wyświetl zdarzenia
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AdminPanelSettings/>}
                    href="/household/roles"
                >
                    Zarządzanie rolami
                </Button>
            </Stack>
        </Box>
    )
}