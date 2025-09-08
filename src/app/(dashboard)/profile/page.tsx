'use client'
import {Container, Stack, Typography} from "@mui/material";
import {AccountDetails} from "../../../features/account/components/AccountDetails";
import AccountInfo from "../../../features/account/components/AccountInfo";
import Grid from "@mui/material/Grid";
import LoginHistory from "../../../features/account/LoginHistory";

export default function Page() {
    return (
        <Container
            sx={{
                pt: '40px',
                maxWidth: {
                    xs: '100%',
                    md: '90%',
                    lg: '80%',
                    xl: '90%',
                },
            }}>
            <Stack direction="column" spacing={3} sx={{pt: '40px'}}>
                <Typography variant="h4">Konto</Typography>
                <Grid container spacing={4} direction="column">
                    <Grid size={12}>
                        <AccountInfo/>
                    </Grid>
                    <Grid size={12}>
                        <AccountDetails/>
                    </Grid>
                    <Grid size={12}>
                        <LoginHistory/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}