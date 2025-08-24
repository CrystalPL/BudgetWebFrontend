import {Dispatch, SetStateAction, useState} from 'react';

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
    return {value, setValue};
}