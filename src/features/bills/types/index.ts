export interface BillFilter {
    searchTerm: string;
    billType: 'all' | number; // 'all' lub ID typu rachunku
    status: 'all' | 'paid' | 'unpaid';
    whoPaid: 'all' | number; // 'all' lub ID użytkownika
    period: string; // pusty string oznacza 'all'
}

export interface BillDateFilter {
    dueDateFrom: string;
    dueDateTo: string;
    paymentDateFrom: string;
    paymentDateTo: string;
    period: 'all' | 'week' | 'month' | 'year' | 'custom';
}

export interface BillSortConfig {
    field: 'dueDate' | 'paymentDate' | 'amount' | 'billType' | 'whoPaid' | 'period';
    direction: 'asc' | 'desc';
}
