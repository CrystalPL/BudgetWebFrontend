import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {AdvancedField, ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {StateProp} from "@/filter/StateProp";
import {AutocompleteItem} from "@/filter/advanced/filter-editor/condition-line/components/RenderInput";
import {alpha, Box, Button, Paper} from "@mui/material";
import {RenderConditionLine} from "@/filter/advanced/filter-editor/condition-line/RenderConditionLine";
import {ConditionFacade} from "@/filter/advanced/hooks/condition/ConditionFacade";

export interface RenderGroupProps {
    conditionGroup: ConditionGroup
    fields: AdvancedField<any>[]
    conditionGroupsState: StateProp<ConditionGroup[]>
    conditionGroupIndex: number
    loading: boolean
    fetchItemsByColumnName: (column: AdvancedField<any>) => AutocompleteItem<any>[]
}

export function RenderGroup(props: RenderGroupProps) {
    return (
        <Paper sx={{p: 2, border: '2px dashed #e0e0e0', minWidth: '100%', width: 'fit-content'}}>
            <GroupHeader {...props} />
            {props.conditionGroup.conditions.map((condition, index) => (
                <RenderConditionLine
                    key={index}
                    conditionGroupIndex={props.conditionGroupIndex}
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

function GroupHeader(props: RenderGroupProps) {
    const createCondition = () => {
        const conditionFacade: ConditionFacade = new ConditionFacade();
        conditionFacade.createCondition(props.conditionGroupsState, props.conditionGroupIndex, props.fields)
    }

    const deleteGroup = () => {
        props.conditionGroupsState.setValue(prev => prev.filter((_conditionGroup, index) => index !== props.conditionGroupIndex))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={createCondition}
                size="small"
                sx={{
                    "&:hover": {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    },
                }}
            >
                Dodaj warunek
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon/>}
                onClick={deleteGroup}
                size="small"
                sx={{
                    "&:hover": {
                        backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
                    },
                }}
            >
                Usuń grupę
            </Button>
        </Box>
    );
}