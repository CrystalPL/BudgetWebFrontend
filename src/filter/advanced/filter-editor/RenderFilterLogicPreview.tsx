import {ConditionGroup, logicalOperators} from "../api/AdvancedFilterModel";
import {operators} from "../../FilterModel";
import {Paper, Typography} from "@mui/material";


function generateFilterLogicPreview(filter: ConditionGroup[]): string {
    return filter.map((group, groupIndex) => {
        const groupText = group.conditions.map((condition, conditionIndex) => {
            const openParenthesis = '('.repeat(condition.openParenthesis || 0);
            const closeParenthesis = ')'.repeat(condition.closeParenthesis || 0);
            const column = condition.field.columnLabel.toLowerCase() || '[pole]';
            const operator = operators[condition.operator].toLowerCase()
            const value = formatDate(condition.firstValue);
            const value2 = condition.secondValue ? ` i ${formatDate(condition.secondValue)}` : '';

            const conditionText = `${openParenthesis}${column} ${operator} ${value}${value2}${closeParenthesis}`;

            if (conditionIndex === 0) {
                return conditionText;
            }

            const logicalOperator = condition.logicalOperatorBefore
                ? logicalOperators[condition.logicalOperatorBefore]
                : '[operator]';
            return ` ${logicalOperator} ${conditionText}`;
        }).join('');

        if (groupIndex === 0) {
            return groupText;
        }

        const groupOperator = group.logicalOperatorBefore || '[operator]';
        return ` ${groupOperator} (${groupText})`;
    }).join('');

}

function formatDate(value: any): string {
    if (value === null || value === undefined) {
        return '[wartość]';
    }

    if (!(value instanceof Date)) {
        return value.toString();
    }

    if (isNaN(value.getTime())) {
        return value.toString();
    }

    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();

    return `${day}.${month}.${year}`;
}

interface RenderFilterLogicPreviewProps {
    conditionGroups: ConditionGroup[];
}

export function RenderFilterLogicPreview(props: RenderFilterLogicPreviewProps) {
    return (
        <Paper sx={{p: 2, bgcolor: 'grey.50'}} variant="outlined">
            <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 'bold'}}>
                Podgląd logiki filtru:
            </Typography>
            <Typography variant="body2" sx={{fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>
                {generateFilterLogicPreview(props.conditionGroups)}
            </Typography>
        </Paper>
    )
}