import CustomDialog from "../../../../components/CustomDialog";
import * as React from "react";
import {useState} from "react";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import {Box} from "@mui/material";
import {CustomFormControl, CustomFormControlProps} from "../../../../components/CustomFormControl";
import {ChangeHouseholdNameMessage} from "../../api/HouseholdMessage";
import {validateHouseholdName} from "../../HouseholdUtil";
import {changeHouseholdName} from "../../api/HouseholdService";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

export default function ChangeHouseholdNameDialog({openDialogStatus: open, closeDialog}: DialogShowingController) {
    const [householdName, setHouseholdName] = useState("");
    const [householdError, setHouseholdError] = useState<string>("")
    const snackbarController = useSnackbarContext();

    const householdNameProps: CustomFormControlProps = {
        valueState: [householdName, setHouseholdName],
        errorState: [householdError, setHouseholdError],
        label: 'Nazwa gospodarstwa',
        name: 'householdName',
        validateFunction: () => validateHouseholdName(householdName)
    };

    const handleClose = () => {
        closeDialog()
        setHouseholdError("")
        setHouseholdName("")
    }

    const handleChangeName = async () => {
        setHouseholdError(validateHouseholdName(householdName))
        if (householdError !== '') {
            return
        }

        const response = await changeHouseholdName(householdName);
        if (!response.success) {
            setHouseholdError(response.message)
            return
        }

        handleClose()
        snackbarController.setStatusMessage(ChangeHouseholdNameMessage.SUCCESS)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
    }

    return (
        <CustomDialog
            open={open}
            onClose={handleClose}
            title="Zmień nazwę gospodarstwa"
            content={<Box mt={1}><CustomFormControl {...householdNameProps} /></Box>}
            confirmText="Zapisz"
            confirmAction={handleChangeName}
        />
    )
}