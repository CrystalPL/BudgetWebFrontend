import DateChooserComponent from "../../../features/receipts/components/DateChooserComponent";
import * as React from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {ColumnDataType} from "@/features/receipts/types/FilterTypes";

interface RenderInputProps<T> {
    columnType: ColumnDataType
    loading: boolean
    value: T | null
    setValue: (value: T | null) => void
    items: AutocompleteItem<T>[]
}

export function RenderInput<T>(props: RenderInputProps<T>) {
    switch (props.columnType) {
        case "number":
        case "text":
            return RenderTextField(props.value, props.setValue);
        case "date":
            return RenderDate(props.value as Date, props.setValue as (newValue: Date | null) => void);
        case "boolean":
            return RenderBoolean(props.value as boolean, props.setValue as (newValue: boolean) => void)
        case "autocomplete":
            return RenderAutocomplete(props)
    }
}

function RenderDate(value: Date | null, setValue: (newValue: Date | null) => void) {
    return (
        <DateChooserComponent
            date={value}
            setDate={setValue}
            errorHandling={false}
        />
    )
}

function RenderTextField<T>(value: T, setValue: (newValue: T) => void) {
    return (
        <TextField
            fullWidth
            label="Wartość"
            value={value ?? ''}
            onChange={(event) => setValue(event.target.value as T)}
            size="small"
        />
    )
}

interface BooleanValue {
    label: string
    value: boolean
}

const availableBooleanOptions: BooleanValue[] = [
    {
        label: "Tak",
        value: true
    },
    {
        label: "Nie",
        value: false
    }
];

function RenderBoolean(value: boolean, setValue: (newValue: boolean) => void) {
    return (
        <Autocomplete
            disableClearable={true}
            options={availableBooleanOptions}
            getOptionLabel={(option) => option.label}
            value={value ? availableBooleanOptions[0] : availableBooleanOptions[1]}
            onChange={(_, newValue) => setValue(newValue.value)}
            renderInput={(params) => (
                <TextField {...params} label="Wartość" size="small" sx={{mt: 1}}/>
            )}
            size="small"
            fullWidth
        />
    );
}

export interface AutocompleteItem<T> {
    value: T
    renderAs: string
}

function RenderAutocomplete<T>(props: RenderInputProps<T>) {
    const selectedItem =
        props.items.find((item) => item.value === props.value);

    return (
        <Autocomplete
            disableClearable={true}
            options={props.items}
            getOptionLabel={(item) => item.renderAs}
            value={selectedItem}
            onChange={(_, newValue) => props.setValue(newValue.value)}
            loading={props.loading}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Wartość"
                    size="small"
                    sx={{mt: 1}}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {props.loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            fullWidth
            size="small"
            disabled={props.loading}
        />
    );
}