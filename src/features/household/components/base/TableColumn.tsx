import {Box, TableCell, TableSortLabel, Tooltip, Typography} from "@mui/material";
import * as React from "react";
import {useRef, useState} from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import {FilterConfig, FilterType} from "../../../../receipts/types/FilterTypes";
import FilterDialog from "../../../receipts/components/FilterDialog";

interface TableColumnProps {
    columnName: String
    orderType: 'asc' | 'desc'
    setOrderType: (orderType: 'asc' | 'desc') => void
    setOrderBy: () => void
    columnType?: FilterType
    filterConfig?: FilterConfig
    onFilterChange?: (config: FilterConfig) => void
    fieldOptions?: {
        isUserField?: boolean;
    }
}

export default function TableColumn({
                                        columnName,
                                        orderType,
                                        setOrderType,
                                        setOrderBy,
                                        columnType = 'text',
                                        filterConfig,
                                        onFilterChange,
                                        fieldOptions
                                    }: TableColumnProps) {
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const filterIconRef = useRef<HTMLDivElement | null>(null);

    const handleOpenFilterDialog = () => {
        setFilterDialogOpen(true);
    };

    const handleCloseFilterDialog = () => {
        setFilterDialogOpen(false);
    };

    const handleApplyFilter = (config: FilterConfig) => {
        if (onFilterChange) {
            onFilterChange(config);
        }
    };

    return (
        <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>
                    {columnName}
                </Typography>

                <Tooltip title={orderType === 'asc' ? 'Sortuj malejąco' : 'Sortuj rosnąco'} arrow>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            marginLeft: '8px',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => {
                            setOrderType(orderType === 'asc' ? 'desc' : 'asc')
                            setOrderBy()
                        }}
                    >
                        <TableSortLabel
                            active={true}
                            direction={orderType}
                            sx={{padding: 0}}
                        >
                        </TableSortLabel>
                    </Box>
                </Tooltip>

                {onFilterChange && (
                    <Tooltip title="Filtruj" arrow>
                        <Box
                            ref={filterIconRef}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                marginLeft: '4px',
                                bgcolor: filterConfig?.active ? 'primary.light' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={handleOpenFilterDialog}
                        >
                            <FilterListIcon sx={{
                                fontSize: '1.2rem',
                                color: filterConfig?.active ? 'white' : 'inherit'
                            }}/>
                        </Box>
                    </Tooltip>
                )}
            </Box>

            {onFilterChange && (
                <FilterDialog
                    open={filterDialogOpen}
                    onClose={handleCloseFilterDialog}
                    columnType={columnType}
                    columnName={columnName.toString()}
                    onApplyFilter={handleApplyFilter}
                    currentFilter={filterConfig}
                    anchorEl={filterIconRef.current}
                    fieldOptions={fieldOptions}
                />
            )}
        </TableCell>
    )
}