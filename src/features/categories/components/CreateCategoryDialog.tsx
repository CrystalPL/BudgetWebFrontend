import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import CustomDialog from "../../../components/CustomDialog";
import * as React from "react";
import {useState} from "react";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import Stack from "@mui/material/Stack";
import {MuiColorInput} from "mui-color-input";

interface CreateCategoryProps extends DialogShowingController, HouseholdReloadKeyProps {
}

export default function CreateCategoryDialog({openDialogStatus: open, closeDialog, reloadTable}: CreateCategoryProps) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameError, setCategoryNameError] = useState<string>("")
    const [colorPickerValue, setColorPickerValue] = React.useState('#ffffff')
    const snackbarController = useSnackbarContext();

    const validateCategoryName = () => {
        return ""
    }

    const handleChooseColor = (newValue: string) => {
        setColorPickerValue(newValue)
    }

    const create = () => {
        reloadTable()
        close()
        snackbarController.setStatusMessage("SUCCESS")
        snackbarController.setStatus('success')
        snackbarController.setOpenSnackbar(true)
    }

    const close = () => {
        closeDialog()
        setCategoryNameError("")
        setColorPickerValue("#ffffff")
    }

    const categoryNameFieldProps: CustomFormControlProps = {
        valueState: [categoryName, setCategoryName],
        errorState: [categoryNameError, setCategoryNameError],
        label: 'Nazwa kategorii',
        name: 'categoryName',
        validateFunction: () => validateCategoryName()
    };

    return (
        <CustomDialog
            open={open}
            onClose={close}
            title="Stwórz kategorie"
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...categoryNameFieldProps}></CustomFormControl>
                    <MuiColorInput format="hex" value={colorPickerValue} onChange={handleChooseColor}/>
                </Stack>
            }
            confirmText="Stwórz"
            confirmAction={create}
        />
    )
}