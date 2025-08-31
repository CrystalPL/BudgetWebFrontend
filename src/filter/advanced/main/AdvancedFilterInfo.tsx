import {HouseholdReloadKeyProps} from "../../../features/household/api/HouseholdModel";
import {AdvancedFilter} from "../api/AdvancedFilterModel";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {deleteReceipt} from "../../../features/receipts/api/ReceiptService";
import React, {useState} from 'react';
import {
    Box,
    Chip,
    Divider,
    FormControlLabel,
    IconButton,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
    Tooltip,
    Typography
} from '@mui/material';
import {ContentCopy, Delete, MoreVert as MoreVertIcon, Settings} from '@mui/icons-material';
import ConfirmationDialog from "../../../features/household/components/base/ConfirmationDialog";
import InfoIcon from "@mui/icons-material/Info";
import {StateProp} from "../../StateProp";

interface FilterInfoProps extends HouseholdReloadKeyProps {
    allFilters: AdvancedFilter[]
    currentFilter: AdvancedFilter
    editedFilterProps: StateProp<AdvancedFilter | null>
    creatingFilterController: DialogShowingController
    duplicateFilterController: DialogShowingController
    editConditionsFilterController: DialogShowingController
}

export default function FilterInfo(props: FilterInfoProps) {
    const [moreOptionsAnchor, setMoreOptionsAnchor] = useState<null | HTMLElement>(null);
    const deleteFilterDialogController: DialogShowingController = GetShowingController();

    const handleActivateFilter = async () => {
        // TODO REQUEST DO BAZY, WSZYSTKIE INNE FILTRY OZNACZA JAKO NIEAKTYWNE, A TEN JAKO AKTYWNY activateFilter()
        props.reloadTable()
    }

    const openDialog = (controller: DialogShowingController) => {
        setMoreOptionsAnchor(null)
        props.editedFilterProps.setValue(props.currentFilter)
        controller.openDialog();
    }

    const editFilterInformation = () => {
        setMoreOptionsAnchor(null)
        props.editedFilterProps.setValue(props.currentFilter)
        props.creatingFilterController.openDialog();
    }

    const editFilterConditions = () => {
        setMoreOptionsAnchor(null)
        props.editedFilterProps.setValue(props.currentFilter)
        props.creatingFilterController.openDialog();
    }

    const duplicateFilter = () => {
        setMoreOptionsAnchor(null)
        props.editedFilterProps.setValue(props.currentFilter)
        props.duplicateFilterController.openDialog();
    }

    const filter: AdvancedFilter = props.currentFilter;
    return (<>
        <ListItem
            sx={{
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: 1,
                px: 2,
                py: 1,
                mb: 1,
                bgcolor: 'background.paper',
            }}

            secondaryAction={
                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={filter.active}
                                onChange={() => handleActivateFilter()}
                                size="small"
                            />
                        }
                        label="Aktywny"
                        labelPlacement="start"
                    />
                    <Tooltip title="Więcej opcji">
                        <IconButton
                            onClick={e => setMoreOptionsAnchor(e.currentTarget)}
                            size="small"
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            }
        >
            <ListItemText
                primary={
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Typography variant="subtitle1" sx={{fontWeight: filter.active ? 'bold' : 'normal'}}>
                            {filter.name}
                        </Typography>
                        {filter.active && (
                            <Chip label="Aktywny" color="primary" size="small"/>
                        )}
                    </Box>
                }
                secondary={<>
                    {filter.description && (
                        <Typography variant="body2" color="text.secondary">
                            {filter.description}
                        </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                        Utworzono: {filter.createdAt.toLocaleDateString()}
                        {filter.updatedAt.getTime() !== filter.createdAt.getTime() && (
                            <>, zaktualizowano: {filter.updatedAt.toLocaleDateString()}</>
                        )}
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <Typography variant="caption" color="text.secondary">
                            Grup warunków: TU TRZEBA TO ZROBIĆ,
                            Warunków: TU TRZEBA TO ZROBIĆ
                            {/*Grup warunków: {filter.groups.length},*/}
                            {/*Warunków: {filter.groups.reduce((sum, g) => sum + g.conditions.length, 0)}*/}
                        </Typography>
                    </Box>
                </>}
                slotProps={{secondary: {component: 'div'}}}
            />
        </ListItem>
        <Menu
            anchorEl={moreOptionsAnchor}
            open={Boolean(moreOptionsAnchor)}
            onClose={() => setMoreOptionsAnchor(null)}
        >
            <MenuItem onClick={() => openDialog(props.creatingFilterController)}>
                <InfoIcon sx={{mr: 1}}/>
                Edytuj informacje
            </MenuItem>
            <MenuItem onClick={() => openDialog(props.editConditionsFilterController)}>
                <Settings sx={{mr: 1}}/>
                Edytuj warunki
            </MenuItem>
            <MenuItem onClick={() => openDialog(props.duplicateFilterController)}>
                <ContentCopy sx={{mr: 1}}/>
                Duplikuj
            </MenuItem>
            <Divider/>
            <MenuItem
                sx={{color: 'error.main'}}
                onClick={deleteFilterDialogController.openDialog}
            >
                <Delete sx={{mr: 1}}/>
                Usuń
            </MenuItem>
        </Menu>
        <ConfirmationDialog
            open={deleteFilterDialogController.openDialogStatus}
            closeDialog={deleteFilterDialogController.closeDialog}
            title="Potwierdzenie usunięcia"
            content="Czy na pewno chcesz usunąć ten filter?"
            confirmText="Usuń"
            confirmColor="error"
            action={() => deleteReceipt(999)} //TODO USUWANIE FILTRU
            reloadTable={props.reloadTable}
        />
    </>)
}
