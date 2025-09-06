import {AutocompleteItem} from "@/filter/advanced/filter-editor/condition-line/components/RenderInput";
import {StateProp} from "@/filter/StateProp";
import {ColumnDataType, FilterOperator} from "@/filter/FilterModel";

export type LogicalOperator = 'AND' | 'OR';

export interface AdvancedFilter {
    id: number
    name: string
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    filter: ConditionGroup[]
}

export interface SaveFilterRequest {
    id: number,
    name: string
    description: string
}

export interface DuplicateFilterRequest {
    baseFilter: AdvancedFilter
    newName: string
}

export interface AdvancedField<T> {
    columnDataType: ColumnDataType
    columnName: string
    columnLabel: string
    functionToGetSelectItems?: () => Promise<T[]>
    functionToMapItem?: (item: T) => AutocompleteItem<T>
}

export interface Condition {
    id: number
    field: AdvancedField<any>
    value: string | number | boolean | null;
    value2?: string | number | boolean | null;
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
    fetchItemsByColumnName: (column: AdvancedField<any>) => AutocompleteItem<any>[]
}