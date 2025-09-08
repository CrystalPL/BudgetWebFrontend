import {ConditionGroup} from "../api/AdvancedFilterModel";
import {operators} from "../../FilterModel";
import {Paper, Typography} from "@mui/material";


function generateFilterLogicPreview(filter: ConditionGroup[]): string {
    const groupPreviews = filter.map((group, groupIndex) => {
        const conditionPreviews = group.conditions.map((condition, conditionIndex) => {
            const openParenthesis = '('.repeat(condition.openParenthesis || 0);
            const closeParenthesis = ')'.repeat(condition.closeParenthesis || 0);

            const column = condition.field.columnLabel.toLowerCase() || '[pole]';
            const operator = operators[condition.operator].toLowerCase()
            const value = formatDate(condition.value);
            const value2 = condition.value2 ? ` i ${formatDate(condition.value2)}` : '';

            const conditionText = `${openParenthesis}${column} ${operator} ${value}${value2}${closeParenthesis}`;

            if (conditionIndex === 0) return conditionText;

            const logicalOp = condition.logicalOperatorBefore || 'AND';
            return ` ${logicalOp} ${conditionText}`;
        }).join('');

        const groupText = conditionPreviews;

        if (groupIndex === 0) return groupText;

        const groupOperator = group.logicalOperatorBefore || 'AND';
        return ` ${groupOperator} (${groupText})`;
    }).join('');
    return groupPreviews;

}

function formatDate(value: any): string {
    if (value === null || value === undefined) return '[wartość]';

    // jeśli to nie string/number/Date, traktujemy jako zwykły string
    if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date)) {
        return value.toString();
    }

    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) return value.toString(); // niepoprawna data

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

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