import {Box, Chip, DialogTitle, Typography} from "@mui/material";
import {Settings} from '@mui/icons-material';
import {StateProp} from "../../StateProp";
import {AdvancedFilter} from "../api/AdvancedFilterModel";

interface AdvancedConditionsEditorHeaderProps {
    editedFilterProps: StateProp<AdvancedFilter | null>
}

export function AdvancedConditionsEditorHeader(props: AdvancedConditionsEditorHeaderProps) {
    return (
        <DialogTitle sx={{
            mb: 2,
            pb: 2,
            background: "#a9be77",
            color: "white",
        }}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Settings/>
                    <Typography variant="h5">Edytuj warunki
                        filtru: {props.editedFilterProps.value!.name}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Chip
                        // label={`${currentFilter.groups.length} grup`} //TODO
                        label={<Typography color="white">0 grup</Typography>}
                        sx={{borderColor: "white", borderWidth: "2px", padding: "13px"}}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        // label={`${getTotalConditions()} warunków`} //TODO
                        sx={{borderColor: "white", borderWidth: "2px", padding: "13px"}}
                        label={<Typography color="white">0 warunków</Typography>}
                        size="small"
                        variant="outlined"
                    />
                </Box>
            </Box>
        </DialogTitle>
    );
}