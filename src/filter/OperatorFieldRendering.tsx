import {ColumnDataType, FilterOperator} from "@/features/receipts/types/FilterTypes";
import {filterForColumnType, operators} from "./basic/FilterModel";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export interface RenderOperatorFieldProps {
    operator: FilterOperator | null
    setOperator: (operator: FilterOperator) => void
    columnType: ColumnDataType
}

export function RenderOperatorField(props: RenderOperatorFieldProps) {
    return (
        <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Operator</InputLabel>
            <Select
                value={props.operator || ''}
                label="Operator"
                onChange={(e) => props.setOperator(e.target.value as FilterOperator)}
                size="small"
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    PaperProps: {
                        style: {
                            maxHeight: 200
                        },
                    },
                }}
            >
                {GetOperatorMenuItems(props.columnType)}
            </Select>
        </FormControl>
    )
}

function GetOperatorMenuItems(columnType: ColumnDataType) {
    return filterForColumnType[columnType].map(filter => {
        return <MenuItem key={filter} value={filter}>{operators[filter]}</MenuItem>
    })
}
