import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import * as React from "react";
import {useCallback, useState} from "react";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import {InviteUserToHousehold} from "../api/HouseholdMessage";
import {inviteMember} from "../api/HouseholdService";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {HouseholdReloadKeyProps} from "../api/HouseholdModel";

export interface InviteUserDialogController {
    openDialogStatus: boolean
    closeDialog: () => void
    openDialog: () => void
}

export function GetInviteUserDialogController(): InviteUserDialogController {
    const [open, setOpen] = useState(false)

    const closeDialog = useCallback(() => {
        setOpen(false)
    }, []);

    const openDialog = useCallback(() => {
        setOpen(true)
    }, []);

    return {openDialogStatus: open, closeDialog, openDialog}
}

interface InviteUserDialogProps extends InviteUserDialogController, HouseholdReloadKeyProps {
}

export default function InviteUserDialog({openDialogStatus: open, closeDialog, reloadTable}: InviteUserDialogProps) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>("")
    const snackbarController = useSnackbarContext();

    const handleInvite = async () => {
        const emailErrorValidation = validateEmail()
        setEmailError(emailErrorValidation)
        if (emailErrorValidation !== '') {
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
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{fontWeight: 'medium'}}>Zaproś użytkownika</DialogTitle>
            <DialogContent>
                <Box mt={1}>
                    <CustomFormControl {...emailFieldProps}></CustomFormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="text"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(169, 190, 119, 0.2)',
                        },
                    }}
                >
                    Anuluj
                </Button>
                <Button onClick={handleInvite} variant="contained">
                    Zaproś
                </Button>
            </DialogActions>
        </Dialog>
    )
}