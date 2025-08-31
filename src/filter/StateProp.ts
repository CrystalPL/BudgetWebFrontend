import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export interface StateProp<T> {
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
}

export function useStateProp<T>(initialValue: T): StateProp<T>;
export function useStateProp<T>(): StateProp<T | null>;

export function useStateProp<T>(initialValue?: T) {
    const [value, setValue] = useState<T | null>(
        initialValue !== undefined ? initialValue : null
    );

    useEffect(() => {
        setValue(initialValue ?? null);
    }, [initialValue]);

    return {value, setValue};
}
