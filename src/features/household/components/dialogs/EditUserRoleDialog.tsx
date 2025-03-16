import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import {EditUserRole, HouseholdMember, HouseholdReloadKeyProps} from "../../api/HouseholdModel";
import {editRole, getRoles} from "../../api/HouseholdService";
import {ErrorOutline} from "@mui/icons-material";
import CustomDialog from "../../../../components/CustomDialog";

interface EditUserRoleDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedMember: HouseholdMember | null
}

export default function EditUserRoleDialog({
                                               openDialogStatus: open,
                                               closeDialog,
                                               reloadTable,
                                               editedMember
                                           }: EditUserRoleDialogProps) {
    const [roles, setRoles] = useState<EditUserRole[]>([])
    const [choosenRole, setChoosenRole] = useState<string | String>()
    const [error, setError] = useState<string>("")

    useEffect(() => {
        // setError("Odjebałeś")
        const fetchRoles = async () => {
            const roles1 = await getRoles();
            setRoles(roles1)
        }

        fetchRoles()
    }, []);


    const saveRoleEdit = async () => {
        const role = roles.filter(x => x.roleName === choosenRole)[0];
        const result = await editRole(editedMember?.userId, role.roleId);
        if (!result.success) {
            setError(result.message)
            return
        }

        reloadTable()
        closeDialog()
    }

    const close = () => {
        closeDialog()
        setError("")
    }

    useEffect(() => {
        setChoosenRole(editedMember?.role.name)
    }, [editedMember]);

    return (
        <CustomDialog
            open={open}
            onClose={close}
            title="Edytuj rolę użytkownika"
            content={
                <FormControl fullWidth margin="dense" error={error !== ""}>
                    <InputLabel id="role-select-label">Rola</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={choosenRole}
                        label="Rola"
                        onChange={(e) => setChoosenRole(e.target.value)}
                        variant="outlined"
                    >
                        {roles.map((role, index) => (
                            <MenuItem key={index} value={role.roleName}>
                                {role.roleName}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText sx={{
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                        visibility: error ? "visible" : "hidden"
                    }}>
                        <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                        {error}
                    </FormHelperText>
                </FormControl>
            }
            confirmText="Zapisz"
            confirmAction={saveRoleEdit}
        />
    )
}