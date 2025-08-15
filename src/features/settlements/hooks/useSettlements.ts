import {useEffect, useState} from 'react';
import {DateFilter, HistoryFilter, Settlement, SettlementLog, SortConfig, TypeFilter, UserFilter} from '../types';

interface UseSettlementsProps {
    initialSettlements: Settlement[];
    initialLogs: SettlementLog[];
}

export const useSettlements = ({initialSettlements, initialLogs}: UseSettlementsProps) => {
    const [settlements, setSettlements] = useState<Settlement[]>(initialSettlements);
    const [logs, setLogs] = useState<SettlementLog[]>(initialLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Filtry dla głównego interfejsu
    const [mainUserFilter, setMainUserFilter] = useState<UserFilter>({type: 'all'});
    const [typeFilter, setTypeFilter] = useState<TypeFilter>({type: 'all'});

    // Filtry dla historii
    const [dateFilter, setDateFilter] = useState<DateFilter>({
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        period: 'month'
    });
    const [historyFilter, setHistoryFilter] = useState<HistoryFilter>({
        action: 'all',
        searchTerm: ''
    });
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: 'timestamp',
        direction: 'desc'
    });

    // Stronicowanie
    const [settlementsPage, setSettlementsPage] = useState(1);
    const [logsPage, setLogsPage] = useState(1);
    const settlementsPerPage = 5;
    const logsPerPage = 10;

    // Filtrowanie rozliczeń
    const filteredSettlements = settlements.filter(settlement => {
        const matchesSearch =
            settlement.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            settlement.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            settlement.reason.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || settlement.status === statusFilter;

        let matchesUserFilter = true;
        if (mainUserFilter.type === 'single' && mainUserFilter.singleUser) {
            matchesUserFilter = settlement.from === mainUserFilter.singleUser || settlement.to === mainUserFilter.singleUser;
        } else if (mainUserFilter.type === 'between' && mainUserFilter.userFrom && mainUserFilter.userTo) {
            matchesUserFilter =
                (settlement.from === mainUserFilter.userFrom && settlement.to === mainUserFilter.userTo) ||
                (settlement.from === mainUserFilter.userTo && settlement.to === mainUserFilter.userFrom);
        }

        const matchesTypeFilter = typeFilter.type === 'all' || settlement.type === typeFilter.type;

        return matchesSearch && matchesStatus && matchesUserFilter && matchesTypeFilter;
    });

    // Filtrowanie logów
    const getFilteredLogs = () => {
        let filteredLogs = logs;

        if (historyFilter.action !== 'all') {
            filteredLogs = filteredLogs.filter(log => log.action === historyFilter.action);
        }

        if (historyFilter.searchTerm) {
            const searchLower = historyFilter.searchTerm.toLowerCase();
            filteredLogs = filteredLogs.filter(log => {
                const settlement = settlements.find(s => s.id === log.settlementId);
                return (
                    log.performedBy.toLowerCase().includes(searchLower) ||
                    log.details.toLowerCase().includes(searchLower) ||
                    settlement?.from.toLowerCase().includes(searchLower) ||
                    settlement?.to.toLowerCase().includes(searchLower) ||
                    settlement?.reason.toLowerCase().includes(searchLower)
                );
            });
        }

        if (mainUserFilter.type === 'single' && mainUserFilter.singleUser) {
            filteredLogs = filteredLogs.filter(log => {
                const settlement = settlements.find(s => s.id === log.settlementId);
                return settlement && (settlement.from === mainUserFilter.singleUser || settlement.to === mainUserFilter.singleUser);
            });
        } else if (mainUserFilter.type === 'between' && mainUserFilter.userFrom && mainUserFilter.userTo) {
            filteredLogs = filteredLogs.filter(log => {
                const settlement = settlements.find(s => s.id === log.settlementId);
                return settlement && (
                    (settlement.from === mainUserFilter.userFrom && settlement.to === mainUserFilter.userTo) ||
                    (settlement.from === mainUserFilter.userTo && settlement.to === mainUserFilter.userFrom)
                );
            });
        }

        if (typeFilter.type !== 'all') {
            filteredLogs = filteredLogs.filter(log => {
                const settlement = settlements.find(s => s.id === log.settlementId);
                return settlement && settlement.type === typeFilter.type;
            });
        }

        if (dateFilter.period !== 'all') {
            filteredLogs = filteredLogs.filter(log => {
                const logDate = new Date(log.timestamp);
                const startDate = new Date(dateFilter.startDate);
                const endDate = new Date(dateFilter.endDate);
                endDate.setHours(23, 59, 59, 999);

                return logDate >= startDate && logDate <= endDate;
            });
        }

        return filteredLogs.sort((a, b) => {
            const aSettlement = settlements.find(s => s.id === a.settlementId);
            const bSettlement = settlements.find(s => s.id === b.settlementId);

            let aValue: any, bValue: any;

            switch (sortConfig.field) {
                case 'timestamp':
                    aValue = new Date(a.timestamp);
                    bValue = new Date(b.timestamp);
                    break;
                case 'performedBy':
                    aValue = a.performedBy.toLowerCase();
                    bValue = b.performedBy.toLowerCase();
                    break;
                case 'amount':
                    aValue = parseFloat(aSettlement?.amount?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
                    bValue = parseFloat(bSettlement?.amount?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
                    break;
                case 'from':
                    aValue = aSettlement?.from?.toLowerCase() || '';
                    bValue = bSettlement?.from?.toLowerCase() || '';
                    break;
                case 'to':
                    aValue = aSettlement?.to?.toLowerCase() || '';
                    bValue = bSettlement?.to?.toLowerCase() || '';
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Stronicowanie
    const getPaginatedSettlements = () => {
        const startIndex = (settlementsPage - 1) * settlementsPerPage;
        const endIndex = startIndex + settlementsPerPage;
        return filteredSettlements.slice(startIndex, endIndex);
    };

    const getPaginatedLogs = () => {
        const filteredLogs = getFilteredLogs();
        const startIndex = (logsPage - 1) * logsPerPage;
        const endIndex = startIndex + logsPerPage;
        return filteredLogs.slice(startIndex, endIndex);
    };

    const totalSettlementsPages = Math.ceil(filteredSettlements.length / settlementsPerPage);
    const totalLogsPages = Math.ceil(getFilteredLogs().length / logsPerPage);

    // Funkcje akcji
    const handleMarkAsSettled = (settlementId: number) => {
        const now = new Date().toISOString().split('T')[0];
        const timestamp = new Date().toLocaleString('pl-PL');

        setSettlements(prev => prev.map(s =>
            s.id === settlementId
                ? {...s, status: 'settled' as const, settledAt: now, settledBy: 'Użytkownik'}
                : s
        ));

        const newLog: SettlementLog = {
            id: logs.length + 1,
            settlementId,
            action: 'settled',
            performedBy: 'Użytkownik',
            timestamp,
            details: 'Rozliczenie zostało oznaczone jako rozliczone'
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const handleCancelSettlement = (settlementId: number) => {
        const timestamp = new Date().toLocaleString('pl-PL');

        setSettlements(prev => prev.map(s =>
            s.id === settlementId
                ? {...s, status: 'cancelled' as const}
                : s
        ));

        const newLog: SettlementLog = {
            id: logs.length + 1,
            settlementId,
            action: 'cancelled',
            performedBy: 'Użytkownik',
            timestamp,
            details: 'Rozliczenie zostało anulowane'
        };
        setLogs(prev => [newLog, ...prev]);
    };

    // Funkcje do ustawiania predefiniowanych okresów
    const setPredefinedPeriod = (period: string) => {
        if (period === 'all') {
            setDateFilter({
                ...dateFilter,
                period: 'all',
                startDate: '2020-01-01',
                endDate: new Date().toISOString().split('T')[0]
            });
            setLogsPage(1);
            return;
        }

        const now = new Date();
        let startDate: Date;
        let endDate = new Date(now);

        switch (period) {
            case 'today':
                startDate = new Date(now);
                break;
            case 'week':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate = new Date(now);
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                return;
        }

        setDateFilter({
            ...dateFilter,
            period: period as any,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
        });

        setLogsPage(1);
    };

    const handleSort = (field: SortConfig['field']) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
        setLogsPage(1);
    };

    // Reset strony przy zmianie filtrów
    useEffect(() => {
        setSettlementsPage(1);
    }, [searchTerm, statusFilter, mainUserFilter, typeFilter]);

    useEffect(() => {
        setLogsPage(1);
    }, [dateFilter, historyFilter, mainUserFilter, typeFilter]);

    return {
        // Stan
        settlements,
        logs,
        searchTerm,
        statusFilter,
        mainUserFilter,
        typeFilter,
        dateFilter,
        historyFilter,
        sortConfig,
        settlementsPage,
        logsPage,

        // Dane przefiltrowane
        filteredSettlements,
        getPaginatedSettlements,
        getPaginatedLogs,
        getFilteredLogs,
        totalSettlementsPages,
        totalLogsPages,

        // Funkcje do zmiany stanu
        setSearchTerm,
        setStatusFilter,
        setMainUserFilter,
        setTypeFilter,
        setDateFilter,
        setHistoryFilter,
        setSortConfig,
        setSettlementsPage,
        setLogsPage,

        // Akcje
        handleMarkAsSettled,
        handleCancelSettlement,
        setPredefinedPeriod,
        handleSort,

        // Funkcje stronicowania
        handleSettlementsPageChange: (event: React.ChangeEvent<unknown>, value: number) => {
            setSettlementsPage(value);
        },
        handleLogsPageChange: (event: React.ChangeEvent<unknown>, value: number) => {
            setLogsPage(value);
        }
    };
};
