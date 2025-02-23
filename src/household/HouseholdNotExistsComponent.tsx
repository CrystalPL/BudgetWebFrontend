'use client'
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {CustomFormControl, CustomFormControlProps} from "../account/components/AccountDetails";
import {validateLength} from "../auth/DataValidator";
import {CreateHouseholdMessage} from "./HouseholdMessage";

export default function HouseholdNotExists() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleCreate = () => {
        validateName()
        if (nameError !== '') {
            return
        }

        handleClose()
        setOpenSnackbar(true)
    };

    const handleClose = () => {
        setOpen(false)
        setName('')
        setNameError('')
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const validateName = (): string => {
        if (!name || name.trim() === '') {
            return CreateHouseholdMessage.NAME_NOT_EXISTS
        }

        if (!validateLength(name, 65)) {
            return CreateHouseholdMessage.NAME_TOO_LONG
        }

        if (validateLength(name, 1)) {
            return CreateHouseholdMessage.NAME_TOO_SHORT
        }

        return ""
    }

    const nameFieldProps: CustomFormControlProps = {
        valueState: [name, setName],
        errorState: [nameError, setNameError],
        label: 'Nazwa gospodarstwa',
        name: 'username',
        validateFunction: validateName
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            marginTop="20px"
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{color: 'teal', fontWeight: 'bold'}}
            >
                Nie posiadasz jeszcze gospodarstwa, kliknij przycisk, aby go utworzyć
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{padding: '12px 24px', fontSize: '18px', borderRadius: '8px'}}
            >
                Utwórz gospodarstwo
            </Button>

            <Dialog open={open} onClose={() => handleClose()} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Stwórz gospodarstwo</DialogTitle>
                <DialogContent>
                    <Box mt={'8px'}>
                        <CustomFormControl {...nameFieldProps}></CustomFormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleClose()}
                        variant="text"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(169, 190, 119, 0.2)',
                            },
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button onClick={handleCreate} variant="contained">
                        Stwórz
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{width: '100%'}}>
                    {CreateHouseholdMessage.SUCCESS}
                </Alert>
            </Snackbar>
        </Box>
    );
}