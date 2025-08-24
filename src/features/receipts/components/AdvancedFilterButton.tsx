import React, { useState } from 'react';
import {
    Button,
    Chip,
    Box,
    Tooltip,
    Badge
} from '@mui/material';
import {
    FilterList as FilterListIcon,
    FilterListOff as FilterListOffIcon
} from '@mui/icons-material';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import AdvancedFilterManager from './AdvancedFilterManager';
import { FilterType } from '../types/FilterTypes';

interface AdvancedFilterButtonProps {
    availableColumns: Array<{
        name: string;
        type: FilterType;
        label: string;
        fieldOptions?: {
            isUserField?: boolean;
        };
    }>;
}

export default function AdvancedFilterButton({ availableColumns }: AdvancedFilterButtonProps) {
    const { state, getActiveFilter, setActiveFilter } = useAdvancedFilters();
    const [open, setOpen] = useState(false);

    const activeFilter = getActiveFilter();
    const hasActiveFilter = Boolean(activeFilter);

    const getTotalConditions = (filter: any) => {
        if (!filter) return 0;
        return filter.groups.reduce((sum: number, group: any) => sum + group.conditions.length, 0);
    };

    const handleDeactivateFilter = () => {
        setActiveFilter(undefined);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={hasActiveFilter ? `Aktywny filtr: ${activeFilter?.name}` : 'Zaawansowane filtry'}>
                <Badge
                    badgeContent={state.savedFilters.length}
                    color="primary"
                    invisible={state.savedFilters.length === 0}
                >
                    <Button
                        variant={hasActiveFilter ? 'contained' : 'outlined'}
                        startIcon={hasActiveFilter ? <FilterListIcon /> : <FilterListOffIcon />}
                        onClick={() => setOpen(true)}
                        size="small"
                        color={hasActiveFilter ? 'primary' : 'inherit'}
                    >
                        Filtry
                    </Button>
                </Badge>
            </Tooltip>

            {hasActiveFilter && activeFilter && (
                <Chip
                    label={`${activeFilter.name} (${getTotalConditions(activeFilter)})`}
                    color="primary"
                    size="small"
                    onDelete={handleDeactivateFilter}
                    sx={{ maxWidth: 200 }}
                />
            )}

            <AdvancedFilterManager
                open={open}
                onClose={() => setOpen(false)}
                availableColumns={availableColumns}
            />
        </Box>
    );
}
