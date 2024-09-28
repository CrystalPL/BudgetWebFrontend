'use client'
import {Container, Stack, Typography} from "@mui/material";
import {AccountDetails} from "../../../account/components/AccountDetails";
import Grid from "@mui/material/Unstable_Grid2";
import AccountInfo from "../../../account/components/AccountInfo";
import {useState} from "react";
import {AccountInfoResponse} from "../../../account/AccountResponses";

export interface AccountProps {
    accountInfo: AccountInfoResponse | null;
    setAccountInfo: (info: AccountInfoResponse | null) => void;
}

export default function Page() {
    const [accountInfo, setAccountInfo] = useState<AccountInfoResponse | null>(null);

    const accountProps = {
        accountInfo,
        setAccountInfo
    };

    return (
        <Container maxWidth="xl">
            <Stack direction="column" spacing={3} sx={{pt: '40px'}}>
                <Typography variant="h4">Konto</Typography>
                <Grid container spacing={3}>
                    <Grid lg={4} xs={12}>
                        <AccountInfo accountProps={accountProps}/>
                    </Grid>
                    <Grid lg={8} xs={12}>
                        <AccountDetails accountProps={accountProps}/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}