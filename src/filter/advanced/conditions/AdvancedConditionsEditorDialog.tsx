import {DialogShowingController} from "@/controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "@/features/household/api/HouseholdModel";
import {Dialog} from "@mui/material";
import {StateProp} from "../../StateProp";
import {AdvancedField, AdvancedFilter, ConditionGroup} from "../api/AdvancedFilterModel";
import {AdvancedConditionsEditorHeader} from "./AdvancedConditionsEditorHeader";
import AdvancedConditionsEditorContent from "./AdvancedConditionsEditorContent";
import * as React from "react";
import {useEffect, useState} from "react";
import {getConditionGroups} from "@/filter/advanced/api/AdvancedFilterAPIService";

export interface AdvancedConditionsEditorDialogProps extends DialogShowingController, HouseholdReloadKeyProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
    fields: AdvancedField<any>[];
}

export default function AdvancedConditionsEditorDialog(props: AdvancedConditionsEditorDialogProps) {
    const [conditionGroup, setConditionGroup] = useState<ConditionGroup[]>([])

    useEffect(() => {
        async function fetchConditions() {
            if (props.openDialogStatus) {
                setConditionGroup(await getConditionGroups(props.editedFilterProps.value?.id ?? 0, props.fields))
            }
        }

        fetchConditions()
    }, [props.openDialogStatus]);

    const conditionGroupProp: StateProp<ConditionGroup[]> = {
        value: conditionGroup,
        setValue: setConditionGroup
    }

    return (
        <Dialog
            open={props.openDialogStatus}
            onClose={() => {
                props.editedFilterProps.setValue(null)
                setConditionGroup([])
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
                                            conditionGroupProp={conditionGroupProp}/>
            <AdvancedConditionsEditorContent {...props} conditionGroupProp={conditionGroupProp}/>
        </Dialog>
    )
}
