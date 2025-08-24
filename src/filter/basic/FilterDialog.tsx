import {DialogShowingController} from "../../controllers/DialogShowingController";
import {ColumnDataType, FilterOperator} from "../../features/receipts/types/FilterTypes";
import {Box, FormControl, InputLabel, MenuItem, Paper, Popover, Select, Switch, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import {filterForColumnType, FilterValue, GetFilter, operators} from "./FilterModel";
import {FilterMenuItemConfig, RenderInput} from "./FilterInputRendering";

export interface FilterDialogProps<T> {
    controller: DialogShowingController
    columnType: ColumnDataType;
    columnName: string
    anchorEl: HTMLElement | null;
    filterValue: FilterValue<T>
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => FilterMenuItemConfig
}

function GetOperatorMenuItems(columnType: ColumnDataType) {
    return filterForColumnType[columnType].map(filter => {
        return <MenuItem key={filter} value={filter}>{operators[filter]}</MenuItem>
    })
}

export default function FilterDialog<T>(props: FilterDialogProps<T>) {
    const temporaryValues: FilterValue<T> = GetFilter<T>();

    const clearValues = () => {
        props.filterValue.operatorProp.setValue(null)
        props.filterValue.activeProp.setValue(false)
        props.filterValue.valueTo.setValue(null)
        props.filterValue.valueFrom.setValue(null)
    }

    const closeDialogAndClearTempValues = () => {
        props.controller.closeDialog()
        clearValues()
    }

    const applyTemporaryValues = () => {
        props.filterValue.operatorProp.setValue(temporaryValues.operatorProp.value);
        props.filterValue.activeProp.setValue(temporaryValues.activeProp.value);
        props.filterValue.valueTo.setValue(temporaryValues.valueTo.value);
        props.filterValue.valueFrom.setValue(temporaryValues.valueFrom.value);
        console.log(props.filterValue)
        // closeDialogAndClearTempValues()
    }

    const [selectItems, setSelectItems] = useState<FilterMenuItemConfig[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (props.controller.openDialogStatus || !props.functionToGetSelectItems || !props.functionToMapItem) {
            return;
        }

        setLoading(true);
        const fetchItems = async () => {
            const items: T[] = await props.functionToGetSelectItems!();
            const mappedItems: FilterMenuItemConfig[] = items.map(item => props.functionToMapItem!(item))
            setSelectItems(mappedItems);
            setLoading(false)
        };
        fetchItems();
    }, [props.controller.openDialogStatus]);

    return (
        <Popover
            open={props.controller.openDialogStatus}
            anchorEl={props.anchorEl}
            onClose={closeDialogAndClearTempValues}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Paper sx={{p: 2, width: 300, maxHeight: 400, overflowY: 'auto'}}>
                <Typography variant="subtitle1" sx={{mb: 1, fontWeight: 'bold'}}>
                    Filtrowanie: {props.columnName}
                </Typography>

                <Box sx={{mt: 2}}>
                    <FormControlLabel label="Filtr aktywny" control={
                        <Switch
                            checked={props.filterValue.activeProp.value}
                            onChange={(e) => props.filterValue.activeProp.setValue(e.target.checked)}
                            color="primary"
                            size="small"
                        />
                    }/>

                    <FormControl fullWidth margin="dense" size="small">
                        <InputLabel>Operator</InputLabel>
                        <Select
                            value={props.filterValue.operatorProp.value || ''}
                            label="Operator"
                            onChange={(e) => props.filterValue.operatorProp.setValue(e.target.value as FilterOperator)}
                            size="small"
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                PaperProps: {
                                    style: {
                                        maxHeight: 200
                                    },
                                },
                            }}
                        >
                            {GetOperatorMenuItems(props.columnType)}
                        </Select>
                    </FormControl>

                    <Box sx={{mt: 1}}>
                        <RenderInput fieldProps={props.filterValue.valueFrom} items={selectItems} loading={loading}
                                     columnType={props.columnType}/>
                        {props.filterValue.operatorProp.value === 'between' && (
                            <RenderInput fieldProps={props.filterValue.valueTo} items={selectItems} loading={loading}
                                         columnType={props.columnType}/>
                        )}
                    </Box>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1}}>
                    <Button onClick={clearValues} color="error" size="small">
                        Wyczyść
                    </Button>
                    <Button onClick={closeDialogAndClearTempValues} size="small">
                        Zamknij
                    </Button>
                    <Button onClick={applyTemporaryValues} color="primary" variant="contained" size="small">
                        Zastosuj
                    </Button>
                </Box>
            </Paper>
        </Popover>
    );
}