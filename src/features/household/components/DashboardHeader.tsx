import {Box, Button, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {AdminPanelSettings, DeleteForever, DoorBack, TextFields} from "@mui/icons-material";
import * as React from "react";

interface DashboardHeaderProps {
    openInvitingDialog: () => void
    openHouseholdChangeNameDialog: () => void
    openDeleteHouseholdDialog: () => void
    openLeaveHouseholdDialog: () => void
}

export default function DashboardHeader(props: DashboardHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: 'column'
        }}>
            <Typography variant="h4" sx={{fontWeight: 'medium'}}>
                Zarządzanie gospodarstwem
            </Typography>

            <Stack direction={{xs: 'column', lg: 'row'}} component="div" spacing={3} mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteForever/>}
                    onClick={props.openDeleteHouseholdDialog}
                >
                    Usuń gospodarstwo
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TextFields/>}
                    onClick={props.openHouseholdChangeNameDialog}
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

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DoorBack/>}
                    onClick={props.openLeaveHouseholdDialog}
                >
                    Opuść gospodarstwo
                </Button>
            </Stack>
        </Box>
    )
}