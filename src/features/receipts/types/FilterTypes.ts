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
    // Nowe właściwości dla nawiasów i spojników
    logicalOperatorBefore?: LogicalOperator; // Operator przed tym warunkiem
    openParenthesis?: number; // Liczba nawiasów otwierających przed warunkiem
    closeParenthesis?: number; // Liczba nawiasów zamykających po warunku
}

export interface FilterGroup {
    id: string;
    conditions: FilterCondition[];
    logicalOperator: LogicalOperator; // AND/OR między warunkami w tej grupie
    // Nowa właściwość - operator przed tą grupą
    logicalOperatorBefore?: LogicalOperator; // Operator przed tą grupą (dla drugiej i kolejnych grup)
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
        if (savedFilter.groups.length === 1) {
            return evaluateGroupWithParentheses(item, savedFilter.groups[0]);
        }

        // Dla wielu grup, używamy operatorów logicznych przed każdą grupą
        const results: boolean[] = [];
        const operators: LogicalOperator[] = [];

        savedFilter.groups.forEach((group, index) => {
            const groupResult = evaluateGroupWithParentheses(item, group);
            results.push(groupResult);

            if (index > 0) {
                operators.push(group.logicalOperatorBefore || 'AND');
            }
        });

        // Ewaluuj wyrażenie z uwzględnieniem operatorów między grupami
        return evaluateLogicalExpressionForGroups(results, operators);
    });
};

// Funkcja do ewaluacji grupy z uwzględnieniem nawiasów i operatorów logicznych
const evaluateGroupWithParentheses = <T>(item: T, group: FilterGroup): boolean => {
    if (group.conditions.length === 0) return true;
    if (group.conditions.length === 1) {
        return evaluateCondition(item, group.conditions[0]);
    }

    // Dla wielu warunków, używamy operatorów logicznych przed każdym warunkiem
    const results: boolean[] = [];
    const operators: LogicalOperator[] = [];

    group.conditions.forEach((condition, index) => {
        const conditionResult = evaluateCondition(item, condition);
        results.push(conditionResult);

        if (index > 0) {
            operators.push(condition.logicalOperatorBefore || 'AND');
        }
    });

    // Ewaluuj wyrażenie z uwzględnieniem nawiasów i operatorów
    return evaluateLogicalExpression(results, operators, group.conditions);
};

// Funkcja do ewaluacji wyrażenia logicznego z nawiasami
const evaluateLogicalExpression = (results: boolean[], operators: LogicalOperator[], conditions: FilterCondition[]): boolean => {
    if (results.length === 1) return results[0];

    // Prosty algorytm - najpierw procesuj AND, potem OR
    let currentResults = [...results];
    let currentOperators = [...operators];

    // Przetwórz AND operations pierwszo (wyższy priorytet)
    let i = 0;
    while (i < currentOperators.length) {
        if (currentOperators[i] === 'AND') {
            const leftResult = currentResults[i];
            const rightResult = currentResults[i + 1];
            const combinedResult = leftResult && rightResult;

            currentResults.splice(i, 2, combinedResult);
            currentOperators.splice(i, 1);
        } else {
            i++;
        }
    }

    // Potem przetwórz OR operations
    i = 0;
    while (i < currentOperators.length) {
        if (currentOperators[i] === 'OR') {
            const leftResult = currentResults[i];
            const rightResult = currentResults[i + 1];
            const combinedResult = leftResult || rightResult;

            currentResults.splice(i, 2, combinedResult);
            currentOperators.splice(i, 1);
        } else {
            i++;
        }
    }

    return currentResults[0] || false;
};

// Funkcja do ewaluacji wyrażenia logicznego między grupami
const evaluateLogicalExpressionForGroups = (results: boolean[], operators: LogicalOperator[]): boolean => {
    if (results.length === 1) return results[0];

    // Prosty algorytm - najpierw procesuj AND, potem OR
    let currentResults = [...results];
    let currentOperators = [...operators];

    // Przetwórz AND operations pierwszo (wyższy priorytet)
    let i = 0;
    while (i < currentOperators.length) {
        if (currentOperators[i] === 'AND') {
            const leftResult = currentResults[i];
            const rightResult = currentResults[i + 1];
            const combinedResult = leftResult && rightResult;

            currentResults.splice(i, 2, combinedResult);
            currentOperators.splice(i, 1);
        } else {
            i++;
        }
    }

    // Potem przetwórz OR operations
    i = 0;
    while (i < currentOperators.length) {
        if (currentOperators[i] === 'OR') {
            const leftResult = currentResults[i];
            const rightResult = currentResults[i + 1];
            const combinedResult = leftResult || rightResult;

            currentResults.splice(i, 2, combinedResult);
            currentOperators.splice(i, 1);
        } else {
            i++;
        }
    }

    return currentResults[0] || false;
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
