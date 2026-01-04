import {Button, DialogActions} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import {AdvancedConditionsEditorDialogProps} from "@/filter/advanced/conditions/AdvancedConditionsEditorDialog";
import {ConditionGroup, SaveFilterConditionRequest} from "@/filter/advanced/api/AdvancedFilterModel";
import {saveFilterConditionRequest} from "@/filter/advanced/api/AdvancedFilterAPIService";
import {useSnackbarContext} from "@/context/SnackbarContext";
import {StateProp} from "@/filter/StateProp";

interface AdvancedConditionsEditorFooterProps extends AdvancedConditionsEditorDialogProps {
    conditionGroupProp: StateProp<ConditionGroup[]>
}

export function AdvancedConditionsEditorFooter(props: AdvancedConditionsEditorFooterProps) {
    const snackbarController = useSnackbarContext();

    const cancel = () => {
        props.conditionGroupProp.setValue([])
        props.closeDialog();
        props.reloadTable();
    }

    const saveConditions = async () => {
        const request = mapToRequest(props.editedFilterProps.value!.id, props.conditionGroupProp.value);
        const response = await saveFilterConditionRequest(request);

        if (response.success) {
            props.reloadTable();
            props.closeDialog();
        }

        snackbarController.setStatus(response.success ? 'success' : 'error')
        snackbarController.setOpenSnackbar(true)
        snackbarController.setStatusMessage(response.message)
    }

    return (
        <DialogActions sx={{mt: 2}}>
            <Button onClick={cancel} startIcon={<CancelIcon/>}>
                Anuluj
            </Button>
            <Button
                onClick={saveConditions}
                variant="contained"
                startIcon={<SaveIcon/>}
            >
                Zapisz warunki
            </Button>
        </DialogActions>
    );
}

function mapToRequest(filterId: number, conditionGroups: ConditionGroup[]): SaveFilterConditionRequest {
    return {
        advancedFilterId: filterId,
        conditionGroups: conditionGroups.map(group => ({
            conditionGroupId: group.id,
            logicalOperatorBefore: group.logicalOperatorBefore,
            conditions: group.conditions.map(condition => ({
                conditionId: condition.id,
                fieldName: condition.field?.columnName || '',
                firstValue: condition.firstValue,
                secondValue: condition.secondValue,
                openParenthesisNumber: condition.openParenthesis,
                closeParenthesisNumber: condition.closeParenthesis,
                logicalOperatorBefore: condition.logicalOperatorBefore || null,
                operator: condition.operator
            }))
        }))
    };
}