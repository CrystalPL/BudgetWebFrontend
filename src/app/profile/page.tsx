import {Container, Stack, Typography} from "@mui/material";
import {AccountDetailsForm} from "@/components/account-details-form";
import {AccountInfo} from "@/components/account-info";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

export default function Page() {
    return (
        <Container maxWidth="xl">
            <Stack direction="column" spacing={3} sx={{pt: '40px'}}>
                <Box>
                    <Typography variant="h4">Account</Typography>
                </Box>
                <Box>
                    <Grid container direction="row" spacing={3}>
                        <Grid lg={4} md={6} xs={12}>
                            <AccountInfo/>
                        </Grid>
                        <Grid lg={8} md={6} xs={12}>
                            <AccountDetailsForm/>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Container>
    );
}