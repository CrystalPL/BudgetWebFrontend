export interface Settlement {
    id: number;
    from: string;
    to: string;
    amount: string;
    reason: string;
    status: 'pending' | 'settled' | 'cancelled';
    type: 'bills' | 'receipts';
    receipts: any[];
    createdAt?: string;
    settledAt?: string;
    settledBy?: string;
}

export interface SettlementLog {
    id: number;
    settlementId: number;
    action: 'created' | 'settled' | 'cancelled' | 'modified';
    performedBy: string;
    timestamp: string;
    details: string;
    oldAmount?: string;
    newAmount?: string;
}

export interface DateFilter {
    startDate: string;
    endDate: string;
    period: 'all' | 'today' | 'week' | 'month' | 'year' | 'custom';
}

export interface UserFilter {
    type: 'all' | 'single' | 'between';
    singleUser?: string;
    userFrom?: string;
    userTo?: string;
}

export interface SortConfig {
    field: 'timestamp' | 'performedBy' | 'amount' | 'from' | 'to';
    direction: 'asc' | 'desc';
}

export interface HistoryFilter {
    action: 'all' | 'settled' | 'created' | 'modified' | 'cancelled';
    searchTerm: string;
}

export interface TypeFilter {
    type: 'all' | 'bills' | 'receipts';
}

export interface SettlementsStats {
    total: number;
    pending: number;
    settled: number;
    totalAmount: string;
    pendingAmount: string;
}
