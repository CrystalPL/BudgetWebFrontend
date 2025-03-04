import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {validateLength} from "../../auth/util/DataValidator";
import {CreateHouseholdMessage} from "../api/HouseholdMessage";
import {createHousehold} from "../api/HouseholdService";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {HouseholdReloadKeyProps} from "../api/HouseholdModel";

export default function HouseholdNotExists({reloadTable}: HouseholdReloadKeyProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const snackbarController = useSnackbarContext();

    const handleCreate = async () => {
        validateName()
        if (nameError !== '') {
            return
        }

        const response = await createHousehold(name);
        if (!response.success) {
            setNameError(response.message)
            return
        }

        handleClose()
        snackbarController.setStatusMessage(CreateHouseholdMessage.SUCCESS)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
        reloadTable()
    };

    const handleClose = () => {
        setOpen(false)
        setName('')
        setNameError('')
    }

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
        </Box>
    );
}