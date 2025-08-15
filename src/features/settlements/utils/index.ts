import {Settlement, SettlementsStats} from '../types';
import {AccountBalance, MonetizationOn, Receipt} from '@mui/icons-material';

// Statystyki rozliczeń
export const getSettlementsStats = (settlements: Settlement[]): SettlementsStats => {
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
export const getTypeIcon = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return MonetizationOn;
        case 'receipts':
            return Receipt;
        default:
            return AccountBalance;
    }
};

export const getTypeLabel = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return 'Rachunki';
        case 'receipts':
            return 'Paragony';
        default:
            return 'Nieznany';
    }
};

export const getTypeColor = (type: 'bills' | 'receipts') => {
    switch (type) {
        case 'bills':
            return '#007bff';
        case 'receipts':
            return '#28a745';
        default:
            return '#6c757d';
    }
};

// Funkcje pomocnicze dla statusu
export const getStatusColor = (status: string) => {
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

export const getStatusLabel = (status: string) => {
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

// Funkcje pomocnicze dla akcji w logach
export const getActionLabel = (action: string) => {
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
