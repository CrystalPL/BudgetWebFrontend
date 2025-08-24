import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Paper,
    TextField,
    Alert
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { SavedFilter } from '../types/FilterTypes';

interface FilterInfoEditorProps {
    filter: SavedFilter;
    onSave: (name: string, description?: string) => void;
    onCancel: () => void;
}

export default function FilterInfoEditor({
    filter,
    onSave,
    onCancel
}: FilterInfoEditorProps) {
    const [filterName, setFilterName] = useState(filter.name);
    const [filterDescription, setFilterDescription] = useState(filter.description || '');
    const [originalName] = useState(filter.name);
    const [originalDescription] = useState(filter.description || '');

    // Reset values when filter changes
    useEffect(() => {
        setFilterName(filter.name);
        setFilterDescription(filter.description || '');
    }, [filter]);

    const handleSave = () => {
        if (!filterName.trim()) return;
        onSave(filterName.trim(), filterDescription.trim() || undefined);
    };

    const handleCancel = () => {
        setFilterName(originalName);
        setFilterDescription(originalDescription);
        onCancel();
    };

    const hasChanges = () => {
        return filterName.trim() !== originalName ||
               (filterDescription.trim() || undefined) !== (originalDescription || undefined);
    };

    const isValid = () => {
        return filterName.trim().length > 0;
    };

    return (
        <>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EditIcon />
                    <Typography variant="h6">Edytuj informacje o filtrze</Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ minWidth: 500 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    <Paper sx={{ p: 2 }} variant="outlined">
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Podstawowe informacje
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Nazwa filtru"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                fullWidth
                                required
                                error={!filterName.trim()}
                                helperText={!filterName.trim() ? 'Nazwa jest wymagana' : ''}
                                autoFocus
                            />
                            <TextField
                                label="Opis (opcjonalny)"
                                value={filterDescription}
                                onChange={(e) => setFilterDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Dodaj opis filtru, aby łatwiej go rozpoznać..."
                            />
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }} variant="outlined">
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Informacje o filtrze:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Grup warunków:</strong> {filter.groups.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Łączna liczba warunków:</strong> {filter.groups.reduce((sum, group) => sum + group.conditions.length, 0)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Status:</strong> {filter.active ? 'Aktywny' : 'Nieaktywny'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Utworzono:</strong> {filter.createdAt.toLocaleString()}
                            </Typography>
                            {filter.updatedAt.getTime() !== filter.createdAt.getTime() && (
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Ostatnia modyfikacja:</strong> {filter.updatedAt.toLocaleString()}
                                </Typography>
                            )}
                        </Box>
                    </Paper>

                    {!hasChanges() && (
                        <Alert severity="info">
                            Wprowadź zmiany w nazwie lub opisie filtru, aby zapisać aktualizacje.
                        </Alert>
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel} startIcon={<CancelIcon />}>
                    Anuluj
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!isValid() || !hasChanges()}
                    startIcon={<SaveIcon />}
                >
                    Zapisz zmiany
                </Button>
            </DialogActions>
        </>
    );
}
