'use client';

import React, {useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {pl} from 'date-fns/locale';
import {
    AccountBalance,
    Analytics,
    Assessment,
    AttachMoney,
    Calculate,
    CalendarToday,
    Category,
    FilterList,
    Groups,
    Person,
    PieChart,
    Receipt,
    Refresh,
    Savings,
    Schedule,
    ShoppingCart,
    Timeline,
    TrendingDown,
    TrendingUp
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`statistics-tabpanel-${index}`}
            aria-labelledby={`statistics-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Przykładowe dane - w rzeczywistej aplikacji pobierałbyś je z API
const mockStatistics = {
    basic: {
        totalExpenses: 4250.80,
        totalIncome: 6500.00,
        balance: 2249.20,
        averageDailyExpenses: 141.69,
        transactionCount: 47,
        averageTransactionAmount: 90.44,
        largestExpense: 850.00,
        smallestExpense: 12.50,
        budgetUsagePercent: 65.4
    },
    comparative: {
        expenseChangePercent: 8.5,
        incomeChangePercent: -2.3,
        mostExpensiveMonth: 'Grudzień 2024',
        trend: 'rosnący',
        expenseToIncomeRatio: 65.4
    },
    categories: {
        mostUsedCategory: 'Żywność',
        mostExpensiveCategory: 'Mieszkanie',
        fastestGrowingCategory: 'Transport',
        categoryBreakdown: [
            {name: 'Żywność', amount: 1700, percent: 40},
            {name: 'Transport', amount: 1062.5, percent: 25},
            {name: 'Mieszkanie', amount: 850, percent: 20},
            {name: 'Rozrywka', amount: 638.3, percent: 15}
        ],
        overBudgetCategories: ['Transport', 'Rozrywka']
    },
    budget: {
        categoriesInBudget: 6,
        categoriesOverBudget: 2,
        averageOverspend: 15.8,
        largestOverspend: 125.50,
        daysInBudgetPercent: 78.3
    },
    household: {
        memberExpenses: [
            {name: 'Anna', amount: 1912.50, percent: 45},
            {name: 'Piotr', amount: 1487.25, percent: 35},
            {name: 'Kasia', amount: 850.05, percent: 20}
        ],
        settlementBalance: 125.50,
        topSpender: 'Anna',
        bottomSpender: 'Kasia',
        sharedPurchasesPercent: 68.2
    },
    advanced: {
        seasonality: 'Wzrost wydatków w miesiącach wakacyjnych (+23%)',
        monthEndProjection: 5200.00,
        averageDailySavings: 74.97,
        fixedToVariableRatio: '60:40',
        savingsRate: 34.6
    }
};

const StatisticCard = ({title, value, subtitle, icon, trend}: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
}) => {
    const getTrendColor = () => {
        switch (trend) {
            case 'up':
                return '#28a745';
            case 'down':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <TrendingUp sx={{color: getTrendColor(), ml: 1}}/>;
            case 'down':
                return <TrendingDown sx={{color: getTrendColor(), ml: 1}}/>;
            default:
                return null;
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: '#f0f8f0',
                border: '1px solid #d4e7d4',
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                },
                transition: 'all 0.3s ease-in-out'
            }}
            elevation={1}
        >
            <CardContent sx={{p: 3, flexGrow: 1}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500}}>
                        {title}
                    </Typography>
                    <Box sx={{color: getTrendColor()}}>
                        {icon}
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" sx={{mb: 1}}>
                    <Typography variant="h4" sx={{fontWeight: 600, color: '#212529'}}>
                        {value}
                    </Typography>
                    {getTrendIcon()}
                </Box>

                {subtitle && (
                    <Typography variant="caption" sx={{color: '#6c757d', fontSize: '0.75rem'}}>
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default function StatisticsPage() {
    const [tabValue, setTabValue] = useState(0);
    const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState<string>('custom');

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handlePeriodChange = (period: string) => {
        const now = new Date();
        setSelectedPeriod(period);

        switch (period) {
            case 'today':
                setStartDate(now);
                setEndDate(now);
                break;
            case 'week':
                const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                setStartDate(weekStart);
                setEndDate(now);
                break;
            case 'month':
                setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
                setEndDate(now);
                break;
            case 'quarter':
                const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
                setStartDate(quarterStart);
                setEndDate(now);
                break;
            case 'year':
                setStartDate(new Date(now.getFullYear(), 0, 1));
                setEndDate(now);
                break;
            case 'custom':
            default:
                break;
        }
    };

    const handleRefresh = () => {
        // Funkcja odświeżania danych - tu byłoby pobieranie z API
        console.log('Odświeżanie danych...');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Box sx={{p: 3}}>
                {/* Główny tytuł */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3}}>
                    <Typography variant="h4" component="h1" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Analytics sx={{fontSize: '2rem', color: '#28a745'}}/>
                        Statystyki Finansowe
                    </Typography>
                    <IconButton
                        onClick={handleRefresh}
                        sx={{
                            backgroundColor: '#f0f8f0',
                            border: '1px solid #d4e7d4',
                            '&:hover': {backgroundColor: '#e6f4e6'}
                        }}
                    >
                        <Refresh/>
                    </IconButton>
                </Box>

                {/* Zaawansowany header wyboru okresu */}
                <Card
                    sx={{
                        backgroundColor: 'linear-gradient(135deg, #f0f8f0 0%, #e6f4e6 100%)',
                        border: '1px solid #d4e7d4',
                        borderRadius: 3,
                        mb: 3,
                        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.1)'
                    }}
                    elevation={2}
                >
                    <CardContent sx={{p: 3}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                            <FilterList sx={{color: '#28a745'}}/>
                            <Typography variant="h6" sx={{fontWeight: 600, color: '#212529'}}>
                                Filtruj dane według okresu
                            </Typography>
                        </Box>

                        {/* Przyciski szybkiego wyboru */}
                        <Box sx={{mb: 3}}>
                            <Typography variant="body2" color="#6c757d" sx={{mb: 1, fontWeight: 500}}>
                                Szybki wybór:
                            </Typography>
                            <ButtonGroup variant="outlined" size="small">
                                <Button
                                    onClick={() => handlePeriodChange('today')}
                                    variant={selectedPeriod === 'today' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'today' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'today' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'today' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Dzisiaj
                                </Button>
                                <Button
                                    onClick={() => handlePeriodChange('week')}
                                    variant={selectedPeriod === 'week' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'week' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'week' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'week' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Ten tydzień
                                </Button>
                                <Button
                                    onClick={() => handlePeriodChange('month')}
                                    variant={selectedPeriod === 'month' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'month' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'month' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'month' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Ten miesiąc
                                </Button>
                                <Button
                                    onClick={() => handlePeriodChange('quarter')}
                                    variant={selectedPeriod === 'quarter' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'quarter' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'quarter' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'quarter' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Ten kwartał
                                </Button>
                                <Button
                                    onClick={() => handlePeriodChange('year')}
                                    variant={selectedPeriod === 'year' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'year' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'year' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'year' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Ten rok
                                </Button>
                                <Button
                                    onClick={() => handlePeriodChange('custom')}
                                    variant={selectedPeriod === 'custom' ? 'contained' : 'outlined'}
                                    sx={{
                                        backgroundColor: selectedPeriod === 'custom' ? '#28a745' : 'transparent',
                                        borderColor: '#28a745',
                                        color: selectedPeriod === 'custom' ? 'white' : '#28a745',
                                        '&:hover': {backgroundColor: selectedPeriod === 'custom' ? '#218838' : '#f0f8f0'}
                                    }}
                                >
                                    Niestandardowy
                                </Button>
                            </ButtonGroup>
                        </Box>

                        {/* Selektory dat */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                    <CalendarToday sx={{fontSize: '1rem', color: '#28a745'}}/>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500}}>
                                        Data rozpoczęcia
                                    </Typography>
                                </Box>
                                <DatePicker
                                    value={startDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setStartDate(newValue instanceof Date ? newValue : newValue.toDate());
                                            setSelectedPeriod('custom');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '&:hover fieldset': {borderColor: '#28a745'},
                                                    '&.Mui-focused fieldset': {borderColor: '#28a745'}
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                    <CalendarToday sx={{fontSize: '1rem', color: '#28a745'}}/>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500}}>
                                        Data zakończenia
                                    </Typography>
                                </Box>
                                <DatePicker
                                    value={endDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setEndDate(newValue instanceof Date ? newValue : newValue.toDate());
                                            setSelectedPeriod('custom');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white',
                                                    '&:hover fieldset': {borderColor: '#28a745'},
                                                    '&.Mui-focused fieldset': {borderColor: '#28a745'}
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{mt: 3}}>
                                    <Typography variant="body2" color="#6c757d" sx={{mb: 1}}>
                                        📊 Wybrany
                                        okres: <strong>{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} dni</strong>
                                    </Typography>
                                    <Typography variant="caption" color="#6c757d">
                                        Od {startDate.toLocaleDateString('pl-PL')} do {endDate.toLocaleDateString('pl-PL')}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab icon={<Assessment/>} label="Podstawowe"/>
                        <Tab icon={<Timeline/>} label="Porównawcze"/>
                        <Tab icon={<Category/>} label="Kategorie"/>
                        <Tab icon={<AccountBalance/>} label="Budżetowe"/>
                        <Tab icon={<Groups/>} label="Domownicy"/>
                        <Tab icon={<Analytics/>} label="Zaawansowane"/>
                    </Tabs>
                </Box>

                {/* Tab 1: Podstawowe statystyki finansowe */}
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Całkowite wydatki"
                                value={`${mockStatistics.basic.totalExpenses.toLocaleString('pl-PL')} zł`}
                                subtitle="w wybranym okresie"
                                icon={<AttachMoney/>}
                                trend="up"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Całkowite przychody"
                                value={`${mockStatistics.basic.totalIncome.toLocaleString('pl-PL')} zł`}
                                subtitle="w wybranym okresie"
                                icon={<TrendingUp/>}
                                trend="neutral"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Bilans"
                                value={`${mockStatistics.basic.balance.toLocaleString('pl-PL')} zł`}
                                subtitle="przychody - wydatki"
                                icon={<AccountBalance/>}
                                trend={mockStatistics.basic.balance > 0 ? 'up' : 'down'}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Średnie wydatki dzienne"
                                value={`${mockStatistics.basic.averageDailyExpenses.toLocaleString('pl-PL')} zł`}
                                subtitle="na podstawie wybranego okresu"
                                icon={<Schedule/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Liczba transakcji"
                                value={mockStatistics.basic.transactionCount}
                                subtitle="w wybranym okresie"
                                icon={<Receipt/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Średnia kwota transakcji"
                                value={`${mockStatistics.basic.averageTransactionAmount.toLocaleString('pl-PL')} zł`}
                                subtitle="na jedną transakcję"
                                icon={<Calculate/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Największy wydatek"
                                value={`${mockStatistics.basic.largestExpense.toLocaleString('pl-PL')} zł`}
                                subtitle="jednorazowy"
                                icon={<TrendingUp/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Najmniejszy wydatek"
                                value={`${mockStatistics.basic.smallestExpense.toLocaleString('pl-PL')} zł`}
                                subtitle="w okresie"
                                icon={<TrendingDown/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Wykorzystanie budżetu"
                                value={`${mockStatistics.basic.budgetUsagePercent}%`}
                                subtitle="w wybranym okresie"
                                icon={<PieChart/>}
                                trend={mockStatistics.basic.budgetUsagePercent > 80 ? 'up' : 'neutral'}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Tab 2: Statystyki porównawcze */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={6}>
                            <StatisticCard
                                title="Zmiana wydatków"
                                value={`${mockStatistics.comparative.expenseChangePercent > 0 ? '+' : ''}${mockStatistics.comparative.expenseChangePercent}%`}
                                subtitle="vs poprzedni miesiąc"
                                icon={<TrendingUp/>}
                                trend={mockStatistics.comparative.expenseChangePercent > 0 ? 'up' : 'down'}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={6}>
                            <StatisticCard
                                title="Zmiana przychodów"
                                value={`${mockStatistics.comparative.incomeChangePercent > 0 ? '+' : ''}${mockStatistics.comparative.incomeChangePercent}%`}
                                subtitle="vs poprzedni miesiąc"
                                icon={<AttachMoney/>}
                                trend={mockStatistics.comparative.incomeChangePercent > 0 ? 'up' : 'down'}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Najdroższy miesiąc"
                                value={mockStatistics.comparative.mostExpensiveMonth}
                                subtitle="w historii"
                                icon={<Schedule/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Trend wydatków"
                                value={mockStatistics.comparative.trend}
                                subtitle="ogólna tendencja"
                                icon={<Timeline/>}
                                trend={mockStatistics.comparative.trend === 'rosnący' ? 'up' : 'down'}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Wydatki do przychodów"
                                value={`${mockStatistics.comparative.expenseToIncomeRatio}%`}
                                subtitle="stosunek wydatków"
                                icon={<Calculate/>}
                                trend={mockStatistics.comparative.expenseToIncomeRatio > 70 ? 'up' : 'neutral'}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Tab 3: Analiza kategorii */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Najczęstsza kategoria"
                                value={mockStatistics.categories.mostUsedCategory}
                                subtitle="największa liczba transakcji"
                                icon={<Category/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Najdroższa kategoria"
                                value={mockStatistics.categories.mostExpensiveCategory}
                                subtitle="najwięcej wydano"
                                icon={<AttachMoney/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Najszybszy wzrost"
                                value={mockStatistics.categories.fastestGrowingCategory}
                                subtitle="kategoria z największym wzrostem"
                                icon={<TrendingUp/>}
                                trend="up"
                            />
                        </Grid>

                        <Grid xs={12} md={8}>
                            <Card
                                sx={{
                                    backgroundColor: '#f0f8f0',
                                    border: '1px solid #d4e7d4',
                                    borderRadius: 3,
                                    minHeight: 300
                                }}
                                elevation={1}
                            >
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 2}}>
                                        Podział wydatków na kategorie
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {mockStatistics.categories.categoryBreakdown.map((category, index) => (
                                            <Grid xs={12} sm={6} key={index}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center"
                                                     sx={{mb: 1}}>
                                                    <Typography variant="body1">{category.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {category.percent}%
                                                        ({category.amount.toLocaleString('pl-PL')} zł)
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width: '100%', bgcolor: '#e9ecef', borderRadius: 1}}>
                                                    <Box
                                                        sx={{
                                                            width: `${category.percent}%`,
                                                            bgcolor: '#28a745',
                                                            height: 8,
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid xs={12} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: '#f0f8f0',
                                    border: '1px solid #d4e7d4',
                                    borderRadius: 3
                                }}
                                elevation={1}
                            >
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 2}}>
                                        Kategorie przekraczające budżet
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        {mockStatistics.categories.overBudgetCategories.map((category, index) => (
                                            <Chip
                                                key={index}
                                                label={category}
                                                sx={{
                                                    backgroundColor: '#fee',
                                                    color: '#dc3545',
                                                    fontSize: '0.75rem'
                                                }}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Tab 4: Statystyki budżetowe */}
                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={3}>
                            <StatisticCard
                                title="Kategorie w normie"
                                value={mockStatistics.budget.categoriesInBudget}
                                subtitle="nie przekraczają budżetu"
                                icon={<Assessment/>}
                                trend="up"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <StatisticCard
                                title="Kategorie przekroczone"
                                value={mockStatistics.budget.categoriesOverBudget}
                                subtitle="przekraczają budżet"
                                icon={<TrendingDown/>}
                                trend="down"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <StatisticCard
                                title="Średnie przekroczenie"
                                value={`${mockStatistics.budget.averageOverspend}%`}
                                subtitle="w kategoriach przekroczonych"
                                icon={<Calculate/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <StatisticCard
                                title="Największe przekroczenie"
                                value={`${mockStatistics.budget.largestOverspend.toLocaleString('pl-PL')} zł`}
                                subtitle="jednorazowe"
                                icon={<AttachMoney/>}
                                trend="down"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={6}>
                            <StatisticCard
                                title="Dni w budżecie"
                                value={`${mockStatistics.budget.daysInBudgetPercent}%`}
                                subtitle="procent dni z dziennym limitem"
                                icon={<Schedule/>}
                                trend={mockStatistics.budget.daysInBudgetPercent > 70 ? 'up' : 'neutral'}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Tab 5: Analiza domowników */}
                <TabPanel value={tabValue} index={4}>
                    <Grid container spacing={3}>
                        <Grid xs={12} md={8}>
                            <Card
                                sx={{
                                    backgroundColor: '#f0f8f0',
                                    border: '1px solid #d4e7d4',
                                    borderRadius: 3
                                }}
                                elevation={1}
                            >
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 3}}>
                                        Udział w wydatkach domowników
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {mockStatistics.household.memberExpenses.map((member, index) => (
                                            <Grid xs={12} sm={6} key={index}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center"
                                                     sx={{mb: 1}}>
                                                    <Typography variant="body1">{member.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {member.percent}% ({member.amount.toLocaleString('pl-PL')} zł)
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width: '100%', bgcolor: '#e9ecef', borderRadius: 1}}>
                                                    <Box
                                                        sx={{
                                                            width: `${member.percent}%`,
                                                            bgcolor: '#28a745',
                                                            height: 8,
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid xs={12} md={4}>
                            <Grid container spacing={2}>
                                <Grid xs={12}>
                                    <StatisticCard
                                        title="Saldo rozliczeń"
                                        value={`${mockStatistics.household.settlementBalance.toLocaleString('pl-PL')} zł`}
                                        subtitle="między domownikami"
                                        icon={<AccountBalance/>}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <StatisticCard
                                        title="Najwięcej wydał"
                                        value={mockStatistics.household.topSpender}
                                        subtitle="w tym okresie"
                                        icon={<Person/>}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <StatisticCard
                                        title="Najmniej wydał"
                                        value={mockStatistics.household.bottomSpender}
                                        subtitle="w tym okresie"
                                        icon={<Person/>}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <StatisticCard
                                        title="Wspólne zakupy"
                                        value={`${mockStatistics.household.sharedPurchasesPercent}%`}
                                        subtitle="vs indywidualne"
                                        icon={<ShoppingCart/>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Tab 6: Statystyki zaawansowane */}
                <TabPanel value={tabValue} index={5}>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Projekcja na koniec miesiąca"
                                value={`${mockStatistics.advanced.monthEndProjection.toLocaleString('pl-PL')} zł`}
                                subtitle="prognoza wydatków"
                                icon={<Timeline/>}
                                trend="up"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Średnie oszczędności dzienne"
                                value={`${mockStatistics.advanced.averageDailySavings.toLocaleString('pl-PL')} zł`}
                                subtitle="pozostaje dziennie"
                                icon={<Savings/>}
                                trend="up"
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <StatisticCard
                                title="Wskaźnik oszczędności"
                                value={`${mockStatistics.advanced.savingsRate}%`}
                                subtitle="% przychodów zostaje"
                                icon={<PieChart/>}
                                trend={mockStatistics.advanced.savingsRate > 20 ? 'up' : 'neutral'}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={6}>
                            <StatisticCard
                                title="Wydatki stałe vs zmienne"
                                value={mockStatistics.advanced.fixedToVariableRatio}
                                subtitle="stosunek wydatków"
                                icon={<Calculate/>}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={6}>
                            <Card
                                sx={{
                                    backgroundColor: '#f0f8f0',
                                    border: '1px solid #d4e7d4',
                                    borderRadius: 3
                                }}
                                elevation={1}
                            >
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 2}}>
                                        Sezonowość wydatków
                                    </Typography>
                                    <Typography variant="body1">
                                        {mockStatistics.advanced.seasonality}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                                        Analiza na podstawie danych historycznych
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>
        </LocalizationProvider>
    );
}
