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
                    return new Date(fieldValue) < new Date(filter.value);
                case 'after':
                    return new Date(fieldValue) > new Date(filter.value);
                default:
                    return true;
            }
        });
    });
};

// Helper function to get nested property values like "whoPaid.userName"
const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
};
