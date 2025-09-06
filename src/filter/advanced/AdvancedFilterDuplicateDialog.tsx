import {DialogShowingController} from "../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../features/household/api/HouseholdModel";
import CustomDialog from "../../components/CustomDialog";
import {CustomFormControl} from "../../components/CustomFormControl";
import * as React from "react";
import {AdvancedFilter, DuplicateFilterRequest} from "./api/AdvancedFilterModel";
import {StateProp} from "../StateProp";
import Stack from "@mui/material/Stack";
import {useSnackbarContext} from "../../context/SnackbarContext";
import {createCategory} from "../../features/categories/api/CategoryService";
import {CreateAdvancedFilterMessage} from "./api/AdvancedFilterMessages";
import {FieldProps, useFieldProps} from "./hooks/FieldPropsHook";

interface AdvancedFilterDuplicateDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
}

export default function AdvancedFilterDuplicateDialog(props: AdvancedFilterDuplicateDialogProps) {
    const validateFilterName = (value: string): string => {
        if (value == null || value.length === 0) {
            return CreateAdvancedFilterMessage.EMPTY_FILTER_NAME
        }

        return ''
    }

    const fieldProps: FieldProps = useFieldProps("Nazwa", "duplicateFilter", validateFilterName, '');
    const snackbarController = useSnackbarContext();

    const duplicateFilter = async () => {
        const duplicateFilterRequest: DuplicateFilterRequest = {
            baseFilter: props.editedFilterProps.value!,
            newName: fieldProps.stateProp.value
        }

        // const response = await duplicateFilter(duplicateFilterRequest); TODO
        const response = await createCategory("", "");
        if (!response.success) {
            fieldProps.errorStateProp.setValue(response.message)
            return
        }

        props.reloadTable()
        snackbarController.setStatusMessage(response.message)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)

        props.reloadTable()
    }

    const handleClose = () => {
        props.editedFilterProps.setValue(null)
        props.closeDialog()

        fieldProps.stateProp.setValue('')
        fieldProps.errorStateProp.setValue('')
    }

    return (
        <CustomDialog
            open={props.openDialogStatus}
            onClose={props.closeDialog}
            onExited={handleClose}
            title="Duplikowanie filtru"
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...fieldProps.formControlProps}></CustomFormControl>
                </Stack>
            }
            confirmText="Utwórz"
            confirmAction={duplicateFilter}
        />
    )
}