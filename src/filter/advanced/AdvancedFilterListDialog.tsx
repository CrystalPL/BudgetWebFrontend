import React, {useState} from 'react';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
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
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    FileCopy as CopyIcon,
    FilterList as FilterListIcon,
    Info as InfoIcon,
    MoreVert as MoreVertIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import {DialogShowingController, GetShowingController} from "../../controllers/DialogShowingController";

interface AdvancedFilterListDialogProps {
    dialogController: DialogShowingController
}

export default function AdvancedFilterListDialog(props: AdvancedFilterListDialogProps) {
    return (
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
                        // onClick={() => setView('create')}
                        size="small"
                    >
                        Nowy filtr
                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <EmptyFilters/>
            </DialogContent>
        </Dialog>
    )
}

interface AdvancedFilter {
    //grupy warunków
    name: string
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}

function FilterInfo(props: AdvancedFilter) {
    const [moreOptionsAnchor, setMoreOptionsAnchor] = useState<null | HTMLElement>(null);
    const moreOptionsController: DialogShowingController = GetShowingController();

    const handleActivateFilter = () => {

    }

    return (<>
        <ListItem
            secondaryAction={
                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.active}
                                onChange={() => handleActivateFilter()}
                                size="small"
                            />
                        }
                        label="Aktywny"
                        labelPlacement="start"
                    />
                    <Tooltip title="Więcej opcji">
                        <IconButton
                            onClick={moreOptionsController.openDialog}
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
                        <Typography variant="subtitle1" sx={{fontWeight: props.active ? 'bold' : 'normal'}}>
                            {props.name}
                        </Typography>
                        {props.active && (
                            <Chip label="Aktywny" color="primary" size="small"/>
                        )}
                    </Box>
                }
                secondary={
                    <Box>
                        {props.description && (
                            <Typography variant="body2" color="text.secondary">
                                {props.description}
                            </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                            Utworzono: {props.createdAt.toLocaleDateString()}
                            {props.updatedAt.getTime() !== props.createdAt.getTime() && (
                                <>, zaktualizowano: {props.updatedAt.toLocaleDateString()}</>
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
                    </Box>
                }
            />
        </ListItem>
        <Menu
            anchorEl={moreOptionsAnchor}
            open={Boolean(moreOptionsAnchor)}
            onClose={() => setMoreOptionsAnchor(null)}
        >
            <MenuItem onClick={() => selectedFilter && handleEditFilter(selectedFilter)}>
                <InfoIcon sx={{mr: 1}}/>
                Edytuj informacje
            </MenuItem>
            <MenuItem onClick={() => selectedFilter && handleEditConditions(selectedFilter)}>
                <SettingsIcon sx={{mr: 1}}/>
                Edytuj warunki
            </MenuItem>
            <MenuItem onClick={openDuplicateDialog}>
                <CopyIcon sx={{mr: 1}}/>
                Duplikuj
            </MenuItem>
            <Divider/>
            <MenuItem
                onClick={() => selectedFilter && handleDeleteFilter(selectedFilter.id)}
                sx={{color: 'error.main'}}
            >
                <DeleteIcon sx={{mr: 1}}/>
                Usuń
            </MenuItem>
        </Menu>
    </>)
}

function EmptyFilters() {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='200px'
             color='text.secondary'>
            <FilterListIcon sx={{fontSize: 48, mb: 2}}/>
            <Typography variant="body1">Brak zapisanych filtrów</Typography>
            <Typography variant="body2">
                Kliknij &quot;Nowy filtr&quot; aby utworzyć pierwszy
            </Typography>
        </Box>
    )
}