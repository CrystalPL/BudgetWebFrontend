import {Autocomplete, TextField} from "@mui/material";
import {AdvancedField, RenderConditionLineProps} from "../../../api/AdvancedFilterModel";
import {filterForColumnType} from "@/filter/FilterModel";
import {updateField} from "../../../conditions/AdvancedConditionsEditorContent";

export function RenderFieldList(props: RenderConditionLineProps) {
    const updateFields = (newValue: AdvancedField<any>) => {
        const options = filterForColumnType[newValue.columnDataType];
        if (options.includes(props.condition.operator)) {
            updateField(props, {field: newValue, value: null})
            return
        }

        updateField(props, {field: newValue, value: null, operator: options[0]})
    }

    return (
        <Autocomplete
            disableClearable={true}
            fullWidth
            size="small"
            value={props.condition.field}
            options={props.fields}
            getOptionLabel={(option) => option.columnLabel}
            isOptionEqualToValue={(option, value) => option.columnName === value.columnName}
            onChange={(_event, newValue) => updateFields(newValue)}
            renderInput={(params) => <TextField {...params} label="Pole"/>}
        />
    );
}