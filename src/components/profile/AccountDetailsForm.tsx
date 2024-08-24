'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export function AccountDetailsForm(): React.JSX.Element {
    return (
        <Grid container spacing={3}>
            <Grid lg={6} xs={12}>
                <Card>
                    <CardHeader title="Zmiana adresu e-mail"/>
                    <Divider/>
                    <CardContent>
                        <Stack spacing={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Nowy adres e-mail</InputLabel>
                                <OutlinedInput label="Nowy adres e-mail" name="newEmail"/>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Potwierdź nowy adres e-mail</InputLabel>
                                <OutlinedInput label="Potwierdź nowy adres e-mail" name="confirmNewEmail"/>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Hasło</InputLabel>
                                <OutlinedInput label="Hasło" name="password"/>
                            </FormControl>
                        </Stack>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained">Zapisz zmiany</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid lg={6} xs={12}>
                <Card>
                    <CardHeader title="Zmiana hasła"/>
                    <Divider/>
                    <CardContent>
                        <Stack spacing={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Stare hasło</InputLabel>
                                <OutlinedInput label="Stare hasło" name="oldPassword"/>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel>Nowe hasło</InputLabel>
                                <OutlinedInput label="Nowe hasło" name="newPassword"/>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Potwierdź nowe hasło</InputLabel>
                                <OutlinedInput label="Potwierdź nowe hasło" name="confirmNewPassword"/>
                            </FormControl>
                        </Stack>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained">Zapisz zmiany</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
