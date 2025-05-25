import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import CustomDialog from "../../../components/CustomDialog";
import * as React from "react";
import {useEffect, useState} from "react";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";
import {MuiColorInput} from "mui-color-input";
import Stack from "@mui/material/Stack";
import {Category} from "../api/CategoryModel";
import {editCategory} from "../api/CategoryService";
import {useSnackbarContext} from "../../../context/SnackbarContext";

interface EditCategoryProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedCategory: Category | null
}

export default function EditCategoryDialog({
                                               openDialogStatus: open,
                                               closeDialog,
                                               reloadTable,
                                               editedCategory
                                           }: EditCategoryProps) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameError, setCategoryNameError] = useState<string>("")
    const [colorPickerValue, setColorPickerValue] = React.useState('#ffffff')

    useEffect(() => {
        if (editedCategory != null) {
            setCategoryName(editedCategory.name);
            setColorPickerValue(editedCategory.color);
        }
    }, [editedCategory]);

    const validateCategoryName = () => {
        return ""
    }

    const handleChooseColor = (newValue: string) => {
        setColorPickerValue(newValue)
    }

    const snackbarController = useSnackbarContext()
    const saveCategory = async () => {
        const response = await editCategory({
            categoryId: editedCategory!.id,
            name: categoryName,
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
        setCategoryNameError("")
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
            title="Edytuj kategorie"
            content={
                <Stack spacing={1} mt={1}>
                    <CustomFormControl {...categoryNameFieldProps}></CustomFormControl>
                    <MuiColorInput format="hex" value={colorPickerValue} onChange={handleChooseColor}/>
                </Stack>
            }
            confirmText="Zapisz"
            confirmAction={saveCategory}
        />
    )
}