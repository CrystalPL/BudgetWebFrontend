import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Switch,
    FormControlLabel,
    Menu,
    MenuItem,
    Divider,
    Chip,
    Tooltip,
    Tabs,
    Tab
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    FileCopy as CopyIcon,
    MoreVert as MoreVertIcon,
    FilterList as FilterListIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Info as InfoIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import { SavedFilter } from '../types/FilterTypes';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import FilterInfoEditor from './FilterInfoEditor';
import FilterConditionsEditor from './FilterConditionsEditor';

interface AdvancedFilterManagerProps {
    open: boolean;
    onClose: () => void;
    availableColumns: Array<{
        name: string;
        type: 'text' | 'number' | 'date' | 'boolean';
        label: string;
        fieldOptions?: {
            isUserField?: boolean;
        };
    }>;
}

export default function AdvancedFilterManager({
    open,
    onClose,
    availableColumns
}: AdvancedFilterManagerProps) {
    const {
        state,
        createFilter,
        saveFilter,
        deleteFilter,
        setActiveFilter,
        setCurrentFilter,
        duplicateFilter,
        updateFilterInfo
    } = useAdvancedFilters();

    const [view, setView] = useState<'list' | 'create' | 'edit-info' | 'edit-conditions'>('list');
    const [editTab, setEditTab] = useState(0); // 0 = info, 1 = conditions
    const [newFilterName, setNewFilterName] = useState('');
    const [newFilterDescription, setNewFilterDescription] = useState('');
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [selectedFilter, setSelectedFilter] = useState<SavedFilter | null>(null);
    const [duplicateName, setDuplicateName] = useState('');
    const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

    const handleClose = () => {
        setView('list');
        setCurrentFilter(undefined);
        setNewFilterName('');
        setNewFilterDescription('');
        setEditTab(0);
        onClose();
    };

    const handleCreateFilter = () => {
        if (!newFilterName.trim()) return;

        const newFilter = createFilter(newFilterName.trim(), newFilterDescription.trim() || undefined);
        setCurrentFilter(newFilter);
        setView('edit-conditions'); // Po utworzeniu przejdź od razu do edycji warunków
        setNewFilterName('');
        setNewFilterDescription('');
    };

    const handleEditFilter = (filter: SavedFilter) => {
        setCurrentFilter(filter);
        setView('edit-info'); // Zacznij od edycji informacji
        setEditTab(0);
    };

    const handleEditConditions = (filter: SavedFilter) => {
        setCurrentFilter(filter);
        setView('edit-conditions');
    };

    const handleDeleteFilter = (filterId: string) => {
        deleteFilter(filterId);
    };

    const handleActivateFilter = (filterId: string) => {
        const isCurrentlyActive = state.savedFilters.find(f => f.id === filterId)?.active;
        setActiveFilter(isCurrentlyActive ? undefined : filterId);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, filter: SavedFilter) => {
        setMenuAnchor(event.currentTarget);
        setSelectedFilter(filter);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedFilter(null);
    };

    const handleDuplicateFilter = () => {
        if (selectedFilter && duplicateName.trim()) {
            duplicateFilter(selectedFilter.id, duplicateName.trim());
            setShowDuplicateDialog(false);
            setDuplicateName('');
        }
        handleMenuClose();
    };

    const openDuplicateDialog = () => {
        if (selectedFilter) {
            setDuplicateName(`${selectedFilter.name} - kopia`);
            setShowDuplicateDialog(true);
        }
        handleMenuClose();
    };

    const renderFiltersList = () => (
        <>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon />
                        <Typography variant="h6">Zaawansowane filtry</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setView('create')}
                        size="small"
                    >
                        Nowy filtr
                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ minHeight: 400, maxHeight: 600 }}>
                {state.savedFilters.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        color: 'text.secondary'
                    }}>
                        <FilterListIcon sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="body1">Brak zapisanych filtrów</Typography>
                        <Typography variant="body2">
                            Kliknij &quot;Nowy filtr&quot; aby utworzyć pierwszy
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {state.savedFilters.map((filter, index) => (
                            <React.Fragment key={filter.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: filter.active ? 'bold' : 'normal' }}>
                                                    {filter.name}
                                                </Typography>
                                                {filter.active && (
                                                    <Chip label="Aktywny" color="primary" size="small" />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
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
                                                <Box sx={{ mt: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Grup warunków: {filter.groups.length},
                                                        Warunków: {filter.groups.reduce((sum, g) => sum + g.conditions.length, 0)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={filter.active}
                                                        onChange={() => handleActivateFilter(filter.id)}
                                                        size="small"
                                                    />
                                                }
                                                label="Aktywny"
                                                labelPlacement="start"
                                            />
                                            <Tooltip title="Edytuj informacje">
                                                <IconButton
                                                    onClick={() => handleEditFilter(filter)}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edytuj warunki">
                                                <IconButton
                                                    onClick={() => handleEditConditions(filter)}
                                                    size="small"
                                                    color="secondary"
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Więcej opcji">
                                                <IconButton
                                                    onClick={(e) => handleMenuOpen(e, filter)}
                                                    size="small"
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index < state.savedFilters.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </DialogContent>
        </>
    );

    const renderCreateForm = () => (
        <>
            <DialogTitle>
                <Typography variant="h6">Utwórz nowy filtr</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Nazwa filtru"
                        value={newFilterName}
                        onChange={(e) => setNewFilterName(e.target.value)}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        label="Opis (opcjonalny)"
                        value={newFilterDescription}
                        onChange={(e) => setNewFilterDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Dodaj opis filtru, aby łatwiej go rozpoznać..."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setView('list')} startIcon={<CancelIcon />}>
                    Anuluj
                </Button>
                <Button
                    onClick={handleCreateFilter}
                    variant="contained"
                    disabled={!newFilterName.trim()}
                    startIcon={<SaveIcon />}
                >
                    Utwórz i dodaj warunki
                </Button>
            </DialogActions>
        </>
    );

    const renderEditInfo = () => (
        state.currentFilter && (
            <FilterInfoEditor
                filter={state.currentFilter}
                onSave={(name: string, description?: string) => {
                    updateFilterInfo(state.currentFilter!.id, name, description);
                    setView('list');
                }}
                onCancel={() => setView('list')}
            />
        )
    );

    const renderEditConditions = () => (
        state.currentFilter && (
            <FilterConditionsEditor
                filter={state.currentFilter}
                onSave={(updatedFilter) => {
                    saveFilter(updatedFilter);
                    setView('list');
                }}
                onCancel={() => setView('list')}
                availableColumns={availableColumns}
            />
        )
    );

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { minHeight: 500 }
                }}
            >
                {view === 'list' && (
                    <>
                        {renderFiltersList()}
                        <DialogActions>
                            <Button onClick={handleClose}>Zamknij</Button>
                        </DialogActions>
                    </>
                )}
                {view === 'create' && renderCreateForm()}
                {view === 'edit-info' && renderEditInfo()}
                {view === 'edit-conditions' && renderEditConditions()}
            </Dialog>

            {/* Menu kontekstowe dla filtrów */}
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => selectedFilter && handleEditFilter(selectedFilter)}>
                    <InfoIcon sx={{ mr: 1 }} />
                    Edytuj informacje
                </MenuItem>
                <MenuItem onClick={() => selectedFilter && handleEditConditions(selectedFilter)}>
                    <SettingsIcon sx={{ mr: 1 }} />
                    Edytuj warunki
                </MenuItem>
                <MenuItem onClick={openDuplicateDialog}>
                    <CopyIcon sx={{ mr: 1 }} />
                    Duplikuj
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => selectedFilter && handleDeleteFilter(selectedFilter.id)}
                    sx={{ color: 'error.main' }}
                >
                    <DeleteIcon sx={{ mr: 1 }} />
                    Usuń
                </MenuItem>
            </Menu>

            {/* Dialog duplikowania filtru */}
            <Dialog open={showDuplicateDialog} onClose={() => setShowDuplicateDialog(false)}>
                <DialogTitle>Duplikuj filtr</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nazwa nowego filtru"
                        value={duplicateName}
                        onChange={(e) => setDuplicateName(e.target.value)}
                        fullWidth
                        margin="dense"
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDuplicateDialog(false)}>Anuluj</Button>
                    <Button
                        onClick={handleDuplicateFilter}
                        variant="contained"
                        disabled={!duplicateName.trim()}
                    >
                        Duplikuj
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
