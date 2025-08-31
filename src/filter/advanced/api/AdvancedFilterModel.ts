import {RenderOperatorFieldProps} from "@/filter/OperatorFieldRendering";
import {LogicalOperator} from "@/features/receipts/types/FilterTypes";
import {AdvancedField} from "@/filter/advanced/conditions/AdvancedConditionsEditorContent";

export interface AdvancedFilter {
    //grupy warunków
    id: number
    name: string
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
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

export type ReceiptColumn = 'shop' | 'shoppingDate' | 'receiptAmount' | 'whoPaid' | 'settled'

export const exampleFilters: AdvancedFilter[] = [
    {
        id: 1,
        name: 'Oferty IT 10k+',
        description: 'Oferty w IT z wynagrodzeniem powyżej 10k',
        active: true,
        createdAt: new Date('2025-08-15T09:00:00Z'),
        updatedAt: new Date('2025-08-15T09:00:00Z'),
    },
    {
        id: 2,
        name: 'Tylko zdalne',
        description: '',
        active: false,
        createdAt: new Date('2025-08-10T12:30:00Z'),
        updatedAt: new Date('2025-08-18T14:45:00Z'),
    },
    {
        id: 3,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
    },
    {
        id: 4,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
    },
    {
        id: 5,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
    },
    {
        id: 6,
        name: 'Staże i praktyki',
        description: '',
        active: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
        updatedAt: new Date('2025-08-05T16:00:00Z'),
    },
];

export interface Condition extends RenderOperatorFieldProps {
    id: number
    field: AdvancedField<any>
    value: string | number | boolean | null;
    value2?: string | number | boolean | null;
    logicalOperatorBefore?: LogicalOperator
}

export interface ConditionGroup {
    conditions: Condition[]
}