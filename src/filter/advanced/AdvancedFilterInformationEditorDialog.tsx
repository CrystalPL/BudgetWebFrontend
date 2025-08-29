import {DialogShowingController} from "../../controllers/DialogShowingController";
import {Box, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface AdvancedFilterInformationEditorDialogProps {
    showingController: DialogShowingController;
}

export default function AdvancedFilterInformationEditorDialog(props: AdvancedFilterInformationEditorDialogProps) {
    return (
        <Dialog
            open={props.showingController.openDialogStatus}
            onClose={props.showingController.closeDialog}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        maxHeight: '70vh',
                        minHeight: '70vh',
                    },
                },
            }}
        >
            <DialogTitle>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <EditIcon/>
                    <Typography variant="h6">Edytuj informacje o filtrze</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}