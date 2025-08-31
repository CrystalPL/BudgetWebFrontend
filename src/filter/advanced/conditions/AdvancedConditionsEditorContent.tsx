import {Box, Button, DialogContent, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ColumnDataType, FilterOperator} from "@/features/receipts/types/FilterTypes";
import {RenderOperatorField} from "../../OperatorFieldRendering";
import {FilterMenuItemConfig} from "../../basic/FilterInputRendering";
import {Condition, ConditionGroup} from "../api/AdvancedFilterModel";
import {useState} from "react";
import {StateProp} from "@/filter/StateProp";
import {filterForColumnType} from "@/filter/basic/FilterModel";

interface AdvancedConditionsEditorContentProps {
    fields: AdvancedField<any>[];
}

export interface AdvancedField<T> {
    columnDataType: ColumnDataType
    columnName: string
    columnLabel: string
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => FilterMenuItemConfig
}

export default function AdvancedConditionsEditorContent(props: AdvancedConditionsEditorContentProps) {
    const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([{conditions: []}]);

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
                <RenderGroup key={index} conditionGroup={group} fields={props.fields}
                             conditionGroupsState={{value: conditionGroups, setValue: setConditionGroups}}/>
            ))}
        </DialogContent>
    )
}

interface RenderGroupProps {
    conditionGroup: ConditionGroup
    fields: AdvancedField<any>[]
    conditionGroupsState: StateProp<ConditionGroup[]>
}

function RenderGroup(props: RenderGroupProps) {
    const createCondition = () => {
        const firstField: AdvancedField<any> = props.fields[0];

        const newCondition: Condition = {
            setOperator(operator: FilterOperator): void {
            },
            id: 0,
            columnType: firstField.columnDataType,
            field: firstField,
            operator: filterForColumnType[firstField.columnDataType][0],
            value: null

        }
    }

    return (
        <Paper sx={{p: 2, border: '2px dashed #e0e0e0'}}>
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                // onClick={handleAddGroup}
                size="small"
            >
                Dodaj warunek
            </Button>
            {props.conditionGroup.conditions.map((conditon, index) => (
                <RenderConditionLine key={index} condition={conditon} fields={props.fields}/>
            ))}
        </Paper>
    )
}

function RenderConditionLine(props: RenderFieldListProps) {
    return (<>
        <RenderFieldList {...props}/>
        <RenderOperatorField {...props.condition}/>
    </>)
}

function RenderInput(condition: Condition) {
    // return (
    //
    // )
}

interface RenderFieldListProps {
    condition: Condition
    fields: AdvancedField<any>[]
}

function RenderFieldList(props: RenderFieldListProps) {
    return (
        <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Pole</InputLabel>
            <Select
                value={props.condition.field.value || ''}
                label="Operator"
                onChange={(e) => props.condition.field.setValue(e.target.value as AdvancedField<any>)}
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
                {props.fields.map((field) => (
                    <MenuItem key={field.columnName} value={field.columnLabel}>{field.columnLabel}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}