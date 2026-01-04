import {DialogShowingController} from "@/controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "@/features/household/api/HouseholdModel";
import {Dialog} from "@mui/material";
import {StateProp} from "../../StateProp";
import {AdvancedField, AdvancedFilter, ConditionGroup} from "../api/AdvancedFilterModel";
import {AdvancedConditionsEditorHeader} from "./AdvancedConditionsEditorHeader";
import AdvancedConditionsEditorContent from "./AdvancedConditionsEditorContent";
import * as React from "react";

export interface AdvancedConditionsEditorDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
    fields: AdvancedField<any>[];
    conditionGroupProp: StateProp<ConditionGroup[]>
}

export default function AdvancedConditionsEditorDialog(props: AdvancedConditionsEditorDialogProps) {
    return (
        <Dialog
            open={props.openDialogStatus}
            onClose={() => {
                props.conditionGroupProp.setValue([])
                props.closeDialog()
            }}
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
            <AdvancedConditionsEditorHeader editedFilterProps={props.editedFilterProps}
                                            conditionGroupProp={props.conditionGroupProp}/>
            <AdvancedConditionsEditorContent {...props} conditionGroupProp={props.conditionGroupProp}/>
        </Dialog>
    )
}
