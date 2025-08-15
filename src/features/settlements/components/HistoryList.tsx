import React from 'react';
import {Box, Card, CardContent, List, ListItem, Pagination, Typography} from '@mui/material';
import {CheckCircle, History} from '@mui/icons-material';
import {Settlement, SettlementLog} from '../types';

interface HistoryListProps {
    logs: SettlementLog[];
    settlements: Settlement[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    onShowDetails: (settlement: Settlement) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
                                                            logs,
                                                            settlements,
                                                            currentPage,
                                                            totalPages,
                                                            totalCount,
                                                            onPageChange,
                                                            onShowDetails
                                                        }) => {
    if (logs.length === 0) {
        return (
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
                    <Box sx={{textAlign: 'center', p: 4}}>
                        <History sx={{fontSize: '4rem', color: '#e9ecef', mb: 2}}/>
                        <Typography variant="h6" color="#6c757d">
                            Brak rozliczeń w tym okresie
                        </Typography>
                        <Typography variant="body2" color="#6c757d">
                            Zmień zakres dat, aby zobaczyć więcej wyników
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
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

                <List sx={{p: 0}}>
                    {logs.map((log, index) => {
                        const settlement = settlements.find(s => s.id === log.settlementId);
                        return (
                            <ListItem
                                key={log.id}
                                sx={{
                                    borderBottom: index === logs.length - 1 ? 'none' : '1px solid #e9ecef',
                                    py: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#f8f9fa',
                                        transform: 'translateX(4px)',
                                        transition: 'all 0.2s ease-in-out'
                                    }
                                }}
                                onClick={() => settlement && onShowDetails(settlement)}
                            >
                                <Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%'}}>
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
                                            <Typography variant="h6" sx={{fontWeight: 600, fontSize: '1rem'}}>
                                                {settlement?.from} → {settlement?.to}
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Typography variant="h6" sx={{fontWeight: 700, color: '#28a745'}}>
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
                {totalPages > 1 && (
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
            </CardContent>
        </Card>
    );
};
