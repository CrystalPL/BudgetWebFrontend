import {Box, Button, DialogContent, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AdvancedField, Condition, ConditionGroup, RenderConditionLineProps} from "../api/AdvancedFilterModel";
import * as React from "react";
import {useState} from "react";
import {AutocompleteItem} from "@/filter/advanced/filter-editor/condition-line/components/RenderInput";
import {ConditionFacade} from "@/filter/advanced/hooks/condition/ConditionFacade";
import {RenderGroup} from "@/filter/advanced/filter-editor/RenderGroup";
import {
    RenderLogicalOperatorBetweenConditionGroups
} from "@/filter/advanced/filter-editor/RenderLogicalOperatorBetweenConditionGroups";
import {RenderFilterLogicPreview} from "@/filter/advanced/filter-editor/RenderFilterLogicPreview";
import {AdvancedConditionsEditorFooter} from "@/filter/advanced/conditions/AdvancedConditionsEditorFooter";
import {AdvancedConditionsEditorDialogProps} from "@/filter/advanced/conditions/AdvancedConditionsEditorDialog";

export default function AdvancedConditionsEditorContent(props: AdvancedConditionsEditorDialogProps) {
    const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>(props.editedFilterProps.value?.filter || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [autocompleteValues, setAutocompleteValues] = useState<Record<string, AutocompleteItem<any>[]>>()

    const fetchItemsByColumnName = (column: AdvancedField<any>): AutocompleteItem<any>[] => {
        return []
    }

    const createGroup = () => {
        setConditionGroups(prev => [...prev, {id: 0, conditions: [], logicalOperatorBefore: "OR"}]);
    };

    return (
        <DialogContent
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    flexShrink: 0,
                }}
            >
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

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflowY: 'auto',
                    flexGrow: 1,
                }}
            >
                {conditionGroups.map((group, conditionGroupIndex) => {
                    return (
                        <React.Fragment key={conditionGroupIndex}>
                            <RenderLogicalOperatorBetweenConditionGroups
                                conditionGroupsState={{value: conditionGroups, setValue: setConditionGroups}}
                                conditionGroupIndex={conditionGroupIndex}
                                conditionGroup={group}
                            />
                            <RenderGroup
                                conditionGroupIndex={conditionGroupIndex}
                                conditionGroup={group}
                                fields={props.fields}
                                conditionGroupsState={{value: conditionGroups, setValue: setConditionGroups}}
                                loading={loading}
                                fetchItemsByColumnName={fetchItemsByColumnName}
                            />
                        </React.Fragment>
                    )
                })}
            </Box>
            <RenderFilterLogicPreview conditionGroups={conditionGroups}/>
            <AdvancedConditionsEditorFooter {...props}/>
        </DialogContent>
    )
}

export function updateField(props: RenderConditionLineProps, updates: Partial<Condition>) {
    const conditionFacade: ConditionFacade = new ConditionFacade();
    conditionFacade.updateCondition(props.conditionGroupsState, props.conditionGroupIndex, props.conditionIndex, updates)
}