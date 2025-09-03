import {Autocomplete, Box, Button, DialogContent, Paper, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ColumnDataType, FilterOperator} from "@/features/receipts/types/FilterTypes";
import {RenderOperatorField} from "../../OperatorFieldRendering";
import {Condition, ConditionGroup} from "../api/AdvancedFilterModel";
import {useState} from "react";
import {StateProp} from "@/filter/StateProp";
import {createCondition} from "@/filter/advanced/FieldSupplierUtil";
import {ConditionUpdater} from "@/filter/advanced/ConditionUpdater";
import {AutocompleteItem, RenderInput} from "@/filter/advanced/conditions/AdvancedFilterInputRendering";

interface AdvancedConditionsEditorContentProps {
    fields: AdvancedField<any>[];
}

export interface AdvancedField<T> {
    columnDataType: ColumnDataType
    columnName: string
    columnLabel: string
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => AutocompleteItem<T>
}

export default function AdvancedConditionsEditorContent(props: AdvancedConditionsEditorContentProps) {
    const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([{conditions: []}]);
    const [loading, setLoading] = useState<boolean>(false);
    const [autocompleteValues, setAutocompleteValues] = useState<Record<string, AutocompleteItem<any>[]>>()

    const fetchItemsByColumnName = (column: AdvancedField<any>): AutocompleteItem<any>[] => {
        return []
    }

    const createGroup = () => {
        setConditionGroups(prev => [...prev, {conditions: []}]);
    };

    return (
        <DialogContent>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                    Grupy warunków
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    onClick={createGroup}
                    size="small"
                >
                    Dodaj grupę
                </Button>
            </Box>
            {conditionGroups.map((group, index) => (
                <RenderGroup
                    key={index}
                    index={index}
                    conditionGroup={group}
                    fields={props.fields}
                    conditionGroupsState={{value: conditionGroups, setValue: setConditionGroups}}
                    loading={loading}
                    fetchItemsByColumnName={fetchItemsByColumnName}
                />
            ))}
        </DialogContent>
    )
}

export interface RenderGroupProps {
    conditionGroup: ConditionGroup
    fields: AdvancedField<any>[]
    conditionGroupsState: StateProp<ConditionGroup[]>
    index: number
    loading: boolean
    fetchItemsByColumnName: (column: AdvancedField<any>) => AutocompleteItem<any>[]
}

function RenderGroup(props: RenderGroupProps) {
    return (
        <Paper sx={{p: 2, border: '2px dashed #e0e0e0'}}>
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={() => createCondition(props)}
                size="small"
            >
                Dodaj warunek
            </Button>
            {props.conditionGroup.conditions.map((condition, index) => (
                <RenderConditionLine
                    key={index}
                    conditionGroupIndex={props.index}
                    conditionIndex={index}
                    condition={condition}
                    fields={props.fields}
                    conditionGroupsState={props.conditionGroupsState}
                    loading={props.loading}
                    fetchItemsByColumnName={props.fetchItemsByColumnName}
                />
            ))}
        </Paper>
    )
}

export interface RenderConditionLineProps {
    condition: Condition
    fields: AdvancedField<any>[]
    conditionGroupIndex: number
    conditionIndex: number
    conditionGroupsState: StateProp<ConditionGroup[]>
    loading: boolean
    fetchItemsByColumnName: (column: AdvancedField<any>) => AutocompleteItem<any>[]
}

function RenderConditionLine(props: RenderConditionLineProps) {
    const updateOperator = (operator: FilterOperator) => {
        const operatorUpdater: ConditionUpdater = new ConditionUpdater(props.conditionGroupsState, props.conditionGroupIndex, props.conditionIndex, 'operator', operator);
        operatorUpdater.updateValue()
    }

    return (
        <Box display='flex' flexDirection="row" gap={1} mt={2} maxWidth='60%'>
            <RenderFieldList {...props}/>
            <RenderOperatorField{...props.condition} columnType={props.condition.field.columnDataType}
                                setOperator={updateOperator}/>
            <RenderValueField {...props}/>
        </Box>
    )
}

function RenderValueField(props: RenderConditionLineProps) {
    const updateField = (value: any) => {
        const operatorUpdater: ConditionUpdater = new ConditionUpdater(props.conditionGroupsState, props.conditionGroupIndex, props.conditionIndex, 'value', value);
        operatorUpdater.updateValue()
    }

    return (
        <RenderInput<any> columnType={props.condition.field.columnDataType} loading={props.loading}
                          value={props.condition.value}
                          setValue={updateField} items={props.fetchItemsByColumnName(props.condition.field)}/>
    )
}

function RenderFieldList(props: RenderConditionLineProps) {
    const updateField = (value: AdvancedField<any>) => {
        const operatorUpdater: ConditionUpdater = new ConditionUpdater(props.conditionGroupsState, props.conditionGroupIndex, props.conditionIndex, 'field', value);
        operatorUpdater.updateValue()
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
            onChange={(_event, newValue) => updateField(newValue)}
            renderInput={(params) => <TextField {...params} label="Pole"/>}
        />
    );
}