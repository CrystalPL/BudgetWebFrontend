import DateChooserComponent from "../../../../../features/receipts/components/DateChooserComponent";
import * as React from "react";
import {Autocomplete, TextField} from "@mui/material";
import {AdvancedField, BooleanValue} from "@/filter/advanced/api/AdvancedFilterModel";

interface RenderInputProps<T> {
    field: AdvancedField<T>
    loading: boolean
    value: T | null
    setValue: (value: T | null) => void
    items: AutocompleteItem<T>[]
    functionToLoadItems: () => void
}

export function RenderInput<T>(props: RenderInputProps<T>) {
    switch (props.field.columnDataType) {
        case "number":
        case "text":
            return RenderTextField(props.value, props.setValue);
        case "date":
            return RenderDate(props.value as Date, props.setValue as (newValue: Date | null) => void);
        case "boolean":
            return RenderBoolean(props.field.availableBooleanOptions ?? [], props.value as boolean, props.setValue as (newValue: boolean) => void)
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

function RenderBoolean(availableBooleanOptions: BooleanValue[], value: boolean, setValue: (newValue: boolean) => void) {
    return (
        <Autocomplete
            disableClearable={true}
            options={availableBooleanOptions}
            getOptionLabel={(option) => option.label}
            value={value ? availableBooleanOptions[0] : availableBooleanOptions[1]}
            onChange={(_, newValue) => setValue(newValue.value)}
            renderInput={(params) => (
                <TextField {...params} sx={{width: '160px'}} label="Wartość" size="small"/>
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
            onFocus={props.functionToLoadItems}
            clearIcon={false}
            options={props.items}
            getOptionLabel={(item) => item.renderAs}
            value={selectedItem ?? null}
            onChange={(_, newValue) => props.setValue(newValue?.value || null)}
            loading={props.loading}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{
                        width: '160px',
                    }}
                    label="Wartość"
                    size="small"
                />
            )}
            fullWidth
            size="small"
        />
    );
}