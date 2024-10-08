'use client';

import * as React from 'react';
import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Alert, FormHelperText, Snackbar} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {ErrorOutline} from "@mui/icons-material";
import ChangeEmailForm from "./form/ChangeEmailForm";
import ChangePasswordForm from "./form/ChangePasswordForm";
import ChangeNicknameForm from "./form/ChangeNicknameForm";

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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const statusController: StatusController = {setStatus, setOpenSnackbar, setStatusMessage};

    return (
        <Grid container spacing={3}>
            <Grid lg={6} xs={12}>
                <ChangeEmailForm {...statusController}></ChangeEmailForm>
            </Grid>
            <Grid lg={6} xs={12}>
                <ChangePasswordForm {...statusController}></ChangePasswordForm>
            </Grid>
            <Grid lg={6} xs={12}>
                <ChangeNicknameForm {...statusController}></ChangeNicknameForm>
            </Grid>

            {/*<Card sx={{border: '1px solid red', mt: 6, p: 2}}> //TODO USUWANIE KONTA*/}
            {/*    <CardContent>*/}
            {/*        <Typography variant="h6" sx={{color: 'red'}}>*/}
            {/*            Usuń konto*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>*/}
            {/*            Po usunięciu konta, nie będzie można go przywrócić. Proszę, upewnij się, że chcesz kontynuować.*/}
            {/*        </Typography>*/}
            {/*        <Button*/}
            {/*            variant="outlined"*/}
            {/*            color="error"*/}
            {/*            sx={{*/}
            {/*                borderColor: 'red',*/}
            {/*                color: 'red',*/}
            {/*                '&:hover': {*/}
            {/*                    backgroundColor: '#ffe6e6',  // Jasnoczerwone tło po najechaniu*/}
            {/*                }*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Tak, usuń*/}
            {/*        </Button>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <Alert onClose={handleCloseSnackbar} severity={status} sx={{width: '100%'}}>
                    {statusMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
