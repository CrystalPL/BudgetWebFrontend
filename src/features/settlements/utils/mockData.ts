import {Settlement, SettlementLog} from '../types';

// Importuj dane z istniejącego pliku
export {settlementsData} from '../../../app/(dashboard)/household/analytics/mockData';

// Lista użytkowników
export const users = ['Anna', 'Piotr', 'Kasia'];

// Dane przykładowe rozliczeń z logami
export const getInitialSettlements = (): Settlement[] => {
    // Ta funkcja będzie importować dane z settlementsData i mapować je
    return [
        {
            id: 1,
            from: 'Anna',
            to: 'Piotr',
            amount: '125,50 zł',
            reason: 'Zakupy spożywcze',
            status: 'pending',
            type: 'receipts',
            receipts: [
                {id: 1, description: 'Zakupy w Biedronka', amount: '85,30 zł', date: '2024-03-01'},
                {id: 2, description: 'Piekarnia', amount: '40,20 zł', date: '2024-03-01'}
            ],
            createdAt: '2024-03-01'
        },
        {
            id: 2,
            from: 'Piotr',
            to: 'Kasia',
            amount: '162,84 zł',
            reason: 'Rachunki za media',
            status: 'pending',
            type: 'bills',
            receipts: [
                {id: 3, description: 'Rachunek za prąd', amount: '120,00 zł', date: '2024-03-02'},
                {id: 4, description: 'Rachunek za gaz', amount: '42,84 zł', date: '2024-03-02'}
            ],
            createdAt: '2024-03-02'
        },
        {
            id: 3,
            from: 'Kasia',
            to: 'Anna',
            amount: '89,20 zł',
            reason: 'Wspólny obiad',
            status: 'settled',
            type: 'receipts',
            receipts: [
                {id: 5, description: 'Restauracja ABC', amount: '89,20 zł', date: '2024-03-03'}
            ],
            createdAt: '2024-03-03',
            settledAt: '2024-03-10',
            settledBy: 'System'
        },
        {
            id: 4,
            from: 'Anna',
            to: 'Kasia',
            amount: '45,00 zł',
            reason: 'Transport publiczny',
            status: 'pending',
            type: 'bills',
            receipts: [
                {id: 6, description: 'Bilety komunikacja miejska', amount: '45,00 zł', date: '2024-03-04'}
            ],
            createdAt: '2024-03-04'
        },
        {
            id: 5,
            from: 'Piotr',
            to: 'Anna',
            amount: '200,00 zł',
            reason: 'Zakupy AGD',
            status: 'settled',
            type: 'receipts',
            receipts: [
                {id: 7, description: 'Blender kuchenny', amount: '200,00 zł', date: '2024-03-05'}
            ],
            createdAt: '2024-03-05',
            settledAt: '2024-03-12',
            settledBy: 'Anna'
        }
    ];
};

// Rozszerzone logi z datami
export const getInitialLogs = (): SettlementLog[] => [
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
        details: 'Rozliczenie oznaczone jako rozliczone'
    },
    {
        id: 3,
        settlementId: 2,
        action: 'modified',
        performedBy: 'Anna',
        timestamp: '2024-03-05 09:20:00',
        details: 'Kwota rozliczenia została zmieniona',
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
