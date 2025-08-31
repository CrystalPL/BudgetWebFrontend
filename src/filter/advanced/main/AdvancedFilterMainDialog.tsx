import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';
import {Add as AddIcon, FilterList as FilterListIcon} from '@mui/icons-material';
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import AdvancedFilterEditorDialog from "../AdvancedFilterEditorDialog";
import {AdvancedFilter, exampleFilters} from "../api/AdvancedFilterModel";
import {StateProp, useStateProp} from "../../StateProp";
import {GetFilters} from "./AdvancedFilterListGetter";
import AdvancedFilterDuplicateDialog from "../AdvancedFilterDuplicateDialog";
import AdvancedConditionsEditorDialog from "../conditions/AdvancedConditionsEditorDialog";
import {AdvancedField} from "../conditions/AdvancedConditionsEditorContent";

interface AdvancedFilterListDialogProps {
    dialogController: DialogShowingController
    fields: AdvancedField[];
}

export default function AdvancedFilterMainDialog(props: AdvancedFilterListDialogProps) {
    const creatingFilterController: DialogShowingController = GetShowingController();
    const duplicateFilterController: DialogShowingController = GetShowingController();
    const editConditionsFilterController: DialogShowingController = GetShowingController();

    const [reloadKey, setReloadKey] = useState(0)
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilter[]>(exampleFilters)
    const editedFilterProps: StateProp<AdvancedFilter | null> = useStateProp<AdvancedFilter>();
    const reloadTable = () => {
        setReloadKey(reloadKey + 1);
    }

    useEffect(() => {
        async function fetchFilters() {
            // setAdvancedFilters(await getAdvancedFilters()) //TODO ogarnac pobieranie filtrów
        }

        if (reloadKey != 0) {
            fetchFilters()
        }
    }, [reloadKey]);

    return (<>
        <Dialog
            open={props.dialogController.openDialogStatus}
            onClose={props.dialogController.closeDialog}
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
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <FilterListIcon/>
                        <Typography variant="h6">Zaawansowane filtry</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={creatingFilterController.openDialog}
                        size="small"
                    >
                        Nowy filtr
                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <GetFilters
                    filters={advancedFilters}
                    reloadTable={reloadTable}
                    editedFilterProps={editedFilterProps}
                    creatingFilterController={creatingFilterController}
                    duplicateFilterController={duplicateFilterController}
                    editConditionsFilterController={editConditionsFilterController}
                />
            </DialogContent>
        </Dialog>
        <AdvancedFilterEditorDialog
            {...creatingFilterController}
            reloadTable={reloadTable}
            editedFilterProps={editedFilterProps}
        />
        <AdvancedFilterDuplicateDialog
            editedFilterProps={editedFilterProps}
            {...editConditionsFilterController}
            reloadTable={reloadTable}
        />
        <AdvancedConditionsEditorDialog
            fields={props.fields}
            editedFilterProps={editedFilterProps}
            {...editConditionsFilterController}
            reloadTable={reloadTable}
        />
    </>)
}