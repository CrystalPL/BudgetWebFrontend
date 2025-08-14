import React from "react";
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Switch,
    Typography
} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";
import DateChooserComponent from "../DateChooserComponent";
import {CreateReceiptDetails, Receipt, ShopOccurrence} from "../../api/ReceiptModel";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FirstStepFormState} from "./FirstStepFormState";
import {sort} from "../../../../util/SortUtil";

interface FirstStepFormContentProps {
    createReceiptDetails: CreateReceiptDetails | null
    editedReceipt: Receipt | null;
    firstStepFormState: FirstStepFormState;
}

export default function FirstStepFormContent(props: FirstStepFormContentProps) {
    const sortedShopNames = sort<ShopOccurrence>('desc', props.createReceiptDetails?.shopOccurrences || [], field => field.occurrence)

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, sm: 6}} mt={2}>
                <Autocomplete
                    freeSolo
                    forcePopupIcon
                    onFocus={() => props.firstStepFormState.setShopNameError('')}
                    value={props.firstStepFormState.shopName}
                    options={sortedShopNames}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.shopName}
                    onInputChange={(_, newValue) => props.firstStepFormState.setShopName(newValue)}
                    renderInput={(params) => (
                        <FormControl fullWidth error={props.firstStepFormState.shopNameError !== ''}>
                            <InputLabel
                                sx={{
                                    fontSize: '16px',
                                    '&.Mui-focused, &.MuiInputLabel-shrink': {
                                        fontSize: '22px',
                                    },
                                }}
                            >
                                Nazwa sklepu
                            </InputLabel>
                            <OutlinedInput
                                {...params.InputProps}
                                inputProps={params.inputProps}
                                label={<Typography>Nazwa sklepu + {""}</Typography>}
                            />
                            <FormHelperText
                                sx={{
                                    color: 'red',
                                    display: 'flex',
                                    alignItems: 'center',
                                    visibility: props.firstStepFormState.shopNameError ? 'visible' : 'hidden',
                                }}
                            >
                                <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                {props.firstStepFormState.shopNameError}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{xs: 12, sm: 6}} mt={2}>
                <Autocomplete
                    options={props.createReceiptDetails?.whoPaidLists || []}
                    value={props.firstStepFormState.whoPaid}
                    onFocus={() => props.firstStepFormState.setWhoPaidError('')}
                    getOptionLabel={(option) => option.userName}
                    onChange={(_, newValue) => props.firstStepFormState.setWhoPaid(newValue)}
                    renderInput={(params) => (
                        <FormControl fullWidth error={props.firstStepFormState.whoPaidError !== ''}>
                            <InputLabel
                                sx={{
                                    fontSize: '16px',
                                    '&.Mui-focused, &.MuiInputLabel-shrink': {
                                        fontSize: '22px',
                                    },
                                }}
                            >
                                Kto płacił
                            </InputLabel>
                            <OutlinedInput
                                {...params.InputProps}
                                inputProps={params.inputProps}
                                label={<Typography>Kto płacił + {""}</Typography>}
                            />
                            <FormHelperText
                                sx={{
                                    color: 'red',
                                    display: 'flex',
                                    alignItems: 'center',
                                    visibility: props.firstStepFormState.whoPaidError ? 'visible' : 'hidden',
                                }}
                            >
                                <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
                                {props.firstStepFormState.whoPaidError}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{xs: 12, sm: 6}} mt={2}>
                <DateChooserComponent
                    date={props.firstStepFormState.date}
                    setDate={props.firstStepFormState.setDate}
                />
            </Grid>
            <Grid size={{xs: 12, sm: 6}} mt={2}>
                <FormControlLabel
                    control={
                        <Switch checked={props.firstStepFormState.isSettled || false}
                                onChange={event => props.firstStepFormState.setIsSettled(event.target.checked)}/>
                    }
                    label="Paragon opłacony?"
                />
            </Grid>
        </Grid>
    );
}