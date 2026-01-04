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
import {memo} from "react";


export const RenderConditionLine = memo(function RenderConditionLine(props: RenderConditionLineProps) {
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
            <Box sx={{minWidth: 330, display: 'flex', flexDirection: 'row', gap: 1}}>
                <RenderValueField {...props}/>
            </Box>
            <RenderParentheses type={'close'} {...props}/>
            <RenderConditionDelete {...props}/>
        </Box>
    )
}, (prev, next) => {
    if (prev === next) {
        return true;
    }

    const isConditionSame = JSON.stringify(prev.condition) === JSON.stringify(next.condition);

    const isItemsSame = prev.items === next.items ||
        (prev.items.length === next.items.length && JSON.stringify(prev.items) === JSON.stringify(next.items));

    const isContextSame = prev.loading === next.loading &&
        prev.conditionIndex === next.conditionIndex;

    return isConditionSame && isItemsSame && isContextSame;
});