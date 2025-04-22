import * as React from "react";
import {useState} from "react";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import CustomDialog from "../../../components/CustomDialog";
import Stack from "@mui/material/Stack";
import {MuiColorInput} from "mui-color-input";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {createRole} from "../api/RoleService";

interface CreateRoleProps extends DialogShowingController, HouseholdReloadKeyProps {
}

export default function CreateRoleDialog({openDialogStatus: open, closeDialog, reloadTable}: CreateRoleProps) {
    const [roleName, setRoleName] = useState("");
    const [roleNameError, setRoleNameError] = useState<string>("")
    const [colorPickerValue, setColorPickerValue] = React.useState('#ffffff')
    const snackbarController = useSnackbarContext();

    const validateRoleName = () => {
        return ""
    }

    const handleChooseColor = (newValue: string) => {
        setColorPickerValue(newValue)
    }

    const create = async () => {
        const response = await createRole(roleName, colorPickerValue);
        if (!response.success) {
            setRoleNameError(response.message)
            return
        }

        snackbarController.setStatusMessage(response.message)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
        close()
        reloadTable()
    }

    const close = () => {
        closeDialog()
        setRoleNameError("")
        setColorPickerValue("#ffffff")
    }

    const roleNameFieldProps: CustomFormControlProps = {
        valueState: [roleName, setRoleName],
        errorState: [roleNameError, setRoleNameError],
        label: 'Nazwa roli',
        name: 'roleName',
        validateFunction: () => validateRoleName()
    };

    return (
        <CustomDialog
            open={open}
            onClose={close}
            title="Stwórz role"
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...roleNameFieldProps}></CustomFormControl>
                    <MuiColorInput format="hex" value={colorPickerValue} onChange={handleChooseColor}/>
                </Stack>
            }
            confirmText="Stwórz"
            confirmAction={create}
        />
    )
}