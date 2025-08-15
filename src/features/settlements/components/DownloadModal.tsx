import React from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {Download, GetApp, People, Person, SwapHoriz} from '@mui/icons-material';
import {Settlement, UserFilter} from '../types';

interface DownloadModalProps {
    open: boolean;
    userFilter: UserFilter;
    users: string[];
    settlements: Settlement[];
    onClose: () => void;
    onUserFilterChange: (filter: UserFilter) => void;
    onExport: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
                                                                open,
                                                                userFilter,
                                                                users,
                                                                settlements,
                                                                onClose,
                                                                onUserFilterChange,
                                                                onExport
                                                            }) => {
    // Funkcja do pobierania rozliczeń według filtrów użytkowników
    const getFilteredSettlements = () => {
        let filtered = settlements.filter(s => s.status === 'settled'); // Tylko rozliczone

        if (userFilter.type === 'single' && userFilter.singleUser) {
            filtered = filtered.filter(s =>
                s.from === userFilter.singleUser || s.to === userFilter.singleUser
            );
        } else if (userFilter.type === 'between' && userFilter.userFrom && userFilter.userTo) {
            filtered = filtered.filter(s =>
                (s.from === userFilter.userFrom && s.to === userFilter.userTo) ||
                (s.from === userFilter.userTo && s.to === userFilter.userFrom)
            );
        }

        return filtered;
    };

    const filteredSettlements = getFilteredSettlements();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <GetApp sx={{mr: 1, color: '#28a745'}}/>
                    Pobierz rozliczenia
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="#6c757d" sx={{mb: 3}}>
                    Wybierz kryteria filtrowania rozliczeń do pobrania
                </Typography>

                <FormControl fullWidth sx={{mb: 3}}>
                    <InputLabel>Typ filtrowania</InputLabel>
                    <Select
                        value={userFilter.type}
                        label="Typ filtrowania"
                        onChange={(e) => onUserFilterChange({
                            type: e.target.value as any,
                            singleUser: undefined,
                            userFrom: undefined,
                            userTo: undefined
                        })}
                    >
                        <MenuItem value="all">
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <People sx={{mr: 1}}/>
                                Wszystkie rozliczenia
                            </Box>
                        </MenuItem>
                        <MenuItem value="single">
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Person sx={{mr: 1}}/>
                                Dla jednego użytkownika
                            </Box>
                        </MenuItem>
                        <MenuItem value="between">
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <SwapHoriz sx={{mr: 1}}/>
                                Między dwoma użytkownikami
                            </Box>
                        </MenuItem>
                    </Select>
                </FormControl>

                {userFilter.type === 'single' && (
                    <Autocomplete
                        options={users}
                        value={userFilter.singleUser || null}
                        onChange={(_, value) => onUserFilterChange({
                            ...userFilter,
                            singleUser: value || undefined
                        })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Wybierz użytkownika"
                                fullWidth
                            />
                        )}
                    />
                )}

                {userFilter.type === 'between' && (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={users}
                                value={userFilter.userFrom || null}
                                onChange={(_, value) => onUserFilterChange({
                                    ...userFilter,
                                    userFrom: value || undefined
                                })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Od użytkownika"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={users}
                                value={userFilter.userTo || null}
                                onChange={(_, value) => onUserFilterChange({
                                    ...userFilter,
                                    userTo: value || undefined
                                })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Do użytkownika"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                )}

                {/* Podgląd wyników */}
                <Alert severity="info" sx={{mt: 2}}>
                    <Typography variant="body2">
                        <strong>{filteredSettlements.length}</strong> rozliczeń spełnia kryteria filtrowania
                    </Typography>
                    {filteredSettlements.length > 0 && (
                        <Typography variant="caption" sx={{display: 'block', mt: 1}}>
                            Ostatnie: {filteredSettlements[0]?.from} → {filteredSettlements[0]?.to}
                            ({filteredSettlements[0]?.amount})
                        </Typography>
                    )}
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Anuluj
                </Button>
                <Button
                    onClick={onExport}
                    variant="contained"
                    startIcon={<Download/>}
                    disabled={filteredSettlements.length === 0}
                    sx={{backgroundColor: '#28a745'}}
                >
                    Pobierz ({filteredSettlements.length})
                </Button>
            </DialogActions>
        </Dialog>
    );
};
