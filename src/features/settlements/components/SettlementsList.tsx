import React from 'react';
import {Box, Button, Card, CardContent, Chip, List, Pagination, Typography} from '@mui/material';
import {AccountBalance, CheckCircle, Close, Schedule, SwapHoriz} from '@mui/icons-material';
import {Settlement} from '../types';
import {getStatusColor, getStatusLabel, getTypeColor, getTypeIcon, getTypeLabel} from '../utils';

interface SettlementsListProps {
    settlements: Settlement[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    searchTerm: string;
    statusFilter: string;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    onShowDetails: (settlement: Settlement) => void;
    onMarkAsSettled: (id: number) => void;
    onCancelSettlement: (id: number) => void;
}

export const SettlementsList: React.FC<SettlementsListProps> = ({
                                                                    settlements,
                                                                    currentPage,
                                                                    totalPages,
                                                                    totalCount,
                                                                    searchTerm,
                                                                    statusFilter,
                                                                    onPageChange,
                                                                    onShowDetails,
                                                                    onMarkAsSettled,
                                                                    onCancelSettlement
                                                                }) => {
    if (settlements.length === 0) {
        return (
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
        );
    }

    return (
        <Box>
            <List sx={{p: 0}}>
                {settlements.map((settlement) => {
                    const TypeIconComponent = getTypeIcon(settlement.type);

                    return (
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
                                            <Typography variant="h6" sx={{fontWeight: 600, fontSize: '1.1rem'}}>
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
                                                    icon={<TypeIconComponent
                                                        sx={{fontSize: '1rem', color: getTypeColor(settlement.type)}}/>}
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
                                                onClick={() => onShowDetails(settlement)}
                                            >
                                                Szczegóły
                                            </Button>

                                            {settlement.status === 'pending' && (
                                                <>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => onMarkAsSettled(settlement.id)}
                                                    >
                                                        Oznacz jako rozliczone
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => onCancelSettlement(settlement.id)}
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
                    );
                })}
            </List>

            {/* Stronicowanie */}
            {totalPages > 1 && (
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
                            Strona {currentPage} z {totalPages}
                            ({totalCount} rozliczeń)
                        </Typography>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={onPageChange}
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
    );
};
