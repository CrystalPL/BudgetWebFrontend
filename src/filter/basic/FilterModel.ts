import {ColumnDataType, FilterOperator} from "@/features/receipts/types/FilterTypes";
import {StateProp, useStateProp} from "@/filter/StateProp";

export const operators: Record<FilterOperator, string> = {
    contains: "Zawiera",
    notContains: "Nie zawiera",
    equals: "Równa się",
    notEquals: "Nie równa się",
    startsWith: "Zaczyna się od",
    endsWith: "Kończy się na",
    greaterThan: "Większe niż",
    lessThan: "Mniejsze niż",
    greaterThanOrEqual: "Większe lub równe",
    lessThanOrEqual: "Mniejsze lub równe",
    between: "Pomiędzy",
    before: "Przed",
    after: "Po",
};

export const filterForColumnType: Record<ColumnDataType, FilterOperator[]> = {
    text: [
        'contains',
        'notContains',
        'equals',
        'notEquals',
        'startsWith',
        'endsWith'
    ],
    number: [
        'equals',
        'notEquals',
        'greaterThan',
        'lessThan',
        'greaterThanOrEqual',
        'lessThanOrEqual',
        'between'
    ],
    date: [
        'equals',
        'notEquals',
        'before',
        'after',
        'between'
    ],
    boolean: [
        'equals'
    ],
    autocomplete: [
        'notEquals',
        'equals',
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