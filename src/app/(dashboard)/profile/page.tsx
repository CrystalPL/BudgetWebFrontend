import {Container, Stack, Typography} from "@mui/material";
import {AccountDetailsForm} from "../../../components/profile/AccountDetailsForm";
import {AccountInfo} from "../../../components/profile/AccountInfo";
import Grid from "@mui/material/Unstable_Grid2";

// export const dynamic = 'force-dynamic';

export default async function Page() {
    return (
        <Container maxWidth="xl">
            <Stack direction="column" spacing={3} sx={{pt: '40px'}}>
                <Typography variant="h4">Account</Typography>
                <Grid container spacing={3}>
                    <Grid lg={4} xs={12}>
                        <AccountInfo/>
                    </Grid>
                    <Grid lg={8} xs={12}>
                        <AccountDetailsForm/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}