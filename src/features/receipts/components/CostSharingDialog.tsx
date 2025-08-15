import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import {ReceiptItem, UserWhoPaid} from '../api/ReceiptModel';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EuroIcon from '@mui/icons-material/Euro';

interface CostSharingDialogProps {
    open: boolean;
    onClose: () => void;
    items: ReceiptItem[];
    whoPaid: UserWhoPaid | null;
    users: UserWhoPaid[];
}

interface UserDebt {
    user: UserWhoPaid;
    totalDebt: number;
    items: ReceiptItem[];
}

export default function CostSharingDialog({open, onClose, items, whoPaid, users}: CostSharingDialogProps) {
    const calculateCostSharing = (): UserDebt[] => {
        const userDebts = new Map<number, UserDebt>();

        // Sprawdź czy whoPaid istnieje
        if (!whoPaid) {
            return [];
        }

        // Inicjalizuj mapę dla wszystkich użytkowników
        users.forEach(user => {
            if (user.userId !== whoPaid.userId) {
                userDebts.set(user.userId, {
                    user,
                    totalDebt: 0,
                    items: []
                });
            }
        });

        // Oblicz długi dla każdego użytkownika
        items.forEach(item => {
            if (item.userToReturnMoney && item.moneyDividing && typeof item.moneyDividing === 'number') {
                const userDebt = userDebts.get(item.userToReturnMoney.userId);
                if (userDebt) {
                    userDebt.totalDebt = (userDebt.totalDebt || 0) + item.moneyDividing;
                    userDebt.items.push(item);
                }
            }
        });

        return Array.from(userDebts.values()).filter(debt => debt.totalDebt > 0);
    };

    const userDebts = calculateCostSharing();
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Jeśli whoPaid nie istnieje, nie wyświetlaj dialogu
    if (!whoPaid) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxHeight: '85vh',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }
            }}
        >
            <DialogTitle sx={{
                pb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Box sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <AccountBalanceWalletIcon sx={{fontSize: 28}}/>
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            Podział kosztów
                        </Typography>
                        <Typography variant="body2" sx={{opacity: 0.9}}>
                            Zobacz kto ile ma oddać pieniędzy
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent sx={{p: 3, bgcolor: 'transparent'}}>
                {/* Sekcja podsumowania */}
                <Card elevation={6} sx={{mb: 3, borderRadius: 3, overflow: 'visible'}}>
                    <CardContent sx={{p: 3}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                            <Avatar sx={{bgcolor: 'primary.main', width: 48, height: 48}}>
                                <ReceiptIcon/>
                            </Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="primary.main">
                                    Podsumowanie paragonu
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Szczegóły zakupów i płatności
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'success.50',
                                    border: '1px solid',
                                    borderColor: 'success.200'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                        <EuroIcon color="success"/>
                                        <Typography variant="body2" color="success.dark" fontWeight="medium">
                                            Całkowita kwota
                                        </Typography>
                                    </Box>
                                    <Typography variant="h4" fontWeight="bold" color="success.main">
                                        {totalAmount.toFixed(2)} zł
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'info.50',
                                    border: '1px solid',
                                    borderColor: 'info.200'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                        <PersonIcon color="info"/>
                                        <Typography variant="body2" color="info.dark" fontWeight="medium">
                                            Zapłacił
                                        </Typography>
                                    </Box>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                        <Avatar sx={{bgcolor: 'info.main', width: 32, height: 32}}>
                                            {whoPaid.userName.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography variant="h6" fontWeight="bold" color="info.main">
                                            {whoPaid.userName}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Sekcja długów */}
                {userDebts.length > 0 ? (
                    <Card elevation={6} sx={{borderRadius: 3}}>
                        <CardContent sx={{p: 3}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                                <Avatar sx={{bgcolor: 'error.main', width: 48, height: 48}}>
                                    <ArrowForwardIcon/>
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" color="error.main">
                                        Rozliczenia
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {userDebts.length} {userDebts.length === 1 ? 'osoba ma' : 'osób ma'} coś do
                                        oddania
                                    </Typography>
                                </Box>
                            </Box>

                            <Grid container spacing={2}>
                                {userDebts.map((userDebt) => (
                                    <Grid item xs={12} key={userDebt.user.userId}>
                                        <Card
                                            elevation={2}
                                            sx={{
                                                borderRadius: 2,
                                                border: '2px solid',
                                                borderColor: 'error.100',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: 'error.300',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 4
                                                }
                                            }}
                                        >
                                            <CardContent sx={{p: 2.5}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    mb: 2
                                                }}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                        <Avatar sx={{bgcolor: 'error.main', width: 56, height: 56}}>
                                                            <Typography variant="h5" fontWeight="bold">
                                                                {userDebt.user.userName.charAt(0).toUpperCase()}
                                                            </Typography>
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="h6" fontWeight="bold">
                                                                {userDebt.user.userName}
                                                            </Typography>
                                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    ma oddać
                                                                </Typography>
                                                                <ArrowForwardIcon fontSize="small" color="action"/>
                                                                <Chip
                                                                    label={whoPaid.userName}
                                                                    size="small"
                                                                    color="info"
                                                                    variant="outlined"
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{textAlign: 'right'}}>
                                                        <Typography variant="h4" fontWeight="bold" color="error.main">
                                                            {userDebt.totalDebt.toFixed(2)} zł
                                                        </Typography>
                                                        <Chip
                                                            label={`${userDebt.items.length} ${userDebt.items.length === 1 ? 'produkt' : 'produktów'}`}
                                                            size="small"
                                                            color="warning"
                                                            variant="filled"
                                                        />
                                                    </Box>
                                                </Box>

                                                <Divider sx={{my: 2}}/>

                                                {/* Szczegóły produktów */}
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    Szczegóły produktów:
                                                </Typography>
                                                <Box sx={{maxHeight: 120, overflow: 'auto'}}>
                                                    {userDebt.items.map((item, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                p: 1,
                                                                mb: 0.5,
                                                                borderRadius: 1,
                                                                bgcolor: 'grey.50',
                                                                '&:hover': {
                                                                    bgcolor: 'grey.100'
                                                                }
                                                            }}
                                                        >
                                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                                <Avatar sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    bgcolor: 'primary.main',
                                                                    fontSize: '0.75rem'
                                                                }}>
                                                                    {item.quantity}
                                                                </Avatar>
                                                                <Typography variant="body2" fontWeight="medium">
                                                                    {item.productName}
                                                                </Typography>
                                                            </Box>
                                                            <Chip
                                                                label={`${item.moneyDividing?.toFixed(2)} zł`}
                                                                size="small"
                                                                color="error"
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                ) : (
                    <Card elevation={6} sx={{borderRadius: 3, textAlign: 'center'}}>
                        <CardContent sx={{p: 4}}>
                            <Avatar sx={{bgcolor: 'success.main', width: 80, height: 80, mx: 'auto', mb: 2}}>
                                <PersonIcon sx={{fontSize: 40}}/>
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
                                Świetnie! Brak długów
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Wszystkie koszty zostały pokryte przez osobę, która zapłaciła za paragon.
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </DialogContent>

            <DialogActions sx={{p: 3, bgcolor: 'transparent'}}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                        }
                    }}
                >
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
}
