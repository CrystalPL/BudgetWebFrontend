'use client'
import React, {useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    List,
    MenuItem,
    Select,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import {
    AccountBalance,
    Analytics,
    Assessment,
    CalendarToday,
    CheckCircle,
    Close,
    Description,
    Download,
    FileDownload,
    FilterList,
    GetApp,
    Groups,
    History,
    MonetizationOn,
    PictureAsPdf,
    PieChart,
    Receipt,
    Schedule,
    Settings,
    Timeline,
    TrendingUp,
    Visibility,
    Warning
} from '@mui/icons-material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {pl} from 'date-fns/locale';

// Interfejsy dla raportów
interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    category: 'financial' | 'budget' | 'household' | 'analytics' | 'custom';
    icon: React.ReactNode;
    estimatedTime: string;
    complexity: 'basic' | 'intermediate' | 'advanced';
    requiresData: string[];
    outputFormats: ('pdf' | 'excel' | 'csv' | 'json')[];
    features: string[];
}

interface ReportConfig {
    templateId: string;
    name: string;
    dateRange: {
        start: Date;
        end: Date;
    };
    filters: {
        categories: string[];
        users: string[];
        minAmount?: number;
        maxAmount?: number;
        includeSettlements: boolean;
        includeBills: boolean;
        includeReceipts: boolean;
    };
    groupBy: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'category' | 'user';
    outputFormat: 'pdf' | 'excel' | 'csv' | 'json';
    includeCharts: boolean;
    includeStatistics: boolean;
    includeComparisons: boolean;
    autoSchedule?: {
        enabled: boolean;
        frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
        recipients: string[];
        nextRun?: Date;
    };
}

interface GeneratedReport {
    id: string;
    name: string;
    templateName: string;
    generatedAt: Date;
    size: string;
    status: 'generating' | 'completed' | 'failed' | 'scheduled';
    downloadUrl?: string;
    previewUrl?: string;
    config: ReportConfig;
}

interface ScheduledReport {
    id: string;
    name: string;
    templateId: string;
    templateName: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    nextRun: Date;
    lastRun?: Date;
    recipients: string[];
    isActive: boolean;
    config: ReportConfig;
    createdAt: Date;
}

// Szablony raportów
const reportTemplates: ReportTemplate[] = [
    {
        id: 'monthly-summary',
        name: 'Miesięczne podsumowanie finansowe',
        description: 'Kompleksowy przegląd wydatków, przychodów i bilansu za wybrany miesiąc',
        category: 'financial',
        icon: <Assessment/>,
        estimatedTime: '2-3 min',
        complexity: 'basic',
        requiresData: ['transactions', 'budgets', 'categories'],
        outputFormats: ['pdf', 'excel'],
        features: ['Wykresy trendów', 'Porównanie z poprzednim miesiącem', 'Analiza kategorii', 'Przekroczenia budżetu']
    },
    {
        id: 'expense-analysis',
        name: 'Analiza wydatków według kategorii',
        description: 'Szczegółowa analiza wydatków z podziałem na kategorie i podkategorie',
        category: 'analytics',
        icon: <PieChart/>,
        estimatedTime: '3-5 min',
        complexity: 'intermediate',
        requiresData: ['transactions', 'categories', 'subcategories'],
        outputFormats: ['pdf', 'excel', 'csv'],
        features: ['Wykresy kołowe', 'Ranking kategorii', 'Trend czasowy', 'Przewidywania']
    },
    {
        id: 'household-settlements',
        name: 'Rozliczenia między domownikami',
        description: 'Raport rozliczeń, długów i płatności między członkami gospodarstwa',
        category: 'household',
        icon: <Groups/>,
        estimatedTime: '1-2 min',
        complexity: 'basic',
        requiresData: ['settlements', 'users', 'shared_expenses'],
        outputFormats: ['pdf', 'excel'],
        features: ['Saldo rozliczeń', 'Historia płatności', 'Wspólne wydatki', 'Rekomendacje']
    },
    {
        id: 'budget-performance',
        name: 'Realizacja budżetu',
        description: 'Analiza wykonania budżetu z alertami o przekroczeniach',
        category: 'budget',
        icon: <TrendingUp/>,
        estimatedTime: '2-4 min',
        complexity: 'intermediate',
        requiresData: ['budgets', 'transactions', 'targets'],
        outputFormats: ['pdf', 'excel'],
        features: ['Wskaźniki realizacji', 'Alerty', 'Prognozy', 'Rekomendacje oszczędnościowe']
    },
    {
        id: 'bills-tracking',
        name: 'Śledzenie rachunków i płatności',
        description: 'Przegląd wszystkich rachunków, terminów płatności i statusów',
        category: 'financial',
        icon: <Receipt/>,
        estimatedTime: '1-2 min',
        complexity: 'basic',
        requiresData: ['bills', 'payments', 'due_dates'],
        outputFormats: ['pdf', 'excel', 'csv'],
        features: ['Kalendarz płatności', 'Przeterminowane', 'Przypomnienia', 'Statystyki']
    },
    {
        id: 'yearly-summary',
        name: 'Roczne podsumowanie finansowe',
        description: 'Kompleksowy raport roczny z trendami i prognozami',
        category: 'financial',
        icon: <Timeline/>,
        estimatedTime: '5-8 min',
        complexity: 'advanced',
        requiresData: ['transactions', 'budgets', 'categories', 'goals'],
        outputFormats: ['pdf'],
        features: ['Analiza trendów', 'Osiągnięte cele', 'Porównanie rok do roku', 'Plan na przyszły rok']
    },
    {
        id: 'custom-analytics',
        name: 'Niestandardowa analiza',
        description: 'Twórz własne raporty z wybranymi wskaźnikami i filtrami',
        category: 'custom',
        icon: <Settings/>,
        estimatedTime: '3-10 min',
        complexity: 'advanced',
        requiresData: ['all_available'],
        outputFormats: ['pdf', 'excel', 'csv', 'json'],
        features: ['Własne filtry', 'Wybór wskaźników', 'Niestandardowe wykresy', 'Zaawansowane grupowanie']
    },
    {
        id: 'tax-preparation',
        name: 'Przygotowanie do rozliczenia podatkowego',
        description: 'Zestawienie wydatków i dochodów przydatnych przy rozliczeniu PIT',
        category: 'financial',
        icon: <Description/>,
        estimatedTime: '4-6 min',
        complexity: 'intermediate',
        requiresData: ['transactions', 'categories', 'tax_categories'],
        outputFormats: ['pdf', 'excel'],
        features: ['Kategorie podatkowe', 'Zestawienie roczne', 'Dokumenty', 'Wytyczne']
    }
];

