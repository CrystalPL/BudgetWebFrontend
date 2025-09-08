import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Tooltip} from "@mui/material";
import {ConditionFacade} from "../../../hooks/condition/ConditionFacade";
import {RenderConditionLineProps} from "../../../api/AdvancedFilterModel";

export function RenderConditionDelete(props: RenderConditionLineProps) {
    const deleteCondition = () => {
        const conditionFacade: ConditionFacade = new ConditionFacade();
        conditionFacade.deleteCondition(props.conditionGroupsState, props.conditionGroupIndex, props.conditionIndex)
    }

    return (
        <Tooltip title="Usuń warunek">
            <IconButton
                onClick={deleteCondition}
                color="error"
                size="small"
            >
                <DeleteIcon/>
            </IconButton>
        </Tooltip>
    )
}