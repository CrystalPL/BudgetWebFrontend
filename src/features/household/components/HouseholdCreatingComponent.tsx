import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {CreateHouseholdMessage} from "../api/HouseholdMessage";
import {createHousehold} from "../api/HouseholdService";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {HouseholdReloadKeyProps} from "../api/HouseholdModel";
import {validateHouseholdName} from "../HouseholdUtil";
import CustomDialog from "../../../components/CustomDialog";

export default function HouseholdNotExists({reloadTable}: HouseholdReloadKeyProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const snackbarController = useSnackbarContext();

    const handleCreate = async () => {
        setNameError(validateHouseholdName(name))
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

    const nameFieldProps: CustomFormControlProps = {
        valueState: [name, setName],
        errorState: [nameError, setNameError],
        label: 'Nazwa gospodarstwa',
        name: 'username',
        validateFunction: () => validateHouseholdName(name)
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

            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Stwórz gospodarstwo"
                content={<Box mt={1}><CustomFormControl {...nameFieldProps} /></Box>}
                confirmText="Stwórz"
                confirmAction={handleCreate}
            />
        </Box>
    );
}