export type FilterType = 'text' | 'number' | 'date' | 'boolean';

export type FilterOperator =
    | 'contains'
    | 'notContains'
    | 'equals'
    | 'notEquals'
    | 'startsWith'
    | 'endsWith'
    | 'greaterThan'
    | 'lessThan'
    | 'greaterThanOrEqual'
    | 'lessThanOrEqual'
    | 'between'
    | 'before'
    | 'after';

export type LogicalOperator = 'AND' | 'OR';

export interface FilterConfig {
    columnName: string;
    columnType: FilterType;
    operator: FilterOperator;
    value: string | number | boolean;
    value2?: string | number | boolean;
    active: boolean;
}

export interface ColumnFilter {
    fieldName: string;
    fieldType: FilterType;
    filter?: FilterConfig;
}

// Nowe typy dla zaawansowanych filtrów
export interface FilterCondition {
    id: string;
    columnName: string;
    columnType: FilterType;
    operator: FilterOperator;
    value: string | number | boolean;
    value2?: string | number | boolean;
    fieldOptions?: {
        isUserField?: boolean;
    };
}

export interface FilterGroup {
    id: string;
    conditions: FilterCondition[];
    logicalOperator: LogicalOperator; // AND/OR między warunkami w tej grupie
}

export interface SavedFilter {
    id: string;
    name: string;
    description?: string;
    groups: FilterGroup[];
    groupLogicalOperator: LogicalOperator; // AND/OR między grupami
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FilterBuilderState {
    savedFilters: SavedFilter[];
    activeFilterId?: string;
    currentFilter?: SavedFilter;
}

export const applyFilter = <T>(items: T[], filters: FilterConfig[]): T[] => {
    if (!filters || filters.length === 0 || !filters.some(f => f.active)) {
        return items;
    }

    return items.filter(item => {
        // Item passes if it passes ALL active filters
        return filters.every(filter => {
            if (!filter.active) return true;

            const fieldValue = getNestedValue(item, filter.columnName);

            switch (filter.operator) {
                case 'contains':
                    return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
                case 'notContains':
                    return !String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
                case 'equals':
                    if (filter.columnType === 'boolean') {
                        return fieldValue === (filter.value === 'true');
                    }
                    return String(fieldValue).toLowerCase() === String(filter.value).toLowerCase();
                case 'notEquals':
                    return String(fieldValue).toLowerCase() !== String(filter.value).toLowerCase();
                case 'startsWith':
                    return String(fieldValue).toLowerCase().startsWith(String(filter.value).toLowerCase());
                case 'endsWith':
                    return String(fieldValue).toLowerCase().endsWith(String(filter.value).toLowerCase());
                case 'greaterThan':
                    return Number(fieldValue) > Number(filter.value);
                case 'lessThan':
                    return Number(fieldValue) < Number(filter.value);
                case 'greaterThanOrEqual':
                    return Number(fieldValue) >= Number(filter.value);
                case 'lessThanOrEqual':
                    return Number(fieldValue) <= Number(filter.value);
                case 'between':
                    return Number(fieldValue) >= Number(filter.value) &&
                        Number(fieldValue) <= Number(filter.value2);
                case 'before':
                    return new Date(String(fieldValue)) < new Date(String(filter.value));
                case 'after':
                    return new Date(String(fieldValue)) > new Date(String(filter.value));
                default:
                    return true;
            }
        });
    });
};

// Nowa funkcja do stosowania zaawansowanych filtrów
export const applyAdvancedFilter = <T>(items: T[], savedFilter: SavedFilter): T[] => {
    if (!savedFilter || !savedFilter.active || savedFilter.groups.length === 0) {
        return items;
    }

    return items.filter(item => {
        // Sprawdź każdą grupę
        const groupResults = savedFilter.groups.map(group => {
            // W ramach grupy sprawdź każdy warunek
            const conditionResults = group.conditions.map(condition => {
                return evaluateCondition(item, condition);
            });

            // Połącz wyniki warunków w grupie operatorem logicznym grupy
            if (group.logicalOperator === 'AND') {
                return conditionResults.every(result => result);
            } else {
                return conditionResults.some(result => result);
            }
        });

        // Połącz wyniki grup operatorem logicznym między grupami
        if (savedFilter.groupLogicalOperator === 'AND') {
            return groupResults.every(result => result);
        } else {
            return groupResults.some(result => result);
        }
    });
};

const evaluateCondition = <T>(item: T, condition: FilterCondition): boolean => {
    const fieldValue = getNestedValue(item, condition.columnName);

    switch (condition.operator) {
        case 'contains':
            return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'notContains':
            return !String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'equals':
            if (condition.columnType === 'boolean') {
                return fieldValue === (condition.value === 'true');
            }
            return String(fieldValue).toLowerCase() === String(condition.value).toLowerCase();
        case 'notEquals':
            return String(fieldValue).toLowerCase() !== String(condition.value).toLowerCase();
        case 'startsWith':
            return String(fieldValue).toLowerCase().startsWith(String(condition.value).toLowerCase());
        case 'endsWith':
            return String(fieldValue).toLowerCase().endsWith(String(condition.value).toLowerCase());
        case 'greaterThan':
            return Number(fieldValue) > Number(condition.value);
        case 'lessThan':
            return Number(fieldValue) < Number(condition.value);
        case 'greaterThanOrEqual':
            return Number(fieldValue) >= Number(condition.value);
        case 'lessThanOrEqual':
            return Number(fieldValue) <= Number(condition.value);
        case 'between':
            return Number(fieldValue) >= Number(condition.value) &&
                Number(fieldValue) <= Number(condition.value2);
        case 'before':
            return new Date(String(fieldValue)) < new Date(String(condition.value));
        case 'after':
            return new Date(String(fieldValue)) > new Date(String(condition.value));
        default:
            return true;
    }
};

// Helper function to get nested property values like "whoPaid.userName"
const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
};
