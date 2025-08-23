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
    ArrowDownward,
    ArrowUpward,
    Cancel,
    CheckCircle,
    DateRange,
    FilterList,
    MonetizationOn,
    Person,
    Receipt,
    Search
} from '@mui/icons-material';
import {BillDateFilter, BillFilter, BillSortConfig} from '../types';
import {BillType, UserWhoPaid} from '../api/BillModel';
import Grid from "@mui/material/Grid";

interface BillFiltersProps {
    dateFilter: BillDateFilter;
    billFilter: BillFilter;
    sortConfig: BillSortConfig;
    filteredCount: number;
    billTypes: BillType[];
    users: UserWhoPaid[];
    periods: string[];
    onDateFilterChange: (filter: BillDateFilter) => void;
    onBillFilterChange: (filter: BillFilter) => void;
    onSort: (field: BillSortConfig['field']) => void;
    onSetPredefinedPeriod: (period: string) => void;
}

export const BillFilters: React.FC<BillFiltersProps> = ({
                                                            dateFilter,
                                                            billFilter,
                                                            sortConfig,
                                                            filteredCount,
                                                            billTypes,
                                                            users,
                                                            periods,
                                                            onDateFilterChange,
                                                            onBillFilterChange,
                                                            onSort,
                                                            onSetPredefinedPeriod
                                                        }) => {
    return (
        <>
            {/* Filtry daty */}
            <Card sx={{mb: 3, p: 2}}>
                <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                    <DateRange sx={{mr: 1, verticalAlign: 'middle'}}/>
                    Filtruj rachunki według dat
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
                            <ToggleButton value="year">Rok</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Termin od"
                            value={dateFilter.dueDateFrom}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    dueDateFrom: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Termin do"
                            value={dateFilter.dueDateTo}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    dueDateTo: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Płatność od"
                            value={dateFilter.paymentDateFrom}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    paymentDateFrom: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Płatność do"
                            value={dateFilter.paymentDateTo}
                            onChange={(e) => {
                                onDateFilterChange({
                                    ...dateFilter,
                                    paymentDateTo: e.target.value,
                                    period: 'custom'
                                });
                            }}
                            InputLabelProps={{shrink: true}}
                        />
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
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Szukaj rachunków..."
                            value={billFilter.searchTerm}
                            onChange={(e) => {
                                onBillFilterChange({
                                    ...billFilter,
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

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Typ rachunku</InputLabel>
                            <Select
                                value={billFilter.billType}
                                label="Typ rachunku"
                                onChange={(e) => {
                                    onBillFilterChange({
                                        ...billFilter,
                                        billType: e.target.value as any
                                    });
                                }}
                            >
                                <MenuItem value="all">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Receipt sx={{mr: 1, fontSize: '1rem'}}/>
                                        Wszystkie typy
                                    </Box>
                                </MenuItem>
                                {billTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <span style={{marginRight: 8, fontSize: '1rem'}}>
                                                {type.icon || '📄'}
                                            </span>
                                            {type.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={billFilter.status}
                                label="Status"
                                onChange={(e) => {
                                    onBillFilterChange({
                                        ...billFilter,
                                        status: e.target.value as any
                                    });
                                }}
                            >
                                <MenuItem value="all">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                        Wszystkie
                                    </Box>
                                </MenuItem>
                                <MenuItem value="paid">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <CheckCircle sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                        Opłacone
                                    </Box>
                                </MenuItem>
                                <MenuItem value="unpaid">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Cancel sx={{mr: 1, fontSize: '1rem', color: '#dc3545'}}/>
                                        Nieopłacone
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Płacący</InputLabel>
                            <Select
                                value={billFilter.whoPaid}
                                label="Płacący"
                                onChange={(e) => {
                                    onBillFilterChange({
                                        ...billFilter,
                                        whoPaid: e.target.value as any
                                    });
                                }}
                            >
                                <MenuItem value="all">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                        Wszyscy użytkownicy
                                    </Box>
                                </MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.userId} value={user.userId}>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                            {user.userName}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Okres</InputLabel>
                            <Select
                                value={billFilter.period}
                                label="Okres"
                                onChange={(e) => {
                                    onBillFilterChange({
                                        ...billFilter,
                                        period: e.target.value as string
                                    });
                                }}
                            >
                                <MenuItem value="">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                        Wszystkie okresy
                                    </Box>
                                </MenuItem>
                                {periods.map((period) => (
                                    <MenuItem key={period} value={period}>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                            {period}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sortuj według</InputLabel>
                            <Select
                                value={sortConfig.field}
                                label="Sortuj według"
                                onChange={(e) => onSort(e.target.value as BillSortConfig['field'])}
                            >
                                <MenuItem value="dueDate">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                        Termin płatności
                                    </Box>
                                </MenuItem>
                                <MenuItem value="paymentDate">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                        Data płatności
                                    </Box>
                                </MenuItem>
                                <MenuItem value="amount">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <MonetizationOn sx={{mr: 1, fontSize: '1rem'}}/>
                                        Kwota
                                    </Box>
                                </MenuItem>
                                <MenuItem value="billType">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Receipt sx={{mr: 1, fontSize: '1rem'}}/>
                                        Typ rachunku
                                    </Box>
                                </MenuItem>
                                <MenuItem value="whoPaid">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                        Płacący
                                    </Box>
                                </MenuItem>
                                <MenuItem value="period">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                        Okres
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" sx={{mt: 1}}>
                    <Grid item xs={12} md={10}>
                        <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                            Znaleziono {filteredCount} rachunków
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
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
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};
