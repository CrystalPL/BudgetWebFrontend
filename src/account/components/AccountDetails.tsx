'use client';

import * as React from 'react';
import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Snackbar} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";
import ChangeEmailForm from "./form/ChangeEmailForm";
import ChangePasswordForm from "./form/ChangePasswordForm";
import ChangeNicknameForm from "./form/ChangeNicknameForm";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

export interface CustomFormControlProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>];
    errorState: [string, React.Dispatch<React.SetStateAction<string>>];
    label: string
    name: string
    validateFunction: () => string
    endAdornment?: React.ReactNode
    type?: string;
}

export function CustomFormControl(props: CustomFormControlProps) {
    const [value, setValue] = props.valueState;
    const [error, setError] = props.errorState;

    const validate = () => {
        const validate: string = props.validateFunction()
        if (!validate) {
            return;
        }

        setError(validate)
    }

    return <FormControl fullWidth required error={!!error}>
        <InputLabel>{props.label}</InputLabel>
        <OutlinedInput
            label={props.label}
            name={props.name}
            value={value}
            type={props.type}
            onChange={(e) => setValue(e.target.value)}
            onBlur={validate}
            onFocus={() => setError('')}
            endAdornment={props.endAdornment}
        />
        <FormHelperText
            sx={{
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                visibility: error ? 'visible' : 'hidden',
            }}
        >
            <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
            {error}
        </FormHelperText>
    </FormControl>
}

export interface StatusController {
    setStatus: (status: 'success' | 'error') => void
    setOpenSnackbar: (open: boolean) => void
    setStatusMessage: (message: string) => void
}

export function AccountDetails(): React.JSX.Element {
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const statusController: StatusController = {setStatus, setOpenSnackbar, setStatusMessage};

    return (
        <Grid container spacing={4}>
            <Grid size={12}>
                <ChangeEmailForm {...statusController}></ChangeEmailForm>
            </Grid>
            <Grid size={12}>
                <ChangePasswordForm {...statusController}></ChangePasswordForm>
            </Grid>
            <Grid size={12}>
                <ChangeNicknameForm {...statusController}></ChangeNicknameForm>
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
                                    backgroundColor: '#ffe6e6',  // Jasnoczerwone tło po najechaniu
                                }
                            }}
                        >
                            Tak, usuń
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Potwierdzenie usunięcia</DialogTitle>
                <DialogContent>
                    <Typography>
                        Czy na pewno chcesz usunąć konto?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} variant="text" sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(169, 190, 119, 0.2)',
                        },
                    }}>
                        Anuluj
                    </Button>
                    <Button variant="contained" color="error">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <Alert onClose={handleCloseSnackbar} severity={status} sx={{width: '100%'}}>
                    {statusMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
