import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {FormHelperText} from "@mui/material";
import {ErrorOutline} from "@mui/icons-material";

export interface CustomFormControlProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>];
    errorState: [string, React.Dispatch<React.SetStateAction<string>>];
    label: string
    name: string
    validateFunction: () => string
    endAdornment?: React.ReactNode
    type?: string;
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

    return <FormControl fullWidth required error={!!error}>
        <InputLabel>{props.label}</InputLabel>
        <OutlinedInput
            label={props.label}
            name={props.name}
            value={value}
            type={props.type}
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