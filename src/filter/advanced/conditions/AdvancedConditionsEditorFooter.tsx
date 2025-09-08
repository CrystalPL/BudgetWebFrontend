import {Button, DialogActions} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import {AdvancedConditionsEditorDialogProps} from "@/filter/advanced/conditions/AdvancedConditionsEditorDialog";

export function AdvancedConditionsEditorFooter(props: AdvancedConditionsEditorDialogProps) {
    const cancel = () => {
        props.reloadTable();
        props.closeDialog();
    }

    const saveConditions = () => {
        props.reloadTable();
        props.closeDialog();
    }

    return (
        <DialogActions sx={{mt: 2}}>
            <Button onClick={cancel} startIcon={<CancelIcon/>}>
                Anuluj
            </Button>
            <Button
                onClick={saveConditions}
                variant="contained"
                // disabled={!isFilterValid()}
                startIcon={<SaveIcon/>}
            >
                Zapisz warunki
            </Button>
        </DialogActions>
    );
}