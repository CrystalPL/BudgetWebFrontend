import {CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as React from "react";
import {StateProp} from "../StateProp";
import DateChooserComponent from "../../features/receipts/components/DateChooserComponent";
import {ColumnDataType} from "../../features/receipts/types/FilterTypes";

export interface FilterMenuItemConfig {
    key: any
    value: any
    renderAs: any;
}

interface RenderInputProps {
    columnType: ColumnDataType
    fieldProps: StateProp<any>
    items: FilterMenuItemConfig[]
    loading: boolean
}

export function RenderInput(props: RenderInputProps) {
    switch (props.columnType) {
        case "text":
            return RenderTextField(props.fieldProps)
        case "number":
            return RenderTextField(props.fieldProps)
        case "date":
            return RenderDate(props.fieldProps)
        case "boolean":
            return RenderBoolean(props.fieldProps)
        case "autocomplete":
            return RenderAutocomplete(props.fieldProps, props.items, props.loading)
    }
}

function RenderDate(props: StateProp<Date | null>) {
    return (
        <DateChooserComponent
            date={props.value}
            setDate={date => props.setValue(date)}
        />
    )
}

function RenderAutocomplete(props: StateProp<any>, items: FilterMenuItemConfig[], loading: boolean) {
    return (
        <FormControl fullWidth size="small" sx={{mt: 1}}>
            <InputLabel>Użytkownik</InputLabel>
            <Select
                value={props.value}
                label="Użytkownik"
                onChange={(e) => props.setValue(e.target.value)}
                size="small"
                disabled={loading}
            >
                {loading ? (
                    <MenuItem disabled><CircularProgress size={20}/></MenuItem>
                ) : (
                    items.map((item) => (
                        <MenuItem key={item.key} value={item.value}>
                            {item.renderAs}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    )
}

function RenderTextField(props: StateProp<any>) {
    return (
        <TextField
            fullWidth
            label="Wartość"
            value={props.value ?? ''}
            onChange={(e) => props.setValue(e.target.value)}
            size="small"
            sx={{mt: 1}}
        />
    )
}

function RenderBoolean(props: StateProp<boolean>) {
    return (
        <FormControl fullWidth size="small" sx={{mt: 1}}>
            <InputLabel>Wartość</InputLabel>
            <Select
                value={props.value}
                label="Wartość"
                onChange={(e) => props.setValue(e.target.value as boolean)}
                size="small"
            >
                <MenuItem value="true">Tak</MenuItem>
                <MenuItem value="false">Nie</MenuItem>
            </Select>
        </FormControl>
    )
}