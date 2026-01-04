import {AutocompleteItem} from "@/filter/advanced/filter-editor/condition-line/components/RenderInput";
import {StateProp} from "@/filter/StateProp";
import {ColumnDataType, FilterOperator} from "@/filter/FilterModel";

export type LogicalOperator = 'AND' | 'OR';

export const logicalOperators: Record<LogicalOperator, string> = {
    AND: 'i',
    OR: 'lub'
};

export type AdvancedFilterEntityType = 'RECEIPT';

export interface AdvancedFilter {
    id: number
    name: string
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    totalConditions: number
    totalGroups: number
}

export interface SaveFilterRequest {
    id: number | null,
    name: string
    description: string
    advancedFilterEntityType: AdvancedFilterEntityType
}

export interface SaveFilterConditionRequest {
    advancedFilterId: number
    conditionGroups: SaveConditionGroupRequest[]
}

export interface SaveConditionGroupRequest {
    conditionGroupId: number
    logicalOperatorBefore: LogicalOperator
    conditions: SaveConditionRequest[]
}

export interface SaveConditionRequest {
    conditionId: number
    fieldName: string
    firstValue: string | number | boolean | null;
    secondValue?: string | number | boolean | null;
    openParenthesisNumber?: number;
    closeParenthesisNumber?: number;
    logicalOperatorBefore: LogicalOperator | null
    operator: FilterOperator
}

export interface DuplicateFilterRequest {
    id: number
    name: string
}

export interface BooleanValue {
    label: string
    value: boolean
}

export interface AdvancedField<T> {
    columnDataType: ColumnDataType
    columnName: string
    columnLabel: string
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => AutocompleteItem<T>
    availableBooleanOptions?: BooleanValue[]
}

export interface Condition {
    id: number
    field: AdvancedField<any>
    firstValue: string | number | boolean | null;
    secondValue?: string | number | boolean | null;
    openParenthesis?: number;
    closeParenthesis?: number;
    logicalOperatorBefore?: LogicalOperator
    operator: FilterOperator
}

export interface ConditionGroup {
    id: number
    logicalOperatorBefore: LogicalOperator
    conditions: Condition[]
}

export interface RenderConditionLineProps {
    condition: Condition
    fields: AdvancedField<any>[]
    conditionGroupIndex: number
    conditionIndex: number
    conditionGroupsState: StateProp<ConditionGroup[]>
    loading: boolean
    functionToLoadItems: () => void
    items: AutocompleteItem<any>[]
}