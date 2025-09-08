import {Box} from "@mui/material";
import {updateField} from "../../../conditions/AdvancedConditionsEditorContent";
import {Condition, RenderConditionLineProps} from "../../../api/AdvancedFilterModel";
import {RenderInput} from "./RenderInput";


interface RenderInputValueProps extends RenderConditionLineProps {
    field: keyof Condition
}

export function RenderValueField(props: RenderConditionLineProps) {
    return (<>
        <RenderInputValue {...props} field='value'/>
        {props.condition.operator === 'between' && (
            <RenderInputValue {...props} field='value2'/>
        )}
    </>)
}

function RenderInputValue(props: RenderInputValueProps) {
    return (
        <Box maxWidth='160px'>
            <RenderInput<any>
                field={props.condition.field}
                loading={props.loading}
                value={props.condition.value}
                setValue={value => updateField(props, {[props.field]: value})}
                items={props.items}
                functionToLoadItems={props.functionToLoadItems}
            />
        </Box>
    )
}