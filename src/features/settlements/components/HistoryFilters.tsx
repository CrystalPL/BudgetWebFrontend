import React from 'react';
import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import {
    AccountBalance,
    Add,
    ArrowDownward,
    ArrowUpward,
    CheckCircle,
    Close,
    DateRange,
    FilterList,
    History,
    MonetizationOn,
    Person,
    Receipt,
    Search,
    SwapHoriz
} from '@mui/icons-material';
import {DateFilter, HistoryFilter, SortConfig, TypeFilter} from '../types';

interface HistoryFiltersProps {
    dateFilter: DateFilter;
    historyFilter: HistoryFilter;
    typeFilter: TypeFilter;
    sortConfig: SortConfig;
    filteredCount: number;
    onDateFilterChange: (filter: DateFilter) => void;
    onHistoryFilterChange: (filter: HistoryFilter) => void;
    onTypeFilterChange: (filter: TypeFilter) => void;
    onSort: (field: SortConfig['field']) => void;
    onSetPredefinedPeriod: (period: string) => void;
}

export const HistoryFilters: React.FC<HistoryFiltersProps> = ({
                                                                  dateFilter,
                                                                  historyFilter,
                                                                  typeFilter,
                                                                  sortConfig,
                                                                  filteredCount,
                                                                  onDateFilterChange,
                                                                  onHistoryFilterChange,
                                                                  onTypeFilterChange,
                                                                  onSort,
                                                                  onSetPredefinedPeriod
                                                              }) => {
    return (
        <>
            {/* Filtry daty */}
            <Card sx={{mb: 3, p: 2}}>
                <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                    <DateRange sx={{mr: 1, verticalAlign: 'middle'}}/>
                    Filtruj historię rozliczeń
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <ToggleButtonGroup
                            value={dateFilter.period}
                            exclusive
                            onChange={(_, value) => value && onSetPredefinedPeriod(value)}
                            size="small"
                            fullWidth
                        >
                            <ToggleButton value="all">Całość</ToggleButton>
                            <ToggleButton value="week">Tydzień</ToggleButton>
                            <ToggleButton value="month">Miesiąc</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Data od"
                            value={dateFilter.startDate}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    startDate: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Data do"
                            value={dateFilter.endDate}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    endDate: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                            {filteredCount} rozliczeń
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            {/* Dodatkowe filtry i sortowanie */}
            <Card sx={{mb: 3, p: 2}}>
                <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                    <FilterList sx={{mr: 1, verticalAlign: 'middle'}}/>
                    Filtry i sortowanie
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={2.5}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Szukaj w historii..."
                            value={historyFilter.searchTerm}
                            onChange={(e) => {
                                onHistoryFilterChange({
                                    ...historyFilter,
                                    searchTerm: e.target.value
                                });
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={2.5}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Typ akcji</InputLabel>
                            <Select
                                value={historyFilter.action}
                                label="Typ akcji"
                                onChange={(e) => {
                                    onHistoryFilterChange({
                                        ...historyFilter,
                                        action: e.target.value as any
                                    });
                                }}
                            >
                                <MenuItem value="all">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <History sx={{mr: 1, fontSize: '1rem'}}/>
                                        Wszystkie akcje
                                    </Box>
                                </MenuItem>
                                <MenuItem value="settled">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <CheckCircle sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                        Rozliczono
                                    </Box>
                                </MenuItem>
                                <MenuItem value="created">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Add sx={{mr: 1, fontSize: '1rem', color: '#007bff'}}/>
                                        Utworzono
                                    </Box>
                                </MenuItem>
                                <MenuItem value="modified">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <SwapHoriz sx={{mr: 1, fontSize: '1rem', color: '#ffc107'}}/>
                                        Zmodyfikowano
                                    </Box>
                                </MenuItem>
                                <MenuItem value="cancelled">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Close sx={{mr: 1, fontSize: '1rem', color: '#dc3545'}}/>
                                        Anulowano
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2.5}>
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

                    <Grid item xs={12} md={2.5}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sortuj według</InputLabel>
                            <Select
                                value={sortConfig.field}
                                label="Sortuj według"
                                onChange={(e) => onSort(e.target.value as SortConfig['field'])}
                            >
                                <MenuItem value="timestamp">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                        Data
                                    </Box>
                                </MenuItem>
                                <MenuItem value="performedBy">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                        Użytkownik
                                    </Box>
                                </MenuItem>
                                <MenuItem value="amount">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                        Kwota
                                    </Box>
                                </MenuItem>
                                <MenuItem value="from">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                        Od użytkownika
                                    </Box>
                                </MenuItem>
                                <MenuItem value="to">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                        Do użytkownika
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column'}}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => onSort(sortConfig.field)}
                                startIcon={
                                    sortConfig.direction === 'asc' ?
                                        <ArrowUpward sx={{fontSize: '1rem'}}/> :
                                        <ArrowDownward sx={{fontSize: '1rem'}}/>
                                }
                                sx={{
                                    borderColor: '#28a745',
                                    color: '#28a745',
                                    '&:hover': {backgroundColor: '#e8f5e8'},
                                    width: '100%'
                                }}
                            >
                                {sortConfig.direction === 'asc' ? 'Rosnąco' : 'Malejąco'}
                            </Button>
                            <Typography variant="body2" color="primary" sx={{fontWeight: 600, textAlign: 'center'}}>
                                {filteredCount} wyników
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};
