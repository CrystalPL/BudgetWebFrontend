import React from 'react';
import {Box, Button, Card, Grid, InputAdornment, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Download, GetApp, Search} from '@mui/icons-material';

interface MainFiltersProps {
    searchTerm: string;
    statusFilter: string;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: string) => void;
    onDownloadClick: () => void;
}

export const MainFilters: React.FC<MainFiltersProps> = ({
                                                            searchTerm,
                                                            statusFilter,
                                                            onSearchChange,
                                                            onStatusFilterChange,
                                                            onDownloadClick
                                                        }) => {
    return (
        <Card sx={{mb: 3, p: 2}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Szukaj rozliczeń..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ToggleButtonGroup
                        value={statusFilter}
                        exclusive
                        onChange={(_, value) => value && onStatusFilterChange(value)}
                        size="small"
                        fullWidth
                    >
                        <ToggleButton value="all">Wszystkie</ToggleButton>
                        <ToggleButton value="pending">Oczekujące</ToggleButton>
                        <ToggleButton value="settled">Rozliczone</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            startIcon={<GetApp/>}
                            size="small"
                            onClick={onDownloadClick}
                            sx={{
                                borderColor: '#28a745',
                                color: '#28a745',
                                '&:hover': {backgroundColor: '#e8f5e8'}
                            }}
                        >
                            Pobierz rozliczenia
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Download/>}
                            size="small"
                        >
                            Eksportuj
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};
