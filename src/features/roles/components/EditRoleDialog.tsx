import * as React from "react";
import {useEffect, useState} from "react";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import CustomDialog from "../../../components/CustomDialog";
import Stack from "@mui/material/Stack";
import {MuiColorInput} from "mui-color-input";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";

import {editRole} from "../api/RoleService";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {Role} from "../api/RoleModel";

interface EditRoleProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedRole: Role | null
}

export default function EditRoleDialog({
                                           openDialogStatus: open,
                                           closeDialog,
                                           reloadTable,
                                           editedRole
                                       }: EditRoleProps) {
    const [roleName, setRoleName] = useState("");
    const [roleNameError, setRoleNameError] = useState<string>("")
    const [colorPickerValue, setColorPickerValue] = React.useState('#ffffff')
    const snackbarController = useSnackbarContext();

    useEffect(() => {
        if (editedRole != null) {
            setRoleName(editedRole.name);
            setColorPickerValue(editedRole.hexColor);
        }
    }, [editedRole]);

    const validateRoleName = () => {
        return ""
    }

    const handleChooseColor = (newValue: string) => {
        setColorPickerValue(newValue)
    }

    const saveRole = async () => {
        const response = await editRole({
            roleId: editedRole!.id,
            name: roleName,
            color: colorPickerValue,
        });

        snackbarController.setStatus(response.success ? "success" : "error");
        snackbarController.setStatusMessage(response.message);
        snackbarController.setOpenSnackbar(true);

        closeDialog()
        if (response.success) {
            reloadTable()
        }
    }

    const close = () => {
        closeDialog()
        setRoleNameError("")
    }

    const categoryNameFieldProps: CustomFormControlProps = {
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
            title="Edytuj role"
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...categoryNameFieldProps}></CustomFormControl>
                    <MuiColorInput format="hex" value={colorPickerValue} onChange={handleChooseColor}/>
                </Stack>
            }
            confirmText="Zapisz"
            confirmAction={saveRole}
        />
    )
}