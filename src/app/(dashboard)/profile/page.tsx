import {Container, Stack, Typography} from "@mui/material";
import {AccountDetails} from "../../../features/account/components/AccountDetails";
import AccountInfo from "../../../features/account/components/AccountInfo";
import Grid from "@mui/material/Grid";
import LoginHistory from "../../../features/account/LoginHistory";
import {getValidators} from "../../../validator/ValidationService";
import {SignUpValidationConstraints} from "../../../validator/ValidationModel";

export default async function Page() {
    const validators = await getValidators<SignUpValidationConstraints>(['EMAIL', 'PASSWORD', 'USERNAME']);

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
                        <AccountDetails {...validators}></AccountDetails>
                    </Grid>
                    <Grid size={12}>
                        <LoginHistory/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}