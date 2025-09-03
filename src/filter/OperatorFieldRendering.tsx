import {ColumnDataType, FilterOperator} from "@/features/receipts/types/FilterTypes";
import {filterForColumnType, operators} from "./basic/FilterModel";
import {Autocomplete, TextField} from "@mui/material";

export interface RenderOperatorFieldProps {
    operator: FilterOperator
    setOperator: (operator: FilterOperator) => void
    columnType: ColumnDataType
}


export function RenderOperatorField(props: RenderOperatorFieldProps) {
    const options = filterForColumnType[props.columnType];

    return (
        <Autocomplete
            disableClearable={true}
            fullWidth
            size="small"
            value={props.operator}
            options={options}
            getOptionLabel={(option) => operators[option]}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newValue) => props.setOperator(newValue as FilterOperator)}
            renderInput={(params) => <TextField {...params} label="Operator"/>}
        />
    );
}