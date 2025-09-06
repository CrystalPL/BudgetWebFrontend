import {StateProp, useStateProp} from "../../StateProp";
import {CustomFormControlProps} from "../../../components/CustomFormControl";

export interface FieldProps {
    formControlProps: CustomFormControlProps
    stateProp: StateProp<string>
    errorStateProp: StateProp<string>
}

export function useFieldProps(
    label: string,
    name: string,
    validate: (value: string) => string,
    defaultValue: string
): FieldProps {
    const stateProp: StateProp<string> = useStateProp<string>(defaultValue);
    const errorStateProp: StateProp<string> = useStateProp<string>('');

    const formControlProps: CustomFormControlProps = {
        valueState: [stateProp.value, stateProp.setValue],
        errorState: [errorStateProp.value, errorStateProp.setValue],
        label,
        name,
        validateFunction: () => validate(stateProp.value)
    };

    return {formControlProps, stateProp, errorStateProp};
}