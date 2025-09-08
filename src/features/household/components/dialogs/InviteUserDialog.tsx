'use client'
import {Box} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {CustomFormControl, CustomFormControlProps} from "../../../../components/CustomFormControl";
import {InviteUserToHousehold} from "../../api/HouseholdMessage";
import {inviteMember} from "../../api/HouseholdService";
import {useSnackbarContext} from "../../../../context/SnackbarContext";
import {HouseholdReloadKeyProps} from "../../api/HouseholdModel";
import {DialogShowingController} from "../../../../controllers/DialogShowingController";
import CustomDialog from "../../../../components/CustomDialog";

interface InviteUserDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
}

export default function InviteUserDialog({openDialogStatus: open, closeDialog, reloadTable}: InviteUserDialogProps) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>("")
    const snackbarController = useSnackbarContext();

    const handleInvite = async () => {
        setEmailError(validateEmail())
        if (emailError !== '') {
            return
        }

        const result = await inviteMember(email)
        if (!result.success) {
            setEmailError(result.message)
            return
        }

        reloadTable()
        handleClose()
        snackbarController.setStatusMessage(InviteUserToHousehold.SUCCESS)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
    }

    const validateEmail = (): string => {
        if (!email) {
            return InviteUserToHousehold.MISSING_EMAIL
        }

        return "";
    }

    const emailFieldProps: CustomFormControlProps = {
        valueState: [email, setEmail],
        errorState: [emailError, setEmailError],
        label: 'Adres email',
        name: 'email',
        validateFunction: validateEmail
    };

    const handleClose = () => {
        closeDialog()
        setEmailError("")
        setEmail("")
    }

    return (
        <CustomDialog
            open={open}
            onClose={handleClose}
            title="Zaproś użytkownika"
            content={<Box mt={1}><CustomFormControl {...emailFieldProps} /></Box>}
            confirmText="Zaproś"
            confirmAction={handleInvite}
        />
    )
}