// Przykładowe wygenerowane raporty
const mockGeneratedReports: GeneratedReport[] = [
    {
        id: '1',
        name: 'Podsumowanie Styczeń 2024',
        templateName: 'Miesięczne podsumowanie finansowe',
        generatedAt: new Date('2024-02-01'),
        size: '2.1 MB',
        status: 'completed',
        downloadUrl: '#',
        previewUrl: '#',
        config: {} as ReportConfig
    },
    {
        id: '2',
        name: 'Analiza wydatków Q4 2023',
        templateName: 'Analiza wydatków według kategorii',
        generatedAt: new Date('2024-01-15'),
        size: '1.8 MB',
        status: 'completed',
        downloadUrl: '#',
        config: {} as ReportConfig
    },
    {
        id: '3',
        name: 'Rozliczenia domowników - Grudzień',
        templateName: 'Rozliczenia między domownikami',
        generatedAt: new Date('2024-01-02'),
        size: '856 KB',
        status: 'completed',
        config: {} as ReportConfig
    },
    {
        id: '4',
        name: 'Raport budżetowy - generowanie...',
        templateName: 'Realizacja budżetu',
        generatedAt: new Date(),
        size: '0 KB',
        status: 'generating',
        config: {} as ReportConfig
    }
];

// Przykładowe zaplanowane raporty
const mockScheduledReports: ScheduledReport[] = [
    {
        id: '1',
        name: 'Miesięczne podsumowanie - automatyczne',
        templateId: 'monthly-summary',
        templateName: 'Miesięczne podsumowanie finansowe',
        frequency: 'monthly',
        nextRun: new Date(2024, 2, 1), // 1 marca 2024
        lastRun: new Date(2024, 1, 1), // 1 lutego 2024
        recipients: ['anna@example.com', 'piotr@example.com'],
        isActive: true,
        config: {} as ReportConfig,
        createdAt: new Date(2024, 0, 15)
    },
    {
        id: '2',
        name: 'Tygodniowe rozliczenia',
        templateId: 'household-settlements',
        templateName: 'Rozliczenia między domownikami',
        frequency: 'weekly',
        nextRun: new Date(2024, 1, 19), // 19 lutego 2024
        recipients: ['kasia@example.com'],
        isActive: true,
        config: {} as ReportConfig,
        createdAt: new Date(2024, 0, 10)
    }
];

