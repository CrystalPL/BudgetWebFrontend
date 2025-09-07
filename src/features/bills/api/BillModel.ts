import {BillType} from "@/features/bills2/api/BillModel";

export interface UserWhoPaid {
    userId: number;
    userName: string;
}

export interface CreateBillDetails {
    billTypes: BillType[];
    whoPaidLists: UserWhoPaid[];
}

export interface CreateBillRequest {
    billTypeId: number;
    amount: number;
    usage?: number; // zużycie mediów
    dueDate: Date;
    paymentDate?: Date; // zmieniono z Date na Date | undefined
    period: string;
    description?: string;
    whoPaidId: number;
    isPaid: boolean;
}

export interface UpdateBillRequest extends CreateBillRequest {
    id: number;
}

// Predefiniowane typy rachunków
export const DEFAULT_BILL_TYPES: BillType[] = [
    {id: 1, name: 'Prąd', icon: '⚡', unit: 'kWh'},
    {id: 2, name: 'Gaz', icon: '🔥', unit: 'm³'},
    {id: 3, name: 'Woda', icon: '💧', unit: 'm³'},
    {id: 4, name: 'Internet', icon: '🌐', unit: 'GB'},
    {id: 5, name: 'Telefon', icon: '📱', unit: 'min'},
    {id: 6, name: 'Ogrzewanie', icon: '🏠', unit: 'kWh'},
    {id: 7, name: 'Śmieci', icon: '🗑️'}, // bez jednostki
    {id: 8, name: 'Ubezpieczenie', icon: '🛡️'}, // bez jednostki
    {id: 9, name: 'Inne', icon: '📄'} // bez jednostki
];
