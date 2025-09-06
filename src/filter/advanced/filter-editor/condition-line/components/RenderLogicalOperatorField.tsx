import {RenderConditionLineProps} from "../../../api/AdvancedFilterModel";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {updateField} from "../../../conditions/AdvancedConditionsEditorContent";

export function RenderLogicalOperatorField(props: RenderConditionLineProps) {
    return (
        <ToggleButtonGroup
            disabled={props.conditionIndex == 0}
            size='small'
            value={props.condition.logicalOperatorBefore}
            onChange={(_event, value) => updateField(props, {'logicalOperatorBefore': value})}
            color='success'
            exclusive
        >
            <ToggleButton value="OR">Lub</ToggleButton>
            <ToggleButton value="AND">I</ToggleButton>
        </ToggleButtonGroup>
    )
}
