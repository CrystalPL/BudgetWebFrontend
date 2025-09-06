import {RenderConditionLineProps} from "@/filter/advanced/api/AdvancedFilterModel";
import {updateField} from "@/filter/advanced/conditions/AdvancedConditionsEditorContent";
import {
    RenderConditionDelete,
    RenderFieldList,
    RenderLogicalOperatorField,
    RenderParentheses,
    RenderValueField
} from "@/filter/advanced/filter-editor/condition-line/components";
import {Box} from "@mui/material";
import {RenderOperatorField} from "@/filter/OperatorFieldRendering";


export function RenderConditionLine(props: RenderConditionLineProps) {
    return (
        <Box display='flex' flexDirection="row" gap={1} mt={2}>
            <RenderLogicalOperatorField {...props}/>
            <RenderParentheses type='open' {...props}/>
            <Box sx={{minWidth: 200}}>
                <RenderFieldList {...props}/>
            </Box>
            <Box sx={{minWidth: 160}}>
                <RenderOperatorField {...props.condition} columnType={props.condition.field.columnDataType}
                                     setOperator={operator => updateField(props, {operator: operator})}/>
            </Box>
            <Box sx={{minWidth: 320, display: 'flex', flexDirection: 'row', gap: 1}}>
                <RenderValueField {...props}/>
            </Box>
            <RenderParentheses type={'close'} {...props}/>
            <RenderConditionDelete {...props}/>
        </Box>
    )
}