import {useState} from "react"

type ValidateFunction = () => string

interface CustomFormControlProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>]
    errorState: [string, React.Dispatch<React.SetStateAction<string>>]
    label: string
    name: string
    validateFunction: ValidateFunction
}

export function CreateFormField(
    label: string,
    name: string,
    validateFunction?: ValidateFunction
): {
    props: CustomFormControlProps
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
} {
    const [value, setValue] = useState("")
    const [error, setError] = useState("")

    return {
        props: {
            valueState: [value, setValue],
            errorState: [error, setError],
            label,
            name,
            validateFunction: validateFunction || (() => ""),
        },
        value,
        setValue,
        error,
        setError,
    }
}