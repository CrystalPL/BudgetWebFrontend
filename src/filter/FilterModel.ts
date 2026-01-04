import {StateProp, useStateProp} from "@/filter/StateProp";

export type FilterOperator =
    | 'CONTAINS'
    | 'NOT_CONTAINS'
    | 'EQUALS'
    | 'NOT_EQUALS'
    | 'STARTS_WITH'
    | 'ENDS_WITH'
    | 'GREATER_THAN'
    | 'LESS_THAN'
    | 'GREATER_THAN_OR_EQUAL'
    | 'LESS_THAN_OR_EQUAL'
    | 'BETWEEN'
    | 'BEFORE'
    | 'AFTER';

export const operators: Record<FilterOperator, string> = {
    CONTAINS: "Zawiera",
    NOT_CONTAINS: "Nie zawiera",
    EQUALS: "Równa się",
    NOT_EQUALS: "Nie równa się",
    STARTS_WITH: "Zaczyna się od",
    ENDS_WITH: "Kończy się na",
    GREATER_THAN: "Większe niż",
    LESS_THAN: "Mniejsze niż",
    GREATER_THAN_OR_EQUAL: "Większe lub równe",
    LESS_THAN_OR_EQUAL: "Mniejsze lub równe",
    BETWEEN: "Pomiędzy",
    BEFORE: "Przed",
    AFTER: "Po",
};

export type ColumnDataType = 'text' | 'number' | 'date' | 'boolean' | 'autocomplete';
export const filterForColumnType: Record<ColumnDataType, FilterOperator[]> = {
    text: [
        'CONTAINS',
        'NOT_CONTAINS',
        'EQUALS',
        'NOT_EQUALS',
        'STARTS_WITH',
        'ENDS_WITH'
    ],
    number: [
        'EQUALS',
        'NOT_EQUALS',
        'GREATER_THAN',
        'LESS_THAN',
        'GREATER_THAN_OR_EQUAL',
        'LESS_THAN_OR_EQUAL',
        'BETWEEN'
    ],
    date: [
        'EQUALS',
        'NOT_EQUALS',
        'BEFORE',
        'AFTER',
        'BETWEEN'
    ],
    boolean: [
        'EQUALS'
    ],
    autocomplete: [
        'NOT_EQUALS',
        'EQUALS',
    ]
};

export interface FilterValue<T> {
    operatorProp: StateProp<FilterOperator | null>
    activeProp: StateProp<boolean>
    valueTo: StateProp<T | null>
    valueFrom: StateProp<T | null>
}

export function GetFilter<T>(): FilterValue<T> {
    const operatorProp: StateProp<FilterOperator | null> = useStateProp<FilterOperator>();
    const activeProp: StateProp<boolean> = useStateProp<boolean>(false);
    const valueTo: StateProp<T | null> = useStateProp<T>();
    const valueFrom: StateProp<T | null> = useStateProp<T>();

    return {
        operatorProp,
        activeProp,
        valueTo,
        valueFrom
    }
}