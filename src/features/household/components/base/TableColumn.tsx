import {Box, TableCell, TableSortLabel, Tooltip, Typography} from "@mui/material";
import * as React from "react";
import {useRef} from "react";
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import {FilterList} from "@mui/icons-material";
import {StateProp} from "../../../../filter/StateProp";
import {ColumnDataType, FilterValue} from "../../../../filter/FilterModel";
import {FilterMenuItemConfig} from "../../../../filter/basic/FilterInputRendering";
import FilterDialog from "../../../../filter/basic/FilterDialog";
import {BooleanValue} from "../../../../filter/advanced/api/AdvancedFilterModel";

export type OrderType = 'asc' | 'desc';

interface TableColumnProps<T> {
    columnName: string
    orderProps: StateProp<OrderType>
    setOrderBy: () => void
    tableFilterProps?: TableFilterProps<T>
    availableBooleanOptions?: BooleanValue[]
}

interface TableFilterProps<T> {
    columnType: ColumnDataType;
    filterValue: FilterValue<T>
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => FilterMenuItemConfig
}

export default function TableColumn<T>(props: TableColumnProps<T>) {
    const filterShowingController: DialogShowingController = GetShowingController();
    const filterIconRef = useRef<HTMLDivElement | null>(null);

    return (
        <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>
                    {props.columnName}
                </Typography>

                <Tooltip title={props.orderProps.value === 'asc' ? 'Sortuj malejąco' : 'Sortuj rosnąco'} arrow>
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
                            props.orderProps.setValue(props.orderProps.value === 'asc' ? 'desc' : 'asc')
                            props.setOrderBy()
                        }}
                    >
                        <TableSortLabel
                            active={true}
                            direction={props.orderProps.value}
                            sx={{padding: 0}}
                        >
                        </TableSortLabel>
                    </Box>
                </Tooltip>

                {props.tableFilterProps && (
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
                                bgcolor: props.tableFilterProps.filterValue.activeProp.value ? 'primary.light' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={filterShowingController.openDialog}
                        >
                            <FilterList sx={{
                                fontSize: '1.2rem',
                                color: props.tableFilterProps.filterValue.activeProp.value ? 'white' : 'inherit'
                            }}/>
                        </Box>
                    </Tooltip>
                )}
            </Box>

            {props.tableFilterProps && (
                <FilterDialog
                    controller={filterShowingController}
                    columnType={props.tableFilterProps.columnType}
                    columnName={props.columnName}
                    anchorEl={filterIconRef.current}
                    filterValue={props.tableFilterProps.filterValue}
                    availableBooleanOptions={props.availableBooleanOptions}
                />
            )}
        </TableCell>
    )
}