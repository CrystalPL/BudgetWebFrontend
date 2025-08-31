import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../../features/household/api/HouseholdModel";
import {Dialog} from "@mui/material";
import {StateProp} from "../../StateProp";
import {AdvancedFilter} from "../api/AdvancedFilterModel";
import {AdvancedConditionsEditorHeader} from "./AdvancedConditionsEditorHeader";
import AdvancedConditionsEditorContent, {AdvancedField} from "./AdvancedConditionsEditorContent";
import * as React from "react";

interface AdvancedConditionsEditorDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
    fields: AdvancedField[];
}

export default function AdvancedConditionsEditorDialog(props: AdvancedConditionsEditorDialogProps) {
    if (!props.editedFilterProps.value) {
        return <></>
    }

    return (
        <Dialog
            open={props.openDialogStatus}
            onClose={props.closeDialog}
            maxWidth="lg"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        maxHeight: '85vh',
                        minHeight: '85vh',
                        background: '#f0f8f0',
                    },
                },
            }}
        >
            <AdvancedConditionsEditorHeader editedFilterProps={props.editedFilterProps}/>
            <AdvancedConditionsEditorContent fields={props.fields}/>
        </Dialog>
    )
}
