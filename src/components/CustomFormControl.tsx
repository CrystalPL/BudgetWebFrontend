import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {FormHelperText, Typography} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";

export interface CustomFormControlProps {
    valueState: [any, React.Dispatch<React.SetStateAction<any>>];
    errorState: [string, React.Dispatch<React.SetStateAction<string>>];
    label: string
    name: string
    validateFunction: () => string
    endAdornment?: React.ReactNode
    type?: string;
    required?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
}

export function CustomFormControl(props: CustomFormControlProps) {
    const [value, setValue] = props.valueState;
    const [error, setError] = props.errorState;

    const validate = () => {
        const validate: string = props.validateFunction()
        if (!validate) {
            return;
        }

        setError(validate)
    }

    return <FormControl fullWidth required={props.required ?? true} error={!!error}>
        <InputLabel
            sx={{
                fontSize: '16px',
                '&.Mui-focused, &.MuiInputLabel-shrink': {
                    fontSize: '22px',
                },
            }}
        >{props.label}</InputLabel>
        <OutlinedInput
            label={<Typography>{props.label} + {""}</Typography>}
            name={props.name}
            value={value}
            multiline={props.multiline ?? false}
            minRows={props.minRows ?? 1}
            maxRows={props.maxRows ?? 1}
            onChange={(e) => setValue(e.target.value)}
            onBlur={validate}
            onFocus={() => setError('')}
            endAdornment={props.endAdornment}
        />
        <FormHelperText
            sx={{
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                visibility: error ? 'visible' : 'hidden',
            }}
        >
            <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
            {error}
        </FormHelperText>
    </FormControl>
}