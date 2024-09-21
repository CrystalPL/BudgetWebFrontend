import {Container, Stack, Typography} from "@mui/material";
import {AccountDetails} from "../../../account/components/AccountDetails";
import Grid from "@mui/material/Unstable_Grid2";
import AccountInfo from "../../../account/components/AccountInfo";

export default async function Page() {
    return (
        <Container maxWidth="xl">
            <Stack direction="column" spacing={3} sx={{pt: '40px'}}>
                <Typography variant="h4">Konto</Typography>
                <Grid container spacing={3}>
                    <Grid lg={4} xs={12}>
                        <AccountInfo/>
                    </Grid>
                    <Grid lg={8} xs={12}>
                        <AccountDetails/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}