import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';
import {Add as AddIcon, FilterList as FilterListIcon} from '@mui/icons-material';
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import AdvancedFilterEditorDialog from "../AdvancedFilterEditorDialog";
import {AdvancedField, AdvancedFilter} from "../api/AdvancedFilterModel";
import {StateProp, useStateProp} from "../../StateProp";
import {GetFilters} from "./AdvancedFilterListGetter";
import AdvancedFilterDuplicateDialog from "../AdvancedFilterDuplicateDialog";
import AdvancedConditionsEditorDialog from "../conditions/AdvancedConditionsEditorDialog";

interface AdvancedFilterListDialogProps {
    dialogController: DialogShowingController
    fields: AdvancedField<any>[];
}

export const exampleFilters: AdvancedFilter[] = [
    {
        id: 1,
        name: 'Oferty IT 10k+',
        description: 'Oferty w IT z wynagrodzeniem powyżej 10k',
        active: true,
        createdAt: new Date('2025-08-15T09:00:00Z'),
        updatedAt: new Date('2025-08-15T09:00:00Z'),
        filter: []
    },
    {
        id: 2,
        name: 'Tylko zdalne',
        description: '',
        active: false,
        createdAt: new Date('2025-08-10T12:30:00Z'),
        updatedAt: new Date('2025-08-18T14:45:00Z'),
        filter: []
    },
    {
        id: 3,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
        filter: []
    },
    {
        id: 4,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
        filter: []
    },
    {
        id: 5,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
        filter: []
    },
    {
        id: 6,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
        filter: []
    },
];


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
            {...duplicateFilterController}
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