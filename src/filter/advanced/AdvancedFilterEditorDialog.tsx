import CustomDialog from "../../components/CustomDialog";
import Stack from "@mui/material/Stack";
import {CustomFormControl, CustomFormControlProps} from "../../components/CustomFormControl";
import * as React from "react";
import {DialogShowingController} from "../../controllers/DialogShowingController";
import {StateProp} from "../StateProp";
import {HouseholdReloadKeyProps} from "../../features/household/api/HouseholdModel";
import {CreateAdvancedFilterMessage, SaveFilterMessage} from "./api/AdvancedFilterMessages";
import {useSnackbarContext} from "../../context/SnackbarContext";
import {AdvancedFilter, AdvancedFilterEntityType, SaveFilterRequest} from "./api/AdvancedFilterModel";
import {FieldProps, useFieldProps} from "./hooks/FieldPropsHook";
import {saveFilterRequest} from "./api/AdvancedFilterAPIService";

interface AdvancedFilterCreatingDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
    advancedFilterEntityType: AdvancedFilterEntityType
}

export default function AdvancedFilterEditorDialog(props: AdvancedFilterCreatingDialogProps) {
    const filterNameFieldProps: FieldProps = GetFilterNameFieldProps(props.editedFilterProps.value);
    const filterDescriptionFieldProps: FieldProps = GetFilterDescriptionFieldProps(props.editedFilterProps.value);
    const snackbarController = useSnackbarContext();

    const handleClose = () => {
        props.editedFilterProps.setValue(null)
        props.closeDialog()

        filterNameFieldProps.stateProp.setValue('')
        filterNameFieldProps.errorStateProp.setValue('')
        filterDescriptionFieldProps.stateProp.setValue('')
        filterDescriptionFieldProps.errorStateProp.setValue('')
    }

    const saveFilter = async () => {
        const saveFilterProps: SaveFilterRequest = {
            id: props.editedFilterProps.value ? props.editedFilterProps.value.id : null,
            name: filterNameFieldProps.stateProp.value,
            description: filterDescriptionFieldProps.stateProp.value,
            advancedFilterEntityType: props.advancedFilterEntityType
        }

        const response = await saveFilterRequest(saveFilterProps);
        if (!response.success) {
            filterNameFieldProps.errorStateProp.setValue(response.message)
            return
        }

        props.reloadTable()
        snackbarController.setStatusMessage(props.editedFilterProps.value ? SaveFilterMessage.SUCCESS_UPDATE : SaveFilterMessage.SUCCESS_CREATE)
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
        props.closeDialog()
    }

    return (
        <CustomDialog
            open={props.openDialogStatus}
            onClose={props.closeDialog}
            onExited={handleClose}
            title={props.editedFilterProps.value ? "Edytuj filtr" : "Utwórz nowy filtr"}
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...filterNameFieldProps.formControlProps}></CustomFormControl>
                    <CustomFormControl {...filterDescriptionFieldProps.formControlProps}></CustomFormControl>
                </Stack>
            }
            confirmText={props.editedFilterProps.value ? "Zapisz" : "Utwórz"}
            confirmAction={saveFilter}
        />
    )
}

function GetFilterNameFieldProps(editedFilter: AdvancedFilter | null) {
    const validateFilterName = (value: string): string => {
        if (value == null || value.length === 0) {
            return CreateAdvancedFilterMessage.EMPTY_FILTER_NAME
        }

        return ''
    }

    const defaultValue: string = editedFilter ? editedFilter.name : '';
    return useFieldProps('Nazwa filtru', 'filterName', validateFilterName, defaultValue);
}

function GetFilterDescriptionFieldProps(editedFilter: AdvancedFilter | null) {
    const defaultValue: string = editedFilter ? editedFilter.description : '';
    const fieldProps = useFieldProps('Opis (opcjonalny)', 'filterDescription', () => '', defaultValue);

    const formControlProps: CustomFormControlProps = fieldProps.formControlProps;
    formControlProps.required = false;
    formControlProps.multiline = true;
    formControlProps.minRows = 2;
    formControlProps.maxRows = 7;

    return fieldProps;
}