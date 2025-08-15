'use client'
import React, {useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Pagination,
    Select,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import {
    AccountBalance,
    Add,
    ArrowDownward,
    ArrowUpward,
    CheckCircle,
    Close,
    DateRange,
    Download,
    FilterList,
    GetApp,
    History,
    MonetizationOn,
    People,
    Person,
    Receipt,
    Schedule,
    Search,
    SwapHoriz
} from '@mui/icons-material';
import {settlementsData} from '../analytics/mockData';

interface Settlement {
    id: number;
    from: string;
    to: string;
    amount: string;
    reason: string;
    status: 'pending' | 'settled' | 'cancelled';
    type: 'bills' | 'receipts'; // Nowy typ rozliczenia
    receipts: any[];
    createdAt?: string;
    settledAt?: string;
    settledBy?: string;
}

interface SettlementLog {
    id: number;
    settlementId: number;
    action: 'created' | 'settled' | 'cancelled' | 'modified';
    performedBy: string;
    timestamp: string;
    details: string;
    oldAmount?: string;
    newAmount?: string;
}

// Dodaj nowe interfejsy
interface DateFilter {
    startDate: string;
    endDate: string;
    period: 'all' | 'today' | 'week' | 'month' | 'year' | 'custom';
}

interface UserFilter {
    type: 'all' | 'single' | 'between';
    singleUser?: string;
    userFrom?: string;
    userTo?: string;
}

// Nowy interfejs dla sortowania
interface SortConfig {
    field: 'timestamp' | 'performedBy' | 'amount' | 'from' | 'to';
    direction: 'asc' | 'desc';
}

// Nowy interfejs dla filtrów historii
interface HistoryFilter {
    action: 'all' | 'settled' | 'created' | 'modified' | 'cancelled';
    searchTerm: string;
}

// Dane przykładowe z logami
const initialSettlements: Settlement[] = settlementsData.all.map((settlement, index) => ({
    ...settlement,
    status: settlement.status as 'pending' | 'settled' | 'cancelled',
    type: ['receipts', 'bills', 'receipts', 'bills', 'receipts'][index] as 'bills' | 'receipts', // Dodaj typ rozliczenia
    createdAt: ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'][index],
    settledAt: settlement.status === 'settled' ? ['2024-03-10', '', '', '', '2024-03-12'][index] : undefined,
    settledBy: settlement.status === 'settled' ? ['System', '', '', '', 'Anna'][index] : undefined
}));

// Rozszerzone logi z datami
const settlementLogs: SettlementLog[] = [
    {
        id: 1,
        settlementId: 1,
        action: 'created',
        performedBy: 'System',
        timestamp: '2024-03-01 10:30:00',
        details: 'Rozliczenie utworzone automatycznie na podstawie paragonów'
    },
    {
        id: 2,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 12,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 22,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 42,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 52,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 32,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 26,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 24,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    }, {
        id: 982,
        settlementId: 3,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-10 14:15:00',
        details: 'Rozliczenie oznaczone jako rozliczonasdasdasdasdasdassae'
    },
    {
        id: 3,
        settlementId: 2,
        action: 'modified',
        performedBy: 'Anna',
        timestamp: '2024-03-05 09:20:00',
        details: 'Kwota settlements została zmieniona',
        oldAmount: '150,00 zł',
        newAmount: '162,84 zł'
    },
    {
        id: 4,
        settlementId: 5,
        action: 'settled',
        performedBy: 'Anna',
        timestamp: '2024-03-12 16:45:00',
        details: 'Rozliczenie oznaczone jako rozliczone przez użytkownika'
    },
    {
        id: 5,
        settlementId: 4,
        action: 'created',
        performedBy: 'System',
        timestamp: '2024-03-04 11:00:00',
        details: 'Nowe rozliczenie dla kategorii: Rachunki'
    },
    {
        id: 6,
        settlementId: 1,
        action: 'settled',
        performedBy: 'Kasia',
        timestamp: '2024-03-15 12:30:00',
        details: 'Rozliczenie zostało oznaczone jako rozliczone'
    },
    {
        id: 7,
        settlementId: 2,
        action: 'settled',
        performedBy: 'Piotr',
        timestamp: '2024-03-20 18:20:00',
        details: 'Rozliczenie rozliczone przez użytkownika'
    }
];

// Lista użytkowników
const users = ['Anna', 'Piotr', 'Kasia'];

// Statystyki
const getSettlementsStats = (settlements: Settlement[]) => {
    const total = settlements.length;
    const pending = settlements.filter(s => s.status === 'pending').length;
    const settled = settlements.filter(s => s.status === 'settled').length;
    const totalAmount = settlements.reduce((sum, s) => {
        return sum + parseFloat(s.amount.replace(/[^\d,]/g, '').replace(',', '.'));
    }, 0);
    const pendingAmount = settlements
        .filter(s => s.status === 'pending')
        .reduce((sum, s) => {
            return sum + parseFloat(s.amount.replace(/[^\d,]/g, '').replace(',', '.'));
        }, 0);

    return {
        total,
        pending,
        settled,
        totalAmount: totalAmount.toLocaleString('pl-PL', {minimumFractionDigits: 2}),
        pendingAmount: pendingAmount.toLocaleString('pl-PL', {minimumFractionDigits: 2})
    };
};

// Funkcje pomocnicze dla typu rozliczenia
const getTypeIcon = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return <MonetizationOn sx={{fontSize: '1rem', color: '#007bff'}}/>;
        case 'receipts':
            return <Receipt sx={{fontSize: '1rem', color: '#28a745'}}/>;
        default:
            return <AccountBalance sx={{fontSize: '1rem', color: '#6c757d'}}/>;
    }
};

