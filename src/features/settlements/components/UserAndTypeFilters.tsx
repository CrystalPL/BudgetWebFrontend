import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {AccountBalance, MonetizationOn, People, Person, Receipt, SwapHoriz} from '@mui/icons-material';
import {TypeFilter, UserFilter} from '../types';

interface UserAndTypeFiltersProps {
    mainUserFilter: UserFilter;
    typeFilter: TypeFilter;
    users: string[];
    filteredCount: number;
    onMainUserFilterChange: (filter: UserFilter) => void;
    onTypeFilterChange: (filter: TypeFilter) => void;
    onClearFilters: () => void;
}

export const UserAndTypeFilters: React.FC<UserAndTypeFiltersProps> = ({
                                                                          mainUserFilter,
                                                                          typeFilter,
                                                                          users,
                                                                          filteredCount,
                                                                          onMainUserFilterChange,
                                                                          onTypeFilterChange,
                                                                          onClearFilters
                                                                      }) => {
    return (
        <Card sx={{mb: 3, p: 2}}>
            <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                <People sx={{mr: 1, verticalAlign: 'middle'}}/>
                Filtruj według użytkowników i typu
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Typ filtrowania</InputLabel>
                        <Select
                            value={mainUserFilter.type}
                            label="Typ filtrowania"
                            onChange={(e) => {
                                onMainUserFilterChange({
                                    type: e.target.value as any,
                                    singleUser: undefined,
                                    userFrom: undefined,
                                    userTo: undefined
                                });
                            }}
                        >
                            <MenuItem value="all">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <People sx={{mr: 1, fontSize: '1rem'}}/>
                                    Wszystkie rozliczenia
                                </Box>
                            </MenuItem>
                            <MenuItem value="single">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                    Dla jednego użytkownika
                                </Box>
                            </MenuItem>
                            <MenuItem value="between">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                    Między dwoma użytkownikami
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Typ rozliczenia</InputLabel>
                        <Select
                            value={typeFilter.type}
                            label="Typ rozliczenia"
                            onChange={(e) => {
                                onTypeFilterChange({
                                    type: e.target.value as any
                                });
                            }}
                        >
                            <MenuItem value="all">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                    Wszystkie typy
                                </Box>
                            </MenuItem>
                            <MenuItem value="receipts">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Receipt sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                    Paragony
                                </Box>
                            </MenuItem>
                            <MenuItem value="bills">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <MonetizationOn sx={{mr: 1, fontSize: '1rem', color: '#007bff'}}/>
                                    Rachunki
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {mainUserFilter.type === 'single' && (
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            options={users}
                            value={mainUserFilter.singleUser || null}
                            onChange={(_, value) => {
                                onMainUserFilterChange({
                                    ...mainUserFilter,
                                    singleUser: value || undefined
                                });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Wybierz użytkownika"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                )}

                {mainUserFilter.type === 'between' && (
                    <>
                        <Grid item xs={12} md={3}>
                            <Autocomplete
                                options={users}
                                value={mainUserFilter.userFrom || null}
                                onChange={(_, value) => {
                                    onMainUserFilterChange({
                                        ...mainUserFilter,
                                        userFrom: value || undefined
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Od użytkownika"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Autocomplete
                                options={users}
                                value={mainUserFilter.userTo || null}
                                onChange={(_, value) => {
                                    onMainUserFilterChange({
                                        ...mainUserFilter,
                                        userTo: value || undefined
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Do użytkownika"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </>
                )}

                <Grid item xs={12} md={mainUserFilter.type === 'between' ? 12 : 3}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end'}}>
                        {(mainUserFilter.type !== 'all' || typeFilter.type !== 'all') && (
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={onClearFilters}
                                sx={{
                                    borderColor: '#dc3545',
                                    color: '#dc3545',
                                    '&:hover': {backgroundColor: '#fee'}
                                }}
                            >
                                Wyczyść filtry
                            </Button>
                        )}
                        <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                            {filteredCount} rozliczeń
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};