// Dane do filtrów
const availableCategories = ['Żywność', 'Transport', 'Mieszkanie', 'Rozrywka', 'Zdrowie', 'Edukacja', 'Inne'];
const availableUsers = ['Anna', 'Piotr', 'Kasia'];

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
    const [reportConfig, setReportConfig] = useState<Partial<ReportConfig>>({
        dateRange: {
            start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end: new Date()
        },
        filters: {
            categories: [],
            users: [],
            includeSettlements: true,
            includeBills: true,
            includeReceipts: true
        },
        groupBy: 'month',
        outputFormat: 'pdf',
        includeCharts: true,
        includeStatistics: true,
        includeComparisons: true,
        autoSchedule: {
            enabled: false,
            frequency: 'monthly',
            recipients: []
        }
    });
    const [configDialogOpen, setConfigDialogOpen] = useState(false);
    const [configStep, setConfigStep] = useState(0);
    const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(mockGeneratedReports);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Nowe state dla zaplanowanych raportów
    const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(mockScheduledReports);
    const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<ScheduledReport | null>(null);
    const [newSchedule, setNewSchedule] = useState<Partial<ScheduledReport>>({
        name: '',
        templateId: '',
        frequency: 'monthly',
        recipients: [],
        isActive: true
    });

    // Funkcje pomocnicze
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'financial':
                return <MonetizationOn sx={{color: '#28a745'}}/>;
            case 'budget':
                return <AccountBalance sx={{color: '#007bff'}}/>;
            case 'household':
                return <Groups sx={{color: '#ffc107'}}/>;
            case 'analytics':
                return <Analytics sx={{color: '#6f42c1'}}/>;
            case 'custom':
                return <Settings sx={{color: '#6c757d'}}/>;
            default:
                return <Assessment sx={{color: '#28a745'}}/>;
        }
    };

    const getComplexityColor = (complexity: string) => {
        switch (complexity) {
            case 'basic':
                return '#28a745';
            case 'intermediate':
                return '#ffc107';
            case 'advanced':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle sx={{color: '#28a745'}}/>;
            case 'generating':
                return <Schedule sx={{color: '#ffc107'}}/>;
            case 'failed':
                return <Warning sx={{color: '#dc3545'}}/>;
            case 'scheduled':
                return <CalendarToday sx={{color: '#007bff'}}/>;
            default:
                return <Description/>;
        }
    };

    const getFrequencyLabel = (frequency: string) => {
        switch (frequency) {
            case 'daily':
                return 'Codziennie';
            case 'weekly':
                return 'Co tydzień';
            case 'monthly':
                return 'Co miesiąc';
            case 'quarterly':
                return 'Co kwartał';
            default:
                return frequency;
        }
    };

    // Funkcja edycji harmonogramu
    const handleEditSchedule = (schedule: ScheduledReport) => {
        setEditingSchedule(schedule);
        setNewSchedule({
            name: schedule.name,
            templateId: schedule.templateId,
            frequency: schedule.frequency,
            recipients: schedule.recipients,
            isActive: schedule.isActive
        });
        setScheduleDialogOpen(true);
    };

    // Funkcja dodawania/edycji harmonogramu
    const handleSaveSchedule = () => {
        if (!newSchedule.name || !newSchedule.templateId || !newSchedule.frequency) return;

        const template = reportTemplates.find(t => t.id === newSchedule.templateId);
        if (!template) return;

        if (editingSchedule) {
            // Edycja istniejącego harmonogramu
            setScheduledReports(prev => prev.map(schedule =>
                schedule.id === editingSchedule.id
                    ? {
                        ...schedule,
                        name: newSchedule.name!,
                        templateId: newSchedule.templateId!,
                        templateName: template.name,
                        frequency: newSchedule.frequency!,
                        recipients: newSchedule.recipients || [],
                        isActive: newSchedule.isActive ?? true,
                        nextRun: calculateNextRun(newSchedule.frequency!),
                        config: reportConfig as ReportConfig
                    }
                    : schedule
            ));
        } else {
            // Dodanie nowego harmonogramu
            const schedule: ScheduledReport = {
                id: Date.now().toString(),
                name: newSchedule.name,
                templateId: newSchedule.templateId,
                templateName: template.name,
                frequency: newSchedule.frequency,
                nextRun: calculateNextRun(newSchedule.frequency),
                recipients: newSchedule.recipients || [],
                isActive: true,
                config: reportConfig as ReportConfig,
                createdAt: new Date()
            };

            setScheduledReports(prev => [schedule, ...prev]);
        }

        setScheduleDialogOpen(false);
        setEditingSchedule(null);
        setNewSchedule({
            name: '',
            templateId: '',
            frequency: 'monthly',
            recipients: [],
            isActive: true
        });
    };

    // Funkcja obliczania następnego uruchomienia
    const calculateNextRun = (frequency: string): Date => {
        const now = new Date();
        switch (frequency) {
            case 'daily':
                return new Date(now.getTime() + 24 * 60 * 60 * 1000);
            case 'weekly':
                return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            case 'monthly':
                const nextMonth = new Date(now);
                nextMonth.setMonth(now.getMonth() + 1);
                return nextMonth;
            case 'quarterly':
                const nextQuarter = new Date(now);
                nextQuarter.setMonth(now.getMonth() + 3);
                return nextQuarter;
            default:
                return new Date(now.getTime() + 24 * 60 * 60 * 1000);
        }
    };

    // Funkcja usuwania harmonogramu
    const handleDeleteSchedule = (scheduleId: string) => {
        setScheduledReports(prev => prev.filter(schedule => schedule.id !== scheduleId));
    };

    // Funkcja toggle aktywności harmonogramu
    const handleToggleSchedule = (scheduleId: string) => {
        setScheduledReports(prev => prev.map(schedule =>
            schedule.id === scheduleId
                ? {...schedule, isActive: !schedule.isActive}
                : schedule
        ));
    };

    // Obsługa generowania raportu
    const handleGenerateReport = () => {
        if (!selectedTemplate || !reportConfig.dateRange) return;

        const newReport: GeneratedReport = {
            id: Date.now().toString(),
            name: `${selectedTemplate.name} - ${new Date().toLocaleDateString('pl-PL')}`,
            templateName: selectedTemplate.name,
            generatedAt: new Date(),
            size: '0 KB',
            status: 'generating',
            config: reportConfig as ReportConfig
        };

        setGeneratedReports(prev => [newReport, ...prev]);
        setConfigDialogOpen(false);

        // Symulacja generowania
        setTimeout(() => {
            setGeneratedReports(prev => prev.map(report =>
                report.id === newReport.id
                    ? {...report, status: 'completed', size: '1.2 MB', downloadUrl: '#'}
                    : report
            ));
        }, 3000);
    };

    // Filtrowanie szablonów
    const filteredTemplates = reportTemplates.filter(template =>
        filterCategory === 'all' || template.category === filterCategory
    );

    // Funkcja zamykania dialogu
    const handleCloseScheduleDialog = () => {
        setScheduleDialogOpen(false);
        setEditingSchedule(null);
        setNewSchedule({
            name: '',
            templateId: '',
            frequency: 'monthly',
            recipients: [],
            isActive: true
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Box sx={{flexGrow: 1, p: 3, backgroundColor: '#ffffff', minHeight: '100vh'}}>
                {/* Nagłówek strony */}
                <Box sx={{mb: 4}}>
                    <Typography variant="h4" sx={{fontWeight: 700, color: '#212529', mb: 1}}>
                        <Assessment sx={{fontSize: '2rem', mr: 1, verticalAlign: 'middle', color: '#28a745'}}/>
                        Generator Raportów
                    </Typography>
                    <Typography variant="body1" color="#6c757d" sx={{fontSize: '1.1rem'}}>
                        Twórz szczegółowe raporty finansowe, analizy budżetu i zestawienia dla gospodarstwa domowego
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
                            icon={<Assessment/>}
                            iconPosition="start"
                            label="Szablony raportów"
                        />
                        <Tab
                            icon={<History/>}
                            iconPosition="start"
                            label="Wygenerowane raporty"
                        />
                        <Tab
                            icon={<Schedule/>}
                            iconPosition="start"
                            label="Zaplanowane raporty"
                        />
                    </Tabs>
                </Card>

                {/* Zakładka 1: Szablony raportów */}
                {activeTab === 0 && (
                    <Box>
                        {/* Filtry kategorii */}
                        <Card sx={{mb: 3, p: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                <FilterList sx={{color: '#28a745'}}/>
                                <Typography variant="h6" sx={{fontWeight: 600}}>
                                    Filtruj szablony według kategorii
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                <Chip
                                    label="Wszystkie"
                                    onClick={() => setFilterCategory('all')}
                                    color={filterCategory === 'all' ? 'primary' : 'default'}
                                    variant={filterCategory === 'all' ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    icon={<MonetizationOn/>}
                                    label="Finansowe"
                                    onClick={() => setFilterCategory('financial')}
                                    color={filterCategory === 'financial' ? 'primary' : 'default'}
                                    variant={filterCategory === 'financial' ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    icon={<AccountBalance/>}
                                    label="Budżetowe"
                                    onClick={() => setFilterCategory('budget')}
                                    color={filterCategory === 'budget' ? 'primary' : 'default'}
                                    variant={filterCategory === 'budget' ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    icon={<Groups/>}
                                    label="Domownicy"
                                    onClick={() => setFilterCategory('household')}
                                    color={filterCategory === 'household' ? 'primary' : 'default'}
                                    variant={filterCategory === 'household' ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    icon={<Analytics/>}
                                    label="Analityczne"
                                    onClick={() => setFilterCategory('analytics')}
                                    color={filterCategory === 'analytics' ? 'primary' : 'default'}
                                    variant={filterCategory === 'analytics' ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    icon={<Settings/>}
                                    label="Niestandardowe"
                                    onClick={() => setFilterCategory('custom')}
                                    color={filterCategory === 'custom' ? 'primary' : 'default'}
                                    variant={filterCategory === 'custom' ? 'filled' : 'outlined'}
                                />
                            </Box>
                        </Card>

                        {/* Lista szablonów */}
                        <Grid container spacing={3}>
                            {filteredTemplates.map((template) => (
                                <Grid item xs={12} md={6} lg={4} key={template.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid #e9ecef',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                                borderColor: '#28a745'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{flexGrow: 1, p: 3}}>
                                            {/* Header karty */}
                                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                <Box sx={{mr: 2}}>
                                                    {getCategoryIcon(template.category)}
                                                </Box>
                                                <Box sx={{flexGrow: 1}}>
                                                    <Typography variant="h6" sx={{fontWeight: 600, mb: 0.5}}>
                                                        {template.name}
                                                    </Typography>
                                                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                        <Chip
                                                            size="small"
                                                            label={template.complexity}
                                                            sx={{
                                                                backgroundColor: `${getComplexityColor(template.complexity)}20`,
                                                                color: getComplexityColor(template.complexity),
                                                                fontSize: '0.7rem',
                                                                height: 20
                                                            }}
                                                        />
                                                        <Typography variant="caption" color="#6c757d">
                                                            {template.estimatedTime}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {/* Opis */}
                                            <Typography variant="body2" color="#6c757d" sx={{mb: 2, lineHeight: 1.5}}>
                                                {template.description}
                                            </Typography>

                                            {/* Funkcje */}
                                            <Box sx={{mb: 2}}>
                                                <Typography variant="subtitle2"
                                                            sx={{fontWeight: 600, mb: 1, color: '#28a745'}}>
                                                    Funkcje raportu:
                                                </Typography>
                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                                    {template.features.slice(0, 3).map((feature, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={feature}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{fontSize: '0.65rem', height: 22}}
                                                        />
                                                    ))}
                                                    {template.features.length > 3 && (
                                                        <Chip
                                                            label={`+${template.features.length - 3} więcej`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{fontSize: '0.65rem', height: 22}}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>

                                            {/* Formaty eksportu */}
                                            <Box sx={{mb: 3}}>
                                                <Typography variant="subtitle2"
                                                            sx={{fontWeight: 600, mb: 1, color: '#007bff'}}>
                                                    Dostępne formaty:
                                                </Typography>
                                                <Box sx={{display: 'flex', gap: 0.5}}>
                                                    {template.outputFormats.map((format) => (
                                                        <Chip
                                                            key={format}
                                                            label={format.toUpperCase()}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#e3f2fd',
                                                                color: '#007bff',
                                                                fontSize: '0.65rem',
                                                                height: 22
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>

                                            {/* Przycisk generowania */}
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<GetApp/>}
                                                onClick={() => {
                                                    setSelectedTemplate(template);
                                                    setConfigDialogOpen(true);
                                                    setConfigStep(0);
                                                }}
                                                sx={{
                                                    backgroundColor: '#28a745',
                                                    '&:hover': {backgroundColor: '#218838'},
                                                    borderRadius: 2,
                                                    py: 1
                                                }}
                                            >
                                                Generuj raport
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Zakładka 2: Wygenerowane raporty */}
                {activeTab === 1 && (
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                Historia wygenerowanych raportów
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<FileDownload/>}
                                sx={{borderColor: '#28a745', color: '#28a745'}}
                            >
                                Pobierz wszystkie
                            </Button>
                        </Box>

                        {generatedReports.length === 0 ? (
                            <Card sx={{textAlign: 'center', p: 4}}>
                                <Description sx={{fontSize: '4rem', color: '#e9ecef', mb: 2}}/>
                                <Typography variant="h6" color="#6c757d" sx={{mb: 1}}>
                                    Brak wygenerowanych raportów
                                </Typography>
                                <Typography variant="body2" color="#6c757d">
                                    Wygeneruj pierwszy raport wybierając szablon z poprzedniej zakładki
                                </Typography>
                            </Card>
                        ) : (
                            <List sx={{p: 0}}>
                                {generatedReports.map((report) => (
                                    <Card key={report.id} sx={{mb: 2, border: '1px solid #e9ecef'}}>
                                        <CardContent sx={{p: 3}}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                                                    <Box sx={{mr: 2}}>
                                                        {getStatusIcon(report.status)}
                                                    </Box>
                                                    <Box sx={{flexGrow: 1}}>
                                                        <Typography variant="h6" sx={{fontWeight: 600, mb: 0.5}}>
                                                            {report.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="#6c757d" sx={{mb: 1}}>
                                                            Szablon: {report.templateName} • Rozmiar: {report.size}
                                                        </Typography>
                                                        <Typography variant="caption" color="#6c757d">
                                                            Wygenerowany: {report.generatedAt.toLocaleString('pl-PL')}
                                                        </Typography>
                                                        {report.status === 'generating' && (
                                                            <Box sx={{mt: 1}}>
                                                                <LinearProgress sx={{height: 4, borderRadius: 2}}/>
                                                                <Typography variant="caption" color="#6c757d"
                                                                            sx={{mt: 0.5, display: 'block'}}>
                                                                    Generowanie raportu...
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', gap: 1}}>
                                                    {report.status === 'completed' && (
                                                        <>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                startIcon={<Visibility/>}
                                                                onClick={() => {
                                                                    setSelectedReport(report);
                                                                    setPreviewDialogOpen(true);
                                                                }}
                                                            >
                                                                Podgląd
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                startIcon={<Download/>}
                                                                sx={{backgroundColor: '#28a745'}}
                                                            >
                                                                Pobierz
                                                            </Button>
                                                        </>
                                                    )}
                                                    {report.status === 'failed' && (
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="error"
                                                            startIcon={<Warning/>}
                                                        >
                                                            Błąd
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </List>
                        )}
                    </Box>
                )}

                {/* Zakładka 3: Zaplanowane raporty */}
                {activeTab === 2 && (
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                Automatyczne generowanie raportów
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Schedule/>}
                                onClick={() => setScheduleDialogOpen(true)}
                                sx={{backgroundColor: '#28a745'}}
                            >
                                Dodaj harmonogram
                            </Button>
                        </Box>

                        {scheduledReports.length === 0 ? (
                            <Card sx={{p: 3, textAlign: 'center'}}>
                                <Schedule sx={{fontSize: '4rem', color: '#e9ecef', mb: 2}}/>
                                <Typography variant="h6" color="#6c757d" sx={{mb: 1}}>
                                    Brak zaplanowanych raportów
                                </Typography>
                                <Typography variant="body2" color="#6c757d" sx={{mb: 3}}>
                                    Dodaj automatyczne generowanie raportów w regularnych odstępach czasu
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Schedule/>}
                                    onClick={() => setScheduleDialogOpen(true)}
                                    sx={{backgroundColor: '#28a745'}}
                                >
                                    Dodaj pierwszy harmonogram
                                </Button>
                            </Card>
                        ) : (
                            <List sx={{p: 0}}>
                                {scheduledReports.map((schedule) => (
                                    <Card key={schedule.id} sx={{mb: 2, border: '1px solid #e9ecef'}}>
                                        <CardContent sx={{p: 3}}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                                                    <Box sx={{mr: 2}}>
                                                        <CalendarToday
                                                            sx={{color: schedule.isActive ? '#28a745' : '#6c757d'}}/>
                                                    </Box>
                                                    <Box sx={{flexGrow: 1}}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            mb: 0.5
                                                        }}>
                                                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                                                {schedule.name}
                                                            </Typography>
                                                            <Chip
                                                                size="small"
                                                                label={schedule.isActive ? 'Aktywny' : 'Nieaktywny'}
                                                                color={schedule.isActive ? 'success' : 'default'}
                                                                sx={{height: 20}}
                                                            />
                                                        </Box>
                                                        <Typography variant="body2" color="#6c757d" sx={{mb: 1}}>
                                                            Szablon: {schedule.templateName} •
                                                            Częstotliwość: {getFrequencyLabel(schedule.frequency)}
                                                        </Typography>
                                                        <Typography variant="caption" color="#6c757d"
                                                                    sx={{display: 'block'}}>
                                                            Następne
                                                            uruchomienie: {schedule.nextRun.toLocaleString('pl-PL')}
                                                        </Typography>
                                                        {schedule.lastRun && (
                                                            <Typography variant="caption" color="#6c757d"
                                                                        sx={{display: 'block'}}>
                                                                Ostatnie
                                                                uruchomienie: {schedule.lastRun.toLocaleString('pl-PL')}
                                                            </Typography>
                                                        )}
                                                        {schedule.recipients.length > 0 && (
                                                            <Box sx={{mt: 1}}>
                                                                <Typography variant="caption" color="#6c757d">
                                                                    Odbiorcy: {schedule.recipients.join(', ')}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                    <Switch
                                                        checked={schedule.isActive}
                                                        onChange={() => handleToggleSchedule(schedule.id)}
                                                        size="small"
                                                    />
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<Settings/>}
                                                        onClick={() => handleEditSchedule(schedule)}
                                                        sx={{
                                                            minWidth: 'auto',
                                                            borderColor: '#007bff',
                                                            color: '#007bff',
                                                            '&:hover': {
                                                                borderColor: '#0056b3',
                                                                backgroundColor: '#e3f2fd'
                                                            }
                                                        }}
                                                    >
                                                        Edytuj
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        startIcon={<Close/>}
                                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                                        sx={{minWidth: 'auto'}}
                                                    >
                                                        Usuń
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </List>
                        )}
                    </Box>
                )}

                {/* Dialog konfiguracji raportu */}
                <Dialog
                    open={configDialogOpen}
                    onClose={() => setConfigDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{position: 'relative'}}>
                        <Typography variant="h6" sx={{fontWeight: 600}}>
                            Konfiguracja raportu: {selectedTemplate?.name}
                        </Typography>
                        <IconButton
                            onClick={() => setConfigDialogOpen(false)}
                            sx={{position: 'absolute', top: 8, right: 8}}
                        >
                            <Close/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Stepper activeStep={configStep} orientation="vertical">
                            {/* Krok 1: Okres i podstawowe ustawienia */}
                            <Step>
                                <StepLabel>Wybierz okres i podstawowe ustawienia</StepLabel>
                                <StepContent>
                                    <Grid container spacing={3} sx={{mb: 3}}>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="Data początkowa"
                                                value={reportConfig.dateRange?.start}
                                                onChange={(date) => setReportConfig(prev => ({
                                                    ...prev,
                                                    dateRange: {
                                                        ...prev.dateRange!,
                                                        start: date ? new Date(date) : new Date()
                                                    }
                                                }))}
                                                slotProps={{textField: {fullWidth: true}}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="Data końcowa"
                                                value={reportConfig.dateRange?.end}
                                                onChange={(date) => setReportConfig(prev => ({
                                                    ...prev,
                                                    dateRange: {
                                                        ...prev.dateRange!,
                                                        end: date ? new Date(date) : new Date()
                                                    }
                                                }))}
                                                slotProps={{textField: {fullWidth: true}}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Grupuj według</InputLabel>
                                                <Select
                                                    value={reportConfig.groupBy || 'month'}
                                                    label="Grupuj według"
                                                    onChange={(e) => setReportConfig(prev => ({
                                                        ...prev,
                                                        groupBy: e.target.value as any
                                                    }))}
                                                >
                                                    <MenuItem value="day">Dzień</MenuItem>
                                                    <MenuItem value="week">Tydzień</MenuItem>
                                                    <MenuItem value="month">Miesiąc</MenuItem>
                                                    <MenuItem value="quarter">Kwartał</MenuItem>
                                                    <MenuItem value="year">Rok</MenuItem>
                                                    <MenuItem value="category">Kategoria</MenuItem>
                                                    <MenuItem value="user">Użytkownik</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Format wyjściowy</InputLabel>
                                                <Select
                                                    value={reportConfig.outputFormat || 'pdf'}
                                                    label="Format wyjściowy"
                                                    onChange={(e) => setReportConfig(prev => ({
                                                        ...prev,
                                                        outputFormat: e.target.value as any
                                                    }))}
                                                >
                                                    {selectedTemplate?.outputFormats.map(format => (
                                                        <MenuItem key={format} value={format}>
                                                            {format.toUpperCase()}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{mb: 2}}>
                                        <Button
                                            variant="contained"
                                            onClick={() => setConfigStep(1)}
                                            sx={{mr: 1, backgroundColor: '#28a745'}}
                                        >
                                            Dalej
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>

                            {/* Krok 2: Filtry danych */}
                            <Step>
                                <StepLabel>Konfiguruj filtry danych</StepLabel>
                                <StepContent>
                                    <Grid container spacing={3} sx={{mb: 3}}>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                multiple
                                                options={availableCategories}
                                                value={reportConfig.filters?.categories || []}
                                                onChange={(_, value) => setReportConfig(prev => ({
                                                    ...prev,
                                                    filters: {
                                                        ...prev.filters!,
                                                        categories: value
                                                    }
                                                }))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Kategorie (pozostaw puste dla wszystkich)"
                                                        placeholder="Wybierz kategorie"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                multiple
                                                options={availableUsers}
                                                value={reportConfig.filters?.users || []}
                                                onChange={(_, value) => setReportConfig(prev => ({
                                                    ...prev,
                                                    filters: {
                                                        ...prev.filters!,
                                                        users: value
                                                    }
                                                }))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Użytkownicy (pozostaw puste dla wszystkich)"
                                                        placeholder="Wybierz użytkowników"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Minimalna kwota (opcjonalnie)"
                                                value={reportConfig.filters?.minAmount || ''}
                                                onChange={(e) => setReportConfig(prev => ({
                                                    ...prev,
                                                    filters: {
                                                        ...prev.filters!,
                                                        minAmount: e.target.value ? parseFloat(e.target.value) : undefined
                                                    }
                                                }))}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Maksymalna kwota (opcjonalnie)"
                                                value={reportConfig.filters?.maxAmount || ''}
                                                onChange={(e) => setReportConfig(prev => ({
                                                    ...prev,
                                                    filters: {
                                                        ...prev.filters!,
                                                        maxAmount: e.target.value ? parseFloat(e.target.value) : undefined
                                                    }
                                                }))}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 600}}>
                                                Uwzględnij w raporcie:
                                            </Typography>
                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={reportConfig.filters?.includeReceipts || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                filters: {
                                                                    ...prev.filters!,
                                                                    includeReceipts: e.target.checked
                                                                }
                                                            }))}
                                                        />
                                                    }
                                                    label="Paragony"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={reportConfig.filters?.includeBills || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                filters: {
                                                                    ...prev.filters!,
                                                                    includeBills: e.target.checked
                                                                }
                                                            }))}
                                                        />
                                                    }
                                                    label="Rachunki"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={reportConfig.filters?.includeSettlements || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                filters: {
                                                                    ...prev.filters!,
                                                                    includeSettlements: e.target.checked
                                                                }
                                                            }))}
                                                        />
                                                    }
                                                    label="Rozliczenia"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{mb: 2}}>
                                        <Button
                                            variant="contained"
                                            onClick={() => setConfigStep(2)}
                                            sx={{mr: 1, backgroundColor: '#28a745'}}
                                        >
                                            Dalej
                                        </Button>
                                        <Button onClick={() => setConfigStep(0)}>
                                            Wstecz
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>

                            {/* Krok 3: Opcje zawartości */}
                            <Step>
                                <StepLabel>Wybierz zawartość raportu</StepLabel>
                                <StepContent>
                                    <Grid container spacing={3} sx={{mb: 3}}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" sx={{mb: 2, fontWeight: 600}}>
                                                Elementy raportu:
                                            </Typography>
                                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={reportConfig.includeCharts || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                includeCharts: e.target.checked
                                                            }))}
                                                        />
                                                    }
                                                    label="Wykresy i diagramy"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={reportConfig.includeStatistics || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                includeStatistics: e.target.checked
                                                            }))}
                                                        />
                                                    }
                                                    label="Statystyki szczegółowe"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={reportConfig.includeComparisons || false}
                                                            onChange={(e) => setReportConfig(prev => ({
                                                                ...prev,
                                                                includeComparisons: e.target.checked
                                                            }))}
                                                        />
                                                    }
                                                    label="Porównania z poprzednimi okresami"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Nazwa raportu (opcjonalnie)"
                                                value={reportConfig.name || ''}
                                                onChange={(e) => setReportConfig(prev => ({
                                                    ...prev,
                                                    name: e.target.value
                                                }))}
                                                placeholder={`${selectedTemplate?.name} - ${new Date().toLocaleDateString('pl-PL')}`}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{mb: 2}}>
                                        <Button
                                            variant="contained"
                                            onClick={handleGenerateReport}
                                            startIcon={<GetApp/>}
                                            sx={{mr: 1, backgroundColor: '#28a745'}}
                                        >
                                            Generuj raport
                                        </Button>
                                        <Button onClick={() => setConfigStep(1)}>
                                            Wstecz
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </DialogContent>
                </Dialog>

                {/* Dialog podglądu raportu */}
                <Dialog
                    open={previewDialogOpen}
                    onClose={() => setPreviewDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogTitle>
                        <Typography variant="h6" sx={{fontWeight: 600}}>
                            Podgląd raportu: {selectedReport?.name}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Card sx={{p: 3, backgroundColor: '#f8f9fa', minHeight: 400}}>
                            <Box sx={{textAlign: 'center', py: 8}}>
                                <PictureAsPdf sx={{fontSize: '4rem', color: '#dc3545', mb: 2}}/>
                                <Typography variant="h6" color="#6c757d" sx={{mb: 1}}>
                                    Podgląd raportu
                                </Typography>
                                <Typography variant="body2" color="#6c757d">
                                    Tutaj będzie wyświetlany podgląd wygenerowanego raportu
                                </Typography>
                            </Box>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setPreviewDialogOpen(false)}>
                            Zamknij
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Download/>}
                            sx={{backgroundColor: '#28a745'}}
                        >
                            Pobierz
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog dodawania/edycji harmonogramu */}
                <Dialog
                    open={scheduleDialogOpen}
                    onClose={handleCloseScheduleDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <DialogTitle sx={{
                        position: 'relative',
                        pb: 2,
                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                        color: 'white',
                        borderRadius: '12px 12px 0 0'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Schedule sx={{fontSize: '2rem'}}/>
                            <Box>
                                <Typography variant="h5" sx={{fontWeight: 700, mb: 0.5}}>
                                    {editingSchedule ? 'Edytuj harmonogram' : 'Nowy harmonogram automatycznego raportu'}
                                </Typography>
                                <Typography variant="body2" sx={{opacity: 0.9}}>
                                    {editingSchedule ? 'Zmień ustawienia istniejącego harmonogramu' : 'Skonfiguruj automatyczne generowanie raportów'}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={handleCloseScheduleDialog}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <Close/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{p: 0}}>
                        {/* Progress steps */}
                        <Box sx={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            px: 3,
                            py: 2,
                            borderBottom: '1px solid #e9ecef'
                        }}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                <Box sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    1
                                </Box>
                                <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#28a745'}}>
                                    Podstawowe informacje
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{p: 4}}>
                            <Grid container spacing={4}>
                                {/* Nazwa harmonogramu */}
                                <Grid item xs={12}>
                                    <Box sx={{mb: 1}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                            📝 Nazwa harmonogramu
                                        </Typography>
                                        <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                            Wybierz opisową nazwę, która pomoże ci rozpoznać ten harmonogram
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label="Nazwa harmonogramu"
                                        value={newSchedule.name || ''}
                                        onChange={(e) => setNewSchedule(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))}
                                        placeholder="np. Miesięczne podsumowanie wydatków"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                '&:hover fieldset': {
                                                    borderColor: '#28a745'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#28a745'
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Szablon raportu */}
                                <Grid item xs={12}>
                                    <Box sx={{mb: 1}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                            📊 Szablon raportu
                                        </Typography>
                                        <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                            Wybierz rodzaj raportu, który ma być generowany automatycznie
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <InputLabel>Szablon raportu</InputLabel>
                                        <Select
                                            value={newSchedule.templateId || ''}
                                            label="Szablon raportu"
                                            onChange={(e) => setNewSchedule(prev => ({
                                                ...prev,
                                                templateId: e.target.value
                                            }))}
                                            sx={{
                                                borderRadius: 2,
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#28a745'
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#28a745'
                                                }
                                            }}
                                        >
                                            {reportTemplates.map(template => (
                                                <MenuItem key={template.id} value={template.id}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, py: 1}}>
                                                        {getCategoryIcon(template.category)}
                                                        <Box>
                                                            <Typography variant="body1" sx={{fontWeight: 600}}>
                                                                {template.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="#6c757d">
                                                                {template.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Częstotliwość i harmonogram */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{mb: 1}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                            ⏰ Częstotliwość
                                        </Typography>
                                        <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                            Jak często ma być generowany raport
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <InputLabel>Częstotliwość</InputLabel>
                                        <Select
                                            value={newSchedule.frequency || 'monthly'}
                                            label="Częstotliwość"
                                            onChange={(e) => setNewSchedule(prev => ({
                                                ...prev,
                                                frequency: e.target.value as any
                                            }))}
                                            sx={{
                                                borderRadius: 2,
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#28a745'
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#28a745'
                                                }
                                            }}
                                        >
                                            <MenuItem value="daily">
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <CalendarToday sx={{color: '#ffc107'}}/>
                                                    Codziennie
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="weekly">
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <CalendarToday sx={{color: '#007bff'}}/>
                                                    Co tydzień
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="monthly">
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <CalendarToday sx={{color: '#28a745'}}/>
                                                    Co miesiąc
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="quarterly">
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <CalendarToday sx={{color: '#6f42c1'}}/>
                                                    Co kwartał
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Status harmonogramu */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{mb: 1}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                            🔄 Status
                                        </Typography>
                                        <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                            Czy harmonogram ma być aktywny od razu
                                        </Typography>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={newSchedule.isActive ?? true}
                                                onChange={(e) => setNewSchedule(prev => ({
                                                    ...prev,
                                                    isActive: e.target.checked
                                                }))}
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#28a745'
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#28a745'
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Typography variant="body1" sx={{fontWeight: 500}}>
                                                    Harmonogram aktywny
                                                </Typography>
                                                <Chip
                                                    size="small"
                                                    label={newSchedule.isActive ? 'Włączony' : 'Wyłączony'}
                                                    color={newSchedule.isActive ? 'success' : 'default'}
                                                    sx={{height: 20}}
                                                />
                                            </Box>
                                        }
                                        sx={{mt: 2}}
                                    />
                                </Grid>

                                {/* Odbiorcy emaili */}
                                <Grid item xs={12}>
                                    <Box sx={{mb: 1}}>
                                        <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                            📧 Odbiorcy (opcjonalnie)
                                        </Typography>
                                        <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                            Adresy email, na które będzie wysyłany wygenerowany raport
                                        </Typography>
                                    </Box>
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={['anna@example.com', 'piotr@example.com', 'kasia@example.com']}
                                        value={newSchedule.recipients || []}
                                        onChange={(_, value) => setNewSchedule(prev => ({
                                            ...prev,
                                            recipients: value
                                        }))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Odbiorcy emaili"
                                                placeholder="Dodaj adres email..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        '&:hover fieldset': {
                                                            borderColor: '#28a745'
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#28a745'
                                                        }
                                                    }
                                                }}
                                            />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="outlined"
                                                    label={option}
                                                    size="small"
                                                    {...getTagProps({index})}
                                                    sx={{
                                                        borderColor: '#28a745',
                                                        color: '#28a745',
                                                        '& .MuiChip-deleteIcon': {
                                                            color: '#28a745'
                                                        }
                                                    }}
                                                />
                                            ))
                                        }
                                    />
                                </Grid>

                                {/* Informacje dodatkowe */}
                                <Grid item xs={12}>
                                    <Alert
                                        severity="info"
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: '#e3f2fd',
                                            border: '1px solid #90caf9'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{fontWeight: 500, mb: 1}}>
                                            💡 Jak to działa?
                                        </Typography>
                                        <Typography variant="body2">
                                            • Raport będzie generowany automatycznie zgodnie z wybraną
                                            częstotliwością<br/>
                                            • Jeśli podasz adresy email, raport zostanie wysłany na te adresy<br/>
                                            • Możesz w każdej chwili wyłączyć lub zmodyfikować harmonogram<br/>
                                            • Następne uruchomienie zostanie obliczone automatycznie
                                        </Typography>
                                    </Alert>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{
                        p: 3,
                        backgroundColor: '#f8f9fa',
                        borderTop: '1px solid #e9ecef'
                    }}>
                        <Button
                            onClick={handleCloseScheduleDialog}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                borderColor: '#6c757d',
                                color: '#6c757d',
                                '&:hover': {
                                    borderColor: '#495057',
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                        >
                            Anuluj
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveSchedule}
                            startIcon={<Schedule/>}
                            disabled={!newSchedule.name || !newSchedule.templateId}
                            sx={{
                                backgroundColor: '#28a745',
                                borderRadius: 2,
                                px: 4,
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                                '&:hover': {
                                    backgroundColor: '#218838',
                                    boxShadow: '0 6px 16px rgba(40, 167, 69, 0.4)'
                                },
                                '&:disabled': {
                                    backgroundColor: '#6c757d',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            {editingSchedule ? 'Zapisz zmiany' : 'Utwórz harmonogram'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
}
