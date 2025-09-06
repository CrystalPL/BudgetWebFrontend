import {DialogShowingController} from "../../controllers/DialogShowingController";
import {Box, Paper, Popover, Switch, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import {ColumnDataType, FilterValue, GetFilter} from "../FilterModel";
import {FilterMenuItemConfig, RenderInput} from "./FilterInputRendering";
import {RenderOperatorField} from "../OperatorFieldRendering";

export interface FilterDialogProps<T> {
    controller: DialogShowingController
    columnType: ColumnDataType;
    columnName: string
    anchorEl: HTMLElement | null;
    filterValue: FilterValue<T>
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => FilterMenuItemConfig
}

export default function FilterDialog<T>(props: FilterDialogProps<T>) {
    const temporaryValues: FilterValue<T> = GetFilter<T>();

    const clearValues = (filterValue: FilterValue<any>) => {
        filterValue.operatorProp.setValue(null)
        filterValue.activeProp.setValue(false)
        filterValue.valueTo.setValue(null)
        filterValue.valueFrom.setValue(null)
    }

    const closeDialogAndClearTempValues = () => {
        props.controller.closeDialog()
        clearValues(temporaryValues)
    }

    const closeDialogAndClearAllValues = () => {
        props.controller.closeDialog()
        clearValues(temporaryValues)
        clearValues(props.filterValue)
    }

    const applyTemporaryValues = () => {
        props.controller.closeDialog()
        props.filterValue.operatorProp.setValue(temporaryValues.operatorProp.value);
        props.filterValue.activeProp.setValue(temporaryValues.activeProp.value);
        props.filterValue.valueTo.setValue(temporaryValues.valueTo.value);
        props.filterValue.valueFrom.setValue(temporaryValues.valueFrom.value);
    }

    const [selectItems, setSelectItems] = useState<FilterMenuItemConfig[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (props.controller.openDialogStatus) {
            temporaryValues.operatorProp.setValue(props.filterValue.operatorProp.value);
            temporaryValues.activeProp.setValue(props.filterValue.activeProp.value);
            temporaryValues.valueTo.setValue(props.filterValue.valueTo.value);
            temporaryValues.valueFrom.setValue(props.filterValue.valueFrom.value);
        }

        if (props.controller.openDialogStatus || !props.functionToGetSelectItems || !props.functionToMapItem) {
            return;
        }

        const fetchItems = async () => {
            console.log("siema")
            setLoading(true);
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
                            checked={temporaryValues.activeProp.value}
                            onChange={(e) => temporaryValues.activeProp.setValue(e.target.checked)}
                            color="primary"
                            size="small"
                        />
                    }/>

                    <RenderOperatorField operator={temporaryValues.operatorProp.value}
                                         setOperator={temporaryValues.operatorProp.setValue}
                                         columnType={props.columnType}/>

                    <Box sx={{mt: 1}}>
                        <RenderInput fieldProps={temporaryValues.valueFrom} items={selectItems} loading={loading}
                                     columnType={props.columnType}/>
                        {temporaryValues.operatorProp.value === 'between' && (
                            <RenderInput fieldProps={temporaryValues.valueTo} items={selectItems} loading={loading}
                                         columnType={props.columnType}/>
                        )}
                    </Box>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1}}>
                    <Button onClick={closeDialogAndClearAllValues} color="error" size="small">
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