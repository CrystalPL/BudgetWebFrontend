import {Box, TableCell, TableSortLabel, Tooltip, Typography} from "@mui/material";
import * as React from "react";

interface TableColumnProps {
    columnName: String
    orderType: 'asc' | 'desc'
    setOrderType: (orderType: 'asc' | 'desc') => void
    setOrderBy: () => void
}

export default function TableColumn({columnName, orderType, setOrderType, setOrderBy}: TableColumnProps) {
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
            </Box>
        </TableCell>
    )
}