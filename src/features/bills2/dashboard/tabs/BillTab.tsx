import React from 'react';
import {Card, TextField, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import {DateRange} from '@mui/icons-material';

export default function BillTab() {
    return (<>
        <DateFilters/>
    </>)
}

function DateFilters() {
    return (
        <Card sx={{mb: 3, p: 2}}>
            <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                <DateRange sx={{mr: 1, verticalAlign: 'middle'}}/>
                Filtruj rachunki według dat
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid size={{xs: 12, md: 4}}>
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

                <Grid size={{xs: 12, md: 2}}>
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

                <Grid size={{xs: 12, md: 2}}>
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

                <Grid size={{xs: 12, md: 2}}>
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

                <Grid size={{xs: 12, md: 2}}>
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
    )
}
