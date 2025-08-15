import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import {Close, Receipt} from '@mui/icons-material';
import {Settlement} from '../types';
import {getStatusColor, getStatusLabel, getTypeColor, getTypeIcon, getTypeLabel} from '../utils';

interface DetailsModalProps {
    open: boolean;
    settlement: Settlement | null;
    onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
                                                              open,
                                                              settlement,
                                                              onClose
                                                          }) => {
    if (!settlement) return null;

    const TypeIconComponent = getTypeIcon(settlement.type);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{position: 'relative'}}>
                <Typography variant="h6" sx={{fontWeight: 600}}>
                    Szczegóły rozliczenia #{settlement.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{position: 'absolute', top: 8, right: 8}}
                >
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
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
                                    <Typography variant="body1" sx={{fontWeight: 600}}>
                                        {settlement.from}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="#6c757d">Do:</Typography>
                                    <Typography variant="body1" sx={{fontWeight: 600}}>
                                        {settlement.to}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="#6c757d">Kwota:</Typography>
                                    <Typography variant="h6" sx={{fontWeight: 700, color: '#28a745'}}>
                                        {settlement.amount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="#6c757d">Status:</Typography>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="#6c757d">Typ rozliczenia:</Typography>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="#6c757d">Powód:</Typography>
                                    <Typography variant="body1" sx={{fontWeight: 600}}>
                                        {settlement.reason}
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
                            {settlement.receipts.map((receipt, index) => (
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
};