const getTypeLabel = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return 'Rachunki';
        case 'receipts':
            return 'Paragony';
        default:
            return 'Nieznany';
    }
};

const getTypeColor = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return '#007bff';
        case 'receipts':
            return '#28a745';
        default:
            return '#6c757d';
    }
};

export default function SettlementsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [settlements, setSettlements] = useState<Settlement[]>(initialSettlements);
    const [logs, setLogs] = useState<SettlementLog[]>(settlementLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedSettlementDetails, setSelectedSettlementDetails] = useState<Settlement | null>(null);

    // Nowe state dla filtrów
    const [dateFilter, setDateFilter] = useState<DateFilter>({
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        period: 'month'
    });

    const [userFilter, setUserFilter] = useState<UserFilter>({
        type: 'all'
    });

    // Nowy state dla filtrów użytkowników w głównym interfejsie
    const [mainUserFilter, setMainUserFilter] = useState<UserFilter>({
        type: 'all'
    });

    const [downloadModalOpen, setDownloadModalOpen] = useState(false);

    // State dla stronicowania logów
    const [logsPage, setLogsPage] = useState(1);
    const [logsPerPage] = useState(10); // 10 logów na stronę

    // State dla stronicowania rozliczeń
    const [settlementsPage, setSettlementsPage] = useState(1);
    const [settlementsPerPage] = useState(5); // 5 rozliczeń na stronę

    // Nowe state dla sortowania
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: 'timestamp',
        direction: 'desc'
    });

    // Nowe state dla filtrów historii
    const [historyFilter, setHistoryFilter] = useState<HistoryFilter>({
        action: 'all',
        searchTerm: ''
    });

    // Nowe state dla filtrów typu rozliczenia
    const [typeFilter, setTypeFilter] = useState({
        type: 'all'
    });

    // Filtrowanie rozliczeń - zaktualizowane z filtrami użytkowników
    const filteredSettlements = settlements.filter(settlement => {
        const matchesSearch =
            settlement.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            settlement.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            settlement.reason.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || settlement.status === statusFilter;

        // Filtrowanie według użytkowników
        let matchesUserFilter = true;
        if (mainUserFilter.type === 'single' && mainUserFilter.singleUser) {
            matchesUserFilter = settlement.from === mainUserFilter.singleUser || settlement.to === mainUserFilter.singleUser;
        } else if (mainUserFilter.type === 'between' && mainUserFilter.userFrom && mainUserFilter.userTo) {
            matchesUserFilter =
                (settlement.from === mainUserFilter.userFrom && settlement.to === mainUserFilter.userTo) ||
                (settlement.from === mainUserFilter.userTo && settlement.to === mainUserFilter.userFrom);
        }

        // Filtrowanie według typu rozliczenia
        const matchesTypeFilter = typeFilter.type === 'all' || settlement.type === typeFilter.type;

        return matchesSearch && matchesStatus && matchesUserFilter && matchesTypeFilter;
    });

    // Funkcja do filtrowania logów według daty i innych kryteriów
    const getFilteredLogs = () => {
        let filteredLogs = logs;

        // Filtrowanie według typu akcji (dodana opcja 'all')
        if (historyFilter.action !== 'all') {
            filteredLogs = filteredLogs.filter(log => log.action === historyFilter.action);
        }

        // Filtrowanie według frazy wyszukiwania
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

        // Filtrowanie według użytkowników w historii
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

        // Filtrowanie według typu rozliczenia w historii
        if (typeFilter.type !== 'all') {
            filteredLogs = filteredLogs.filter(log => {
                const settlement = settlements.find(s => s.id === log.settlementId);
                return settlement && settlement.type === typeFilter.type;
            });
        }

        // Filtrowanie według daty (tylko jeśli nie jest ustawiona opcja 'all')
        if (dateFilter.period !== 'all') {
            filteredLogs = filteredLogs.filter(log => {
                const logDate = new Date(log.timestamp);
                const startDate = new Date(dateFilter.startDate);
                const endDate = new Date(dateFilter.endDate);
                endDate.setHours(23, 59, 59, 999); // Koniec dnia

                return logDate >= startDate && logDate <= endDate;
            });
        }

        // Sortowanie
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

    // Funkcja do obsługi sortowania
    const handleSort = (field: SortConfig['field']) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
        setLogsPage(1); // Reset strony przy sortowaniu
    };

    // Funkcja do pobierania logów dla aktualnej strony
    const getPaginatedLogs = () => {
        const filteredLogs = getFilteredLogs();
        const startIndex = (logsPage - 1) * logsPerPage;
        const endIndex = startIndex + logsPerPage;
        return filteredLogs.slice(startIndex, endIndex);
    };

    // Funkcja do pobierania rozliczeń dla aktualnej strony
    const getPaginatedSettlements = () => {
        const startIndex = (settlementsPage - 1) * settlementsPerPage;
        const endIndex = startIndex + settlementsPerPage;
        return filteredSettlements.slice(startIndex, endIndex);
    };

    // Obliczanie całkowitej liczby stron
    const totalLogsPages = Math.ceil(getFilteredLogs().length / logsPerPage);
    const totalSettlementsPages = Math.ceil(filteredSettlements.length / settlementsPerPage);

    // Funkcja obsługi zmiany strony
    const handleLogsPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setLogsPage(value);
    };

    // Funkcja obsługi zmiany strony rozliczeń
    const handleSettlementsPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSettlementsPage(value);
    };

    // Funkcja do ustawiania predefiniowanych okresów (zaktualizowana z opcją 'all')
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

        // Reset strony do pierwszej przy zmianie filtrów
        setLogsPage(1);
    };

    // Funkcja do pobierania rozliczeń według filtrów użytkowników
    const getFilteredSettlements = () => {
        let filtered = settlements.filter(s => s.status === 'settled'); // Tylko rozliczone

        if (userFilter.type === 'single' && userFilter.singleUser) {
            filtered = filtered.filter(s =>
                s.from === userFilter.singleUser || s.to === userFilter.singleUser
            );
        } else if (userFilter.type === 'between' && userFilter.userFrom && userFilter.userTo) {
            filtered = filtered.filter(s =>
                (s.from === userFilter.userFrom && s.to === userFilter.userTo) ||
                (s.from === userFilter.userTo && s.to === userFilter.userFrom)
            );
        }

        return filtered;
    };

    // Funkcja do eksportu danych
    const handleExportSettlements = () => {
        const filtered = getFilteredSettlements();
        const dataStr = JSON.stringify(filtered, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `rozliczenia_${userFilter.type}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        setDownloadModalOpen(false);
    };


    // Reset strony rozliczeń przy zmianie filtrów
    React.useEffect(() => {
        setSettlementsPage(1);
    }, [searchTerm, statusFilter]);

    // Obsługa oznaczania jako rozliczone
    const handleMarkAsSettled = (settlementId: number) => {
        const now = new Date().toISOString().split('T')[0];
        const timestamp = new Date().toLocaleString('pl-PL');

        setSettlements(prev => prev.map(s =>
            s.id === settlementId
                ? {...s, status: 'settled' as const, settledAt: now, settledBy: 'Użytkownik'}
                : s
        ));

        // Dodaj log
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

    // Obsługa anulowania settlements
    const handleCancelSettlement = (settlementId: number) => {
        const timestamp = new Date().toLocaleString('pl-PL');

        setSettlements(prev => prev.map(s =>
            s.id === settlementId
                ? {...s, status: 'cancelled' as const}
                : s
        ));

        // Dodaj log
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

    const handleShowDetails = (settlement: Settlement) => {
        setSelectedSettlementDetails(settlement);
        setDetailsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'settled':
                return '#28a745';
            case 'pending':
                return '#ffc107';
            case 'cancelled':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'settled':
                return 'Rozliczone';
            case 'pending':
                return 'Oczekuje';
            case 'cancelled':
                return 'Anulowane';
            default:
                return 'Nieznany';
        }
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'created':
                return <Add sx={{fontSize: '1rem', color: '#007bff'}}/>;
            case 'settled':
                return <CheckCircle sx={{fontSize: '1rem', color: '#28a745'}}/>;
            case 'cancelled':
                return <Close sx={{fontSize: '1rem', color: '#dc3545'}}/>;
            case 'modified':
                return <SwapHoriz sx={{fontSize: '1rem', color: '#ffc107'}}/>;
            default:
                return <History sx={{fontSize: '1rem', color: '#6c757d'}}/>;
        }
    };

    const getActionLabel = (action: string) => {
        switch (action) {
            case 'created':
                return 'Utworzono';
            case 'settled':
                return 'Rozliczono';
            case 'cancelled':
                return 'Anulowano';
            case 'modified':
                return 'Zmodyfikowano';
            default:
                return 'Nieznana akcja';
        }
    };

    return (
        <Box sx={{flexGrow: 1, p: 3, backgroundColor: '#ffffff', minHeight: '100vh'}}>
            {/* Nagłówek strony */}
            <Box sx={{mb: 4}}>
                <Typography variant="h4" sx={{fontWeight: 700, color: '#212529', mb: 1}}>
                    <AccountBalance sx={{fontSize: '2rem', mr: 1, verticalAlign: 'middle', color: '#28a745'}}/>
                    System Rozliczeń
                </Typography>
                <Typography variant="body1" color="#6c757d" sx={{fontSize: '1.1rem'}}>
                    Zarządzaj rozliczeniami między domownikami i śledź historię płatności
                </Typography>
            </Box>


            {/* Zakładki */}
            <Card sx={{mb: 3}}>
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{
                        borderBottom: '1px solid #e9ecef',
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }
                    }}
                >
                    <Tab
                        icon={<AccountBalance/>}
                        iconPosition="start"
                        label="Rozliczenia"
                    />
                    <Tab
                        icon={<History/>}
                        iconPosition="start"
                        label="Historia rozliczeń"
                    />
                </Tabs>
            </Card>

            {/* Zawartość zakładek */}
            {activeTab === 0 && (
                <Box>
                    {/* Filtry i wyszukiwanie - rozszerzenie */}
                    <Card sx={{mb: 3, p: 2}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Szukaj rozliczeń..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <ToggleButtonGroup
                                    value={statusFilter}
                                    exclusive
                                    onChange={(_, value) => value && setStatusFilter(value)}
                                    size="small"
                                    fullWidth
                                >
                                    <ToggleButton value="all">Wszystkie</ToggleButton>
                                    <ToggleButton value="pending">Oczekujące</ToggleButton>
                                    <ToggleButton value="settled">Rozliczone</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<GetApp/>}
                                        size="small"
                                        onClick={() => setDownloadModalOpen(true)}
                                        sx={{
                                            borderColor: '#28a745',
                                            color: '#28a745',
                                            '&:hover': {backgroundColor: '#e8f5e8'}
                                        }}
                                    >
                                        Pobierz rozliczenia
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Download/>}
                                        size="small"
                                    >
                                        Eksportuj
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Filtry użytkowników */}
                    <Card sx={{mb: 3, p: 2}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                            <People sx={{mr: 1, verticalAlign: 'middle'}}/>
                            Filtruj według użytkowników i typu
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Typ filtrowania</InputLabel>
                                    <Select
                                        value={mainUserFilter.type}
                                        label="Typ filtrowania"
                                        onChange={(e) => {
                                            setMainUserFilter({
                                                type: e.target.value as any,
                                                singleUser: undefined,
                                                userFrom: undefined,
                                                userTo: undefined
                                            });
                                            setSettlementsPage(1);
                                        }}
                                    >
                                        <MenuItem value="all">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <People sx={{mr: 1, fontSize: '1rem'}}/>
                                                Wszystkie rozliczenia
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="single">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                                Dla jednego użytkownika
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="between">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                                Między dwoma użytkownikami
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Typ rozliczenia</InputLabel>
                                    <Select
                                        value={typeFilter.type}
                                        label="Typ rozliczenia"
                                        onChange={(e) => {
                                            setTypeFilter({
                                                type: e.target.value as any
                                            });
                                            setSettlementsPage(1);
                                        }}
                                    >
                                        <MenuItem value="all">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                                Wszystkie typy
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="receipts">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Receipt sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                                Paragony
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="bills">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <MonetizationOn sx={{mr: 1, fontSize: '1rem', color: '#007bff'}}/>
                                                Rachunki
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {mainUserFilter.type === 'single' && (
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        options={users}
                                        value={mainUserFilter.singleUser || null}
                                        onChange={(_, value) => {
                                            setMainUserFilter({
                                                ...mainUserFilter,
                                                singleUser: value || undefined
                                            });
                                            setSettlementsPage(1);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Wybierz użytkownika"
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            )}

                            {mainUserFilter.type === 'between' && (
                                <>
                                    <Grid item xs={12} md={3}>
                                        <Autocomplete
                                            options={users}
                                            value={mainUserFilter.userFrom || null}
                                            onChange={(_, value) => {
                                                setMainUserFilter({
                                                    ...mainUserFilter,
                                                    userFrom: value || undefined
                                                });
                                                setSettlementsPage(1);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Od użytkownika"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Autocomplete
                                            options={users}
                                            value={mainUserFilter.userTo || null}
                                            onChange={(_, value) => {
                                                setMainUserFilter({
                                                    ...mainUserFilter,
                                                    userTo: value || undefined
                                                });
                                                setSettlementsPage(1);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Do użytkownika"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}

                            {/* Podsumowanie filtrów */}
                            <Grid item xs={12} md={mainUserFilter.type === 'between' ? 12 : 3}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end'}}>
                                    {(mainUserFilter.type !== 'all' || typeFilter.type !== 'all') && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => {
                                                setMainUserFilter({type: 'all'});
                                                setTypeFilter({type: 'all'});
                                                setSettlementsPage(1);
                                            }}
                                            sx={{
                                                borderColor: '#dc3545',
                                                color: '#dc3545',
                                                '&:hover': {backgroundColor: '#fee'}
                                            }}
                                        >
                                            Wyczyść filtry
                                        </Button>
                                    )}
                                    <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                                        {filteredSettlements.length} rozliczeń
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Lista rozliczeń */}
                    <Box>
                        {filteredSettlements.length === 0 ? (
                            <Card sx={{textAlign: 'center', p: 4}}>
                                <AccountBalance sx={{fontSize: '4rem', color: '#e9ecef', mb: 2}}/>
                                <Typography variant="h6" color="#6c757d" sx={{mb: 1}}>
                                    Brak rozliczeń
                                </Typography>
                                <Typography variant="body2" color="#6c757d">
                                    {searchTerm || statusFilter !== 'all'
                                        ? 'Nie znaleziono rozliczeń spełniających kryteria wyszukiwania'
                                        : 'Nie masz jeszcze żadnych rozliczeń'
                                    }
                                </Typography>
                            </Card>
                        ) : (
                            <Box>
                                <List sx={{p: 0}}>
                                    {getPaginatedSettlements().map((settlement, index) => (
                                        <Card
                                            key={settlement.id}
                                            sx={{
                                                mb: 2,
                                                border: `2px solid ${getStatusColor(settlement.status)}`,
                                                borderRadius: 2,
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                },
                                                transition: 'all 0.3s ease-in-out'
                                            }}
                                        >
                                            <CardContent sx={{p: 2}}>
                                                <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                                    {/* Ikona statusu */}
                                                    <Box sx={{mr: 2}}>
                                                        {settlement.status === 'settled' ? (
                                                            <CheckCircle sx={{color: '#28a745', fontSize: '2rem'}}/>
                                                        ) : settlement.status === 'cancelled' ? (
                                                            <Close sx={{color: '#dc3545', fontSize: '2rem'}}/>
                                                        ) : (
                                                            <Schedule sx={{color: '#ffc107', fontSize: '2rem'}}/>
                                                        )}
                                                    </Box>

                                                    {/* Główne informacje */}
                                                    <Box sx={{flexGrow: 1}}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            mb: 1
                                                        }}>
                                                            <Typography variant="h6"
                                                                        sx={{fontWeight: 600, fontSize: '1.1rem'}}>
                                                                <SwapHoriz sx={{
                                                                    fontSize: '1.3rem',
                                                                    mr: 0.5,
                                                                    verticalAlign: 'middle',
                                                                    color: '#6c757d'
                                                                }}/>
                                                                {settlement.from} → {settlement.to}
                                                            </Typography>
                                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                                <Typography variant="h6" sx={{
                                                                    fontWeight: 700,
                                                                    color: '#212529',
                                                                    fontSize: '1.2rem'
                                                                }}>
                                                                    {settlement.amount}
                                                                </Typography>
                                                                <Chip
                                                                    label={getStatusLabel(settlement.status)}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: settlement.status === 'settled' ? '#e8f5e8' :
                                                                            settlement.status === 'cancelled' ? '#fee' : '#fff3cd',
                                                                        color: getStatusColor(settlement.status),
                                                                        fontWeight: 600
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>

                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            mb: 2
                                                        }}>
                                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                                <Typography variant="body2" color="#6c757d">
                                                                    {settlement.reason} • {settlement.receipts.length} paragon{settlement.receipts.length !== 1 ? 'ów' : ''}
                                                                </Typography>
                                                                <Chip
                                                                    icon={getTypeIcon(settlement.type)}
                                                                    label={getTypeLabel(settlement.type)}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: settlement.type === 'receipts' ? '#e8f5e8' : '#e3f2fd',
                                                                        color: getTypeColor(settlement.type),
                                                                        fontWeight: 600,
                                                                        '& .MuiChip-icon': {
                                                                            color: getTypeColor(settlement.type)
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Typography variant="caption" color="#6c757d">
                                                                Utworzono: {settlement.createdAt}
                                                                {settlement.settledAt && ` • Rozliczono: ${settlement.settledAt}`}
                                                            </Typography>
                                                        </Box>

                                                        {/* Akcje */}
                                                        <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => handleShowDetails(settlement)}
                                                            >
                                                                Szczegóły
                                                            </Button>

                                                            {settlement.status === 'pending' && (
                                                                <>
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        color="success"
                                                                        onClick={() => handleMarkAsSettled(settlement.id)}
                                                                    >
                                                                        Oznacz jako rozliczone
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        variant="outlined"
                                                                        color="error"
                                                                        onClick={() => handleCancelSettlement(settlement.id)}
                                                                    >
                                                                        Anuluj
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </List>

                                {/* Stronicowanie rozliczeń */}
                                {totalSettlementsPages > 1 && (
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 3,
                                        mt: 2,
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: 2
                                    }}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                            <Typography variant="body2" color="#6c757d">
                                                Strona {settlementsPage} z {totalSettlementsPages}
                                                ({filteredSettlements.length} rozliczeń)
                                            </Typography>
                                            <Pagination
                                                count={totalSettlementsPages}
                                                page={settlementsPage}
                                                onChange={handleSettlementsPageChange}
                                                color="primary"
                                                size="medium"
                                                showFirstButton
                                                showLastButton
                                                sx={{
                                                    '& .MuiPaginationItem-root': {
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#28a745',
                                                            color: 'white',
                                                            '&:hover': {
                                                                backgroundColor: '#218838'
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            {/* Zakładka historii rozliczeń - zmodyfikowana */}
            {activeTab === 1 && (
                <Box>
                    {/* Filtry daty dla historii */}
                    <Card sx={{mb: 3, p: 2}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                            <DateRange sx={{mr: 1, verticalAlign: 'middle'}}/>
                            Filtruj historię rozliczeń
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <ToggleButtonGroup
                                    value={dateFilter.period}
                                    exclusive
                                    onChange={(_, value) => value && setPredefinedPeriod(value)}
                                    size="small"
                                    fullWidth
                                >
                                    <ToggleButton value="all">Całość</ToggleButton>
                                    <ToggleButton value="week">Tydzień</ToggleButton>
                                    <ToggleButton value="month">Miesiąc</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    label="Data od"
                                    value={dateFilter.startDate}
                                    onChange={(e) => {
                                        setDateFilter({
                                            ...dateFilter,
                                            startDate: e.target.value,
                                            period: 'custom'
                                        });
                                        setLogsPage(1); // Reset strony przy zmianie daty
                                    }}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    label="Data do"
                                    value={dateFilter.endDate}
                                    onChange={(e) => {
                                        setDateFilter({
                                            ...dateFilter,
                                            endDate: e.target.value,
                                            period: 'custom'
                                        });
                                        setLogsPage(1); // Reset strony przy zmianie daty
                                    }}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                                    {getFilteredLogs().length} rozliczeń
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Filtry użytkowników dla historii */}
                    <Card sx={{mb: 3, p: 2}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                            <People sx={{mr: 1, verticalAlign: 'middle'}}/>
                            Filtruj według użytkowników
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Typ filtrowania</InputLabel>
                                    <Select
                                        value={mainUserFilter.type}
                                        label="Typ filtrowania"
                                        onChange={(e) => {
                                            setMainUserFilter({
                                                type: e.target.value as any,
                                                singleUser: undefined,
                                                userFrom: undefined,
                                                userTo: undefined
                                            });
                                            setLogsPage(1);
                                        }}
                                    >
                                        <MenuItem value="all">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <People sx={{mr: 1, fontSize: '1rem'}}/>
                                                Wszystkie rozliczenia
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="single">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                                Dla jednego użytkownika
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="between">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                                Między dwoma użytkownikami
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {mainUserFilter.type === 'single' && (
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={users}
                                        value={mainUserFilter.singleUser || null}
                                        onChange={(_, value) => {
                                            setMainUserFilter({
                                                ...mainUserFilter,
                                                singleUser: value || undefined
                                            });
                                            setLogsPage(1);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Wybierz użytkownika"
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            )}

                            {mainUserFilter.type === 'between' && (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            options={users}
                                            value={mainUserFilter.userFrom || null}
                                            onChange={(_, value) => {
                                                setMainUserFilter({
                                                    ...mainUserFilter,
                                                    userFrom: value || undefined
                                                });
                                                setLogsPage(1);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Od użytkownika"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            options={users}
                                            value={mainUserFilter.userTo || null}
                                            onChange={(_, value) => {
                                                setMainUserFilter({
                                                    ...mainUserFilter,
                                                    userTo: value || undefined
                                                });
                                                setLogsPage(1);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Do użytkownika"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}

                            {/* Podsumowanie filtrów dla historii */}
                            <Grid item xs={12} md={mainUserFilter.type === 'between' ? 12 : 4}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end'}}>
                                    {mainUserFilter.type !== 'all' && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => {
                                                setMainUserFilter({type: 'all'});
                                                setLogsPage(1);
                                            }}
                                            sx={{
                                                borderColor: '#dc3545',
                                                color: '#dc3545',
                                                '&:hover': {backgroundColor: '#fee'}
                                            }}
                                        >
                                            Wyczyść filtry użytkowników
                                        </Button>
                                    )}
                                    <Typography variant="body2" color="primary" sx={{fontWeight: 600}}>
                                        {getFilteredLogs().length} wpisów historii
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Dodatkowe filtry i sortowanie dla historii */}
                    <Card sx={{mb: 3, p: 2}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                            <FilterList sx={{mr: 1, verticalAlign: 'middle'}}/>
                            Filtry i sortowanie
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={2.5}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Szukaj w historii..."
                                    value={historyFilter.searchTerm}
                                    onChange={(e) => {
                                        setHistoryFilter({
                                            ...historyFilter,
                                            searchTerm: e.target.value
                                        });
                                        setLogsPage(1);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Typ akcji</InputLabel>
                                    <Select
                                        value={historyFilter.action}
                                        label="Typ akcji"
                                        onChange={(e) => {
                                            setHistoryFilter({
                                                ...historyFilter,
                                                action: e.target.value as any
                                            });
                                            setLogsPage(1);
                                        }}
                                    >
                                        <MenuItem value="all">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <History sx={{mr: 1, fontSize: '1rem'}}/>
                                                Wszystkie akcje
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="settled">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <CheckCircle sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                                Rozliczono
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="created">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Add sx={{mr: 1, fontSize: '1rem', color: '#007bff'}}/>
                                                Utworzono
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="modified">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <SwapHoriz sx={{mr: 1, fontSize: '1rem', color: '#ffc107'}}/>
                                                Zmodyfikowano
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="cancelled">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Close sx={{mr: 1, fontSize: '1rem', color: '#dc3545'}}/>
                                                Anulowano
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Typ rozliczenia</InputLabel>
                                    <Select
                                        value={typeFilter.type}
                                        label="Typ rozliczenia"
                                        onChange={(e) => {
                                            setTypeFilter({
                                                type: e.target.value as any
                                            });
                                            setLogsPage(1);
                                        }}
                                    >
                                        <MenuItem value="all">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                                Wszystkie typy
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="receipts">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Receipt sx={{mr: 1, fontSize: '1rem', color: '#28a745'}}/>
                                                Paragony
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="bills">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <MonetizationOn sx={{mr: 1, fontSize: '1rem', color: '#007bff'}}/>
                                                Rachunki
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sortuj według</InputLabel>
                                    <Select
                                        value={sortConfig.field}
                                        label="Sortuj według"
                                        onChange={(e) => handleSort(e.target.value as SortConfig['field'])}
                                    >
                                        <MenuItem value="timestamp">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <DateRange sx={{mr: 1, fontSize: '1rem'}}/>
                                                Data
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="performedBy">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Person sx={{mr: 1, fontSize: '1rem'}}/>
                                                Użytkownik
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="amount">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <AccountBalance sx={{mr: 1, fontSize: '1rem'}}/>
                                                Kwota
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="from">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                                Od użytkownika
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="to">
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <SwapHoriz sx={{mr: 1, fontSize: '1rem'}}/>
                                                Do użytkownika
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column'}}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleSort(sortConfig.field)}
                                        startIcon={
                                            sortConfig.direction === 'asc' ?
                                                <ArrowUpward sx={{fontSize: '1rem'}}/> :
                                                <ArrowDownward sx={{fontSize: '1rem'}}/>
                                        }
                                        sx={{
                                            borderColor: '#28a745',
                                            color: '#28a745',
                                            '&:hover': {backgroundColor: '#e8f5e8'},
                                            width: '100%'
                                        }}
                                    >
                                        {sortConfig.direction === 'asc' ? 'Rosnąco' : 'Malejąco'}
                                    </Button>
                                    <Typography variant="body2" color="primary"
                                                sx={{fontWeight: 600, textAlign: 'center'}}>
                                        {getFilteredLogs().length} wyników
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Historia rozliczeń */}
                    <Card>
                        <CardContent sx={{p: 0}}>
                            <Box sx={{p: 2, borderBottom: '1px solid #e9ecef'}}>
                                <Typography variant="h6" sx={{fontWeight: 600}}>
                                    <CheckCircle sx={{mr: 1, verticalAlign: 'middle', color: '#28a745'}}/>
                                    Historia rozliczonych płatności
                                </Typography>
                                <Typography variant="body2" color="#6c757d">
                                    Pokazuje tylko rozliczone płatności z wybranego okresu
                                </Typography>
                            </Box>

                            {getFilteredLogs().length === 0 ? (
                                <Box sx={{textAlign: 'center', p: 4}}>
                                    <History sx={{fontSize: '4rem', color: '#e9ecef', mb: 2}}/>
                                    <Typography variant="h6" color="#6c757d">
                                        Brak rozliczeń w tym okresie
                                    </Typography>
                                    <Typography variant="body2" color="#6c757d">
                                        Zmień zakres dat, aby zobaczyć więcej wyników
                                    </Typography>
                                </Box>
                            ) : (
                                <Box>
                                    <List sx={{p: 0}}>
                                        {getPaginatedLogs().map((log, index) => {
                                            const settlement = settlements.find(s => s.id === log.settlementId);
                                            return (
                                                <ListItem
                                                    key={log.id}
                                                    sx={{
                                                        borderBottom: index === getPaginatedLogs().length - 1 ? 'none' : '1px solid #e9ecef',
                                                        py: 2,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#f8f9fa',
                                                            transform: 'translateX(4px)',
                                                            transition: 'all 0.2s ease-in-out'
                                                        }
                                                    }}
                                                    onClick={() => settlement && handleShowDetails(settlement)}
                                                >
                                                    <Box
                                                        sx={{display: 'flex', alignItems: 'flex-start', width: '100%'}}>
                                                        <Box sx={{mr: 2, mt: 0.5}}>
                                                            <CheckCircle sx={{fontSize: '1.5rem', color: '#28a745'}}/>
                                                        </Box>
                                                        <Box sx={{flexGrow: 1}}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                mb: 0.5
                                                            }}>
                                                                <Typography variant="h6"
                                                                            sx={{fontWeight: 600, fontSize: '1rem'}}>
                                                                    {settlement?.from} → {settlement?.to}
                                                                </Typography>
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 1
                                                                }}>
                                                                    <Typography variant="h6" sx={{
                                                                        fontWeight: 700,
                                                                        color: '#28a745'
                                                                    }}>
                                                                        {settlement?.amount}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="#6c757d">
                                                                        {new Date(log.timestamp).toLocaleDateString('pl-PL')}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            <Typography variant="body2" color="#6c757d" sx={{mb: 0.5}}>
                                                                {settlement?.reason} • {log.details}
                                                            </Typography>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Typography variant="caption" color="#6c757d">
                                                                    Rozliczone przez: {log.performedBy}
                                                                </Typography>
                                                                <Typography variant="caption" color="#6c757d">
                                                                    {new Date(log.timestamp).toLocaleString('pl-PL')}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </ListItem>
                                            );
                                        })}
                                    </List>

                                    {/* Stronicowanie */}
                                    {totalLogsPages > 1 && (
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            p: 3,
                                            borderTop: '1px solid #e9ecef',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                <Typography variant="body2" color="#6c757d">
                                                    Strona {logsPage} z {totalLogsPages}
                                                    ({getFilteredLogs().length} rozliczeń)
                                                </Typography>
                                                <Pagination
                                                    count={totalLogsPages}
                                                    page={logsPage}
                                                    onChange={handleLogsPageChange}
                                                    color="primary"
                                                    size="medium"
                                                    showFirstButton
                                                    showLastButton
                                                    sx={{
                                                        '& .MuiPaginationItem-root': {
                                                            '&.Mui-selected': {
                                                                backgroundColor: '#28a745',
                                                                color: 'white',
                                                                '&:hover': {
                                                                    backgroundColor: '#218838'
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* Modal pobierania rozliczeń */}
            <Dialog
                open={downloadModalOpen}
                onClose={() => setDownloadModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <GetApp sx={{mr: 1, color: '#28a745'}}/>
                        Pobierz rozliczenia
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="#6c757d" sx={{mb: 3}}>
                        Wybierz kryteria filtrowania rozliczeń do pobrania
                    </Typography>

                    <FormControl fullWidth sx={{mb: 3}}>
                        <InputLabel>Typ filtrowania</InputLabel>
                        <Select
                            value={userFilter.type}
                            label="Typ filtrowania"
                            onChange={(e) => setUserFilter({
                                type: e.target.value as any,
                                singleUser: undefined,
                                userFrom: undefined,
                                userTo: undefined
                            })}
                        >
                            <MenuItem value="all">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <People sx={{mr: 1}}/>
                                    Wszystkie rozliczenia
                                </Box>
                            </MenuItem>
                            <MenuItem value="single">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Person sx={{mr: 1}}/>
                                    Dla jednego użytkownika
                                </Box>
                            </MenuItem>
                            <MenuItem value="between">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <SwapHoriz sx={{mr: 1}}/>
                                    Między dwoma użytkownikami
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {userFilter.type === 'single' && (
                        <Autocomplete
                            options={users}
                            value={userFilter.singleUser || null}
                            onChange={(_, value) => setUserFilter({
                                ...userFilter,
                                singleUser: value || undefined
                            })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Wybierz użytkownika"
                                    fullWidth
                                />
                            )}
                        />
                    )}

                    {userFilter.type === 'between' && (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={users}
                                    value={userFilter.userFrom || null}
                                    onChange={(_, value) => setUserFilter({
                                        ...userFilter,
                                        userFrom: value || undefined
                                    })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Od użytkownika"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={users}
                                    value={userFilter.userTo || null}
                                    onChange={(_, value) => setUserFilter({
                                        ...userFilter,
                                        userTo: value || undefined
                                    })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Do użytkownika"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    )}

                    {/* Podgląd wyników */}
                    <Alert severity="info" sx={{mt: 2}}>
                        <Typography variant="body2">
                            <strong>{getFilteredSettlements().length}</strong> rozliczeń spełnia kryteria filtrowania
                        </Typography>
                        {getFilteredSettlements().length > 0 && (
                            <Typography variant="caption" sx={{display: 'block', mt: 1}}>
                                Ostatnie: {getFilteredSettlements()[0]?.from} → {getFilteredSettlements()[0]?.to}
                                ({getFilteredSettlements()[0]?.amount})
                            </Typography>
                        )}
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDownloadModalOpen(false)}>
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleExportSettlements}
                        variant="contained"
                        startIcon={<Download/>}
                        disabled={getFilteredSettlements().length === 0}
                        sx={{backgroundColor: '#28a745'}}
                    >
                        Pobierz ({getFilteredSettlements().length})
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal szczegółów settlements */}
            <Dialog
                open={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{position: 'relative'}}>
                    <Typography variant="h6" sx={{fontWeight: 600}}>
                        Szczegóły rozliczenia #{selectedSettlementDetails?.id}
                    </Typography>
                    <IconButton
                        onClick={() => setDetailsModalOpen(false)}
                        sx={{position: 'absolute', top: 8, right: 8}}
                    >
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedSettlementDetails && (
                        <Box>
                            {/* Podstawowe informacje */}
                            <Card sx={{mb: 3}}>
                                <CardContent>
                                    <Typography variant="h6" sx={{mb: 2, color: '#28a745'}}>
                                        📋 Informacje podstawowe
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Od:</Typography>
                                            <Typography variant="body1"
                                                        sx={{fontWeight: 600}}>{selectedSettlementDetails.from}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Do:</Typography>
                                            <Typography variant="body1"
                                                        sx={{fontWeight: 600}}>{selectedSettlementDetails.to}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Kwota:</Typography>
                                            <Typography variant="h6" sx={{
                                                fontWeight: 700,
                                                color: '#28a745'
                                            }}>{selectedSettlementDetails.amount}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Status:</Typography>
                                            <Chip
                                                label={getStatusLabel(selectedSettlementDetails.status)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: selectedSettlementDetails.status === 'settled' ? '#e8f5e8' :
                                                        selectedSettlementDetails.status === 'cancelled' ? '#fee' : '#fff3cd',
                                                    color: getStatusColor(selectedSettlementDetails.status),
                                                    fontWeight: 600
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Typ rozliczenia:</Typography>
                                            <Chip
                                                icon={getTypeIcon(selectedSettlementDetails.type)}
                                                label={getTypeLabel(selectedSettlementDetails.type)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: selectedSettlementDetails.type === 'receipts' ? '#e8f5e8' : '#e3f2fd',
                                                    color: getTypeColor(selectedSettlementDetails.type),
                                                    fontWeight: 600,
                                                    '& .MuiChip-icon': {
                                                        color: getTypeColor(selectedSettlementDetails.type)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="#6c757d">Powód:</Typography>
                                            <Typography variant="body1" sx={{fontWeight: 600}}>
                                                {selectedSettlementDetails.reason}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Paragony */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{mb: 2, color: '#28a745'}}>
                                        🧾 Paragony w rozliczeniu
                                    </Typography>
                                    {selectedSettlementDetails.receipts.map((receipt, index) => (
                                        <Card key={receipt.id} sx={{mb: 1, backgroundColor: '#f8f9fa'}}>
                                            <CardContent sx={{p: 2}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                        <Receipt sx={{color: '#28a745', mr: 1}}/>
                                                        <Box>
                                                            <Typography variant="body1" sx={{fontWeight: 600}}>
                                                                {receipt.description}
                                                            </Typography>
                                                            <Typography variant="caption" color="#6c757d">
                                                                ID: {receipt.id} • Data: {receipt.date}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="h6" sx={{fontWeight: 700, color: '#28a745'}}>
                                                        {receipt.amount}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsModalOpen(false)}>
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
