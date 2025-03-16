'use client';

import * as React from 'react';
import ChangeEmailForm from "./form/ChangeEmailForm";
import ChangePasswordForm from "./form/ChangePasswordForm";
import ChangeNicknameForm from "./form/ChangeNicknameForm";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CustomDialog from "../../../components/CustomDialog";

export function AccountDetails(): React.JSX.Element {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    return (
        <Grid container spacing={4}>
            <Grid size={12}>
                <ChangeEmailForm></ChangeEmailForm>
            </Grid>
            <Grid size={12}>
                <ChangePasswordForm></ChangePasswordForm>
            </Grid>
            <Grid size={12}>
                <ChangeNicknameForm></ChangeNicknameForm>
            </Grid>
            <Grid size={12}>
                <Card sx={{border: '1px solid red'}}>
                    <CardContent>
                        <Typography variant="h6" sx={{color: 'red'}}>
                            Usuń konto
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                            Po usunięciu konta, nie będzie można go przywrócić. Proszę, upewnij się, że chcesz
                            kontynuować.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setConfirmDeleteOpen(true)}
                            sx={{
                                borderColor: 'red',
                                color: 'red',
                                '&:hover': {
                                    backgroundColor: '#ffe6e6',
                                }
                            }}
                        >
                            Tak, usuń
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <CustomDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                title="Potwierdzenie usunięcia"
                content="Czy na pewno chcesz usunąć konto?"
                confirmText="Usuń"
                confirmAction={() => {
                }} // Musisz stworzyć funkcję usuwania konta
                confirmColor="error"
            />
        </Grid>
    );
}
