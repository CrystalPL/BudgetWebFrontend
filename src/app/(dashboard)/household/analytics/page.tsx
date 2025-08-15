'use client'
import React, {useState} from 'react';
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
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import {
    AccountBalance,
    Assessment,
    AttachMoney,
    Category,
    CheckCircle,
    Close,
    ErrorOutline,
    Euro,
    ExpandLess,
    ExpandMore,
    FormatListBulleted,
    PieChart,
    Receipt,
    Schedule,
    ShoppingCart,
    SwapHoriz,
    TrendingUp
} from '@mui/icons-material';
import {budgetData, cardsData, categoriesData, householdData, settlementsData, settlementsStatsData} from './mockData';

export default function Page() {
    return FinancialCards();
}

const FinancialCards = () => {
    const [view, setView] = useState('chart');
    const [categoryView, setCategoryView] = useState('chart');
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [householdModalOpen, setHouseholdModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [householdView, setHouseholdView] = useState('categories');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [settlementsModalOpen, setSettlementsModalOpen] = useState(false);
    const [selectedSettlement, setSelectedSettlement] = useState(null);
    const [settlements, setSettlements] = useState(settlementsData.all); // Używamy tylko listy "all"

    const handleViewChange = (event: any, newView: React.SetStateAction<string> | null) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const handleCategoryViewChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, newView: React.SetStateAction<string> | null) => {
        if (newView !== null) {
            setCategoryView(newView);
        }
    };

    const handleClickCategory = (category: any) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory(null);
    };

    const handleClickPerson = (person: any) => {
        setSelectedPerson(person);
        setHouseholdModalOpen(true);
    };

    const handleHouseholdModalClose = () => {
        setHouseholdModalOpen(false);
        setSelectedPerson(null);
        setExpandedCategory(null);
    };

    const handleHouseholdViewChange = (_event: any, newView: React.SetStateAction<string> | null) => {
        if (newView !== null) {
            setHouseholdView(newView);
            setExpandedCategory(null);
        }
    };

    const handleCategoryExpand = (categoryName: string | React.SetStateAction<null>) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    };

    // Dodanie ikon do cardsData
    const cardsDataWithIcons = cardsData.map((card, index) => ({
        ...card,
        icon: [
            <AttachMoney/>,
            <TrendingUp/>,
            <Category/>,
            <ErrorOutline/>,
            <AccountBalance/>
        ][index],
        onClick: index === 4 ? () => setSettlementsModalOpen(true) : undefined
    }));

    return (
        <Box sx={{flexGrow: 1, p: 3, backgroundColor: '#ffffff', minHeight: '100vh'}}>
            {/* Pierwszy rząd - statystyki */}
            <Grid container spacing={3} sx={{mb: 3}}>
                {cardsDataWithIcons.map((card, index) => (
                    <Grid size={{xs: 12, sm: 6, md: 3}} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#f0f8f0',
                                border: '1px solid #d4e7d4',
                                borderRadius: 3,
                                cursor: card.onClick ? 'pointer' : 'default',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                }
                            }}
                            elevation={1}
                            onClick={card.onClick}
                        >
                            <CardContent sx={{p: 3}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                                    <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500}}>
                                        {card.title}
                                    </Typography>
                                    <Box sx={{color: card.color}}>
                                        {card.icon}
                                    </Box>
                                </Box>

                                <Typography variant="h4" sx={{fontWeight: 600, mb: 1, color: '#212529'}}>
                                    {card.value}
                                </Typography>

                                {card.change && (
                                    <Typography variant="caption" sx={{color: '#28a745', fontSize: '0.75rem'}}>
                                        {card.change}
                                    </Typography>
                                )}

                                {card.subtitle && (
                                    <Typography variant="caption" sx={{color: '#6c757d', fontSize: '0.75rem'}}>
                                        {card.subtitle}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Drugi rząd - statystyki rozliczeń */}
            <Grid container spacing={3} sx={{mb: 3}}>
                <Grid size={{xs: 12}}>
                    <Typography variant="h5" sx={{fontWeight: 700, color: '#212529', mb: 2}}>
                        <AccountBalance sx={{fontSize: '1.8rem', mr: 1, verticalAlign: 'middle', color: '#28a745'}}/>
                        Statystyki Rozliczeń
                    </Typography>
                </Grid>
                {settlementsStatsData.map((stat, index) => {
                    const getIcon = (iconName: string) => {
                        switch (iconName) {
                            case 'Assessment':
                                return <Assessment sx={{fontSize: '2rem', color: stat.color}}/>;
                            case 'Schedule':
                                return <Schedule sx={{fontSize: '2rem', color: stat.color}}/>;
                            case 'CheckCircle':
                                return <CheckCircle sx={{fontSize: '2rem', color: stat.color}}/>;
                            case 'Euro':
                                return <Euro sx={{fontSize: '2rem', color: stat.color}}/>;
                            default:
                                return <AccountBalance sx={{fontSize: '2rem', color: stat.color}}/>;
                        }
                    };

                    return (
                        <Grid size={{xs: 12, sm: 6, md: 3}} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: stat.color === '#856404' ? '#fff3cd' :
                                        stat.color === '#28a745' ? '#e8f5e8' : '#f0f8f0',
                                    border: `1px solid ${stat.color === '#856404' ? '#ffeaa7' :
                                        stat.color === '#28a745' ? '#d4e7d4' : '#d4e7d4'}`,
                                    borderRadius: 2,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    },
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                elevation={1}
                            >
                                <CardContent sx={{textAlign: 'center', p: 3}}>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1}}>
                                        {getIcon(stat.icon)}
                                        <Typography variant="h4" sx={{fontWeight: 700, color: '#212529', ml: 1}}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{fontWeight: 600, color: '#212529', mb: 0.5}}>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="body2" color="#6c757d">
                                        {stat.subtitle}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Trzeci rząd - wykresy */}
            <Grid container spacing={3} sx={{mb: 3}}>
                <Grid size={{xs: 12, md: 6}}>
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
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                                <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500}}>
                                    Wydatki według kategorii
                                </Typography>
                                <ToggleButtonGroup
                                    value={categoryView}
                                    exclusive
                                    onChange={(event, value) => handleCategoryViewChange(event, value)}
                                    size="small"
                                    sx={{
                                        '& .MuiToggleButton-root': {
                                            border: '1px solid #d4e7d4',
                                            backgroundColor: '#ffffff',
                                            color: '#6c757d',
                                            '&.Mui-selected': {
                                                backgroundColor: '#28a745',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#218838',
                                                }
                                            },
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa',
                                            }
                                        }
                                    }}
                                >
                                    <ToggleButton value="chart" aria-label="wykres">
                                        <PieChart fontSize="small"/>
                                    </ToggleButton>
                                    <ToggleButton value="list" aria-label="lista">
                                        <FormatListBulleted fontSize="small"/>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {categoryView === 'chart' ? (
                                <Box sx={{
                                    height: 200,
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="body2" color="#6c757d">
                                        Wykres kołowy kategorii wydatków
                                    </Typography>
                                </Box>
                            ) : (
                                <Box sx={{height: 200, overflow: 'auto'}}>
                                    <List sx={{p: 0}}>
                                        {categoriesData.map((category, index) => (
                                            <ListItem
                                                key={index}
                                                sx={{
                                                    px: 0,
                                                    py: 1,
                                                    borderBottom: index === categoriesData.length - 1 ? 'none' : '1px solid #e9ecef',
                                                    cursor: 'pointer',
                                                    borderRadius: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#f8f9fa',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    },
                                                    transition: 'all 0.2s ease-in-out'
                                                }}
                                                onClick={() => handleClickCategory(category)}
                                            >
                                                <Box sx={{
                                                    width: 12,
                                                    height: 12,
                                                    backgroundColor: category.color,
                                                    borderRadius: '50%',
                                                    mr: 2,
                                                    flexShrink: 0
                                                }}/>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography variant="body2" sx={{fontWeight: 500}}>
                                                                {category.name}
                                                            </Typography>
                                                            <Box sx={{textAlign: 'right'}}>
                                                                <Typography variant="body2"
                                                                            sx={{fontWeight: 600, color: '#212529'}}>
                                                                    {category.amount}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Card
                        sx={{
                            backgroundColor: '#f0f8f0',
                            border: '1px solid #d4e7d4',
                            borderRadius: 3,
                            minHeight: 250
                        }}
                        elevation={1}
                    >
                        <CardContent sx={{p: 3}}>
                            <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 2}}>
                                Wydatki w czasie
                            </Typography>
                            <Box sx={{
                                height: 180,
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="body2" color="#6c757d">
                                    Wykres liniowy wydatków w czasie
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Trzeci rząd - budżet i domownicy */}
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 6}}>
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
                                Plan vs rzeczywistość
                            </Typography>

                            {budgetData.map((item, index) => (
                                <Box key={index} sx={{mb: index === budgetData.length - 1 ? 0 : 3}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                        <Typography variant="body2" sx={{fontWeight: 500}}>
                                            {item.category}
                                        </Typography>
                                        <Chip
                                            label={item.status === 'exceeded' ? 'Przekroczone' : 'W normie'}
                                            size="small"
                                            sx={{
                                                backgroundColor: item.status === 'exceeded' ? '#fee' : '#e8f5e8',
                                                color: item.status === 'exceeded' ? '#dc3545' : '#28a745',
                                                fontSize: '0.75rem'
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                        <Typography variant="caption" color="#6c757d">
                                            Plan: {item.planned}
                                        </Typography>
                                        <Typography variant="caption" color="#6c757d">
                                            Rzeczywiste: {item.actual}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(item.percentage, 100)}
                                        sx={{
                                            height: 4,
                                            backgroundColor: '#e9ecef',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: item.status === 'exceeded' ? '#dc3545' : '#28a745'
                                            }
                                        }}
                                    />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
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
                                Podział wydatków między domowników
                            </Typography>

                            {householdData.map((person, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        mb: index === householdData.length - 1 ? 0 : 2,
                                        pb: index === householdData.length - 1 ? 0 : 2,
                                        borderBottom: index === householdData.length - 1 ? 'none' : '1px solid #e9ecef',
                                        cursor: 'pointer',
                                        borderRadius: 1,
                                        p: 1,
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                    onClick={() => handleClickPerson(person)}
                                >
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                        <Typography variant="body2" sx={{fontWeight: 500}}>
                                            {person.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: person.type === 'positive' ? '#28a745' : '#dc3545'
                                            }}
                                        >
                                            {person.balance}
                                        </Typography>
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Typography variant="caption" color="#6c757d">
                                            Wydał: {person.spent}
                                        </Typography>
                                        <Typography variant="caption" color="#6c757d">
                                            Powinien: {person.should}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Modal szczegółów kategorii */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{zIndex: 1301}}
            >
                <DialogTitle sx={{position: 'relative'}}>
                    <Typography variant="h6" sx={{fontWeight: 600, color: '#212529'}}>
                        Szczegóły kategorii: {selectedCategory ? selectedCategory.name : ''}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#6c757d',
                            '&:hover': {
                                color: '#495057'
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{p: 3}}>
                    {selectedCategory && (
                        <Box>
                            <Typography variant="body2" color="#6c757d" sx={{mb: 2}}>
                                Kwota: <strong>{selectedCategory.amount}</strong>
                            </Typography>
                            <Divider sx={{mb: 2}}/>
                            <Typography variant="body2" color="#6c757d" sx={{fontWeight: 500, mb: 1}}>
                                Historia transakcji
                            </Typography>
                            {/* Tutaj powinna być lista transakcji dla danej kategorii */}
                            <List sx={{p: 0}}>
                                {/* Przykładowe dane transakcji */}
                                {selectedCategory.products.map((transaction) => (
                                    <ListItem key={transaction.id}
                                              sx={{px: 0, py: 1, borderBottom: '1px solid #e9ecef'}}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <Typography variant="body2" sx={{fontWeight: 500}}>
                                                        {transaction.description}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                                sx={{fontWeight: 600, color: '#212529'}}>
                                                        {transaction.amount}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography variant="caption" color="#6c757d">
                                                    {transaction.date}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#218838',
                            }
                        }}
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal domowników */}
            <Dialog
                open={householdModalOpen}
                onClose={handleHouseholdModalClose}
                fullWidth
                sx={{zIndex: 1302}}
                PaperProps={{
                    sx: {
                        height: "60vh",
                        maxWidth: "60%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto"
                    },
                }}
            >
                <DialogTitle sx={{position: 'relative'}}>
                    <Typography variant="h6" sx={{fontWeight: 600, color: '#212529', fontSize: '1.2rem'}}>
                        Szczegóły domownika: {selectedPerson ? selectedPerson.name : ''}
                    </Typography>
                    <IconButton
                        onClick={handleHouseholdModalClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#6c757d',
                            '&:hover': {
                                color: '#495057'
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{p: 3}}>
                    {selectedPerson && (
                        <Box>
                            <Typography variant="body1" color="#6c757d" sx={{mb: 2, fontSize: '0.95rem'}}>
                                Wydał łącznie: <strong>{selectedPerson.spent}</strong> | Bilans: <strong
                                style={{color: selectedPerson.type === 'positive' ? '#28a745' : '#dc3545'}}>{selectedPerson.balance}</strong>
                            </Typography>
                            <Divider sx={{mb: 2}}/>

                            {/* Przełącznik widoków */}
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                                <Typography variant="body1" color="#6c757d" sx={{fontWeight: 500, fontSize: '0.95rem'}}>
                                    Szczegóły wydatków
                                </Typography>
                                <ToggleButtonGroup
                                    value={householdView}
                                    exclusive
                                    onChange={handleHouseholdViewChange}
                                    size="small"
                                    sx={{
                                        '& .MuiToggleButton-root': {
                                            border: '1px solid #d4e7d4',
                                            backgroundColor: '#ffffff',
                                            color: '#6c757d',
                                            fontSize: '0.8rem',
                                            '&.Mui-selected': {
                                                backgroundColor: '#28a745',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#218838',
                                                }
                                            },
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa',
                                            }
                                        }
                                    }}
                                >
                                    <ToggleButton value="categories" aria-label="kategorie">
                                        <Category fontSize="small" sx={{mr: 0.5}}/>
                                        Kategorie
                                    </ToggleButton>
                                    <ToggleButton value="receipts" aria-label="paragony">
                                        <Receipt fontSize="small" sx={{mr: 0.5}}/>
                                        Paragony
                                    </ToggleButton>
                                    <ToggleButton value="products" aria-label="produkty">
                                        <ShoppingCart fontSize="small" sx={{mr: 0.5}}/>
                                        Produkty
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {/* Widok kategorii */}
                            {householdView === 'categories' && (
                                <Box>
                                    {Object.keys(selectedPerson.categories || {}).length === 0 ? (
                                        <Typography variant="body1" color="#6c757d" sx={{fontSize: '0.9rem'}}>
                                            Brak danych o wydatkach w kategoriach
                                        </Typography>
                                    ) : (
                                        <List sx={{p: 0, maxHeight: 300, overflow: 'auto'}}>
                                            {Object.entries(selectedPerson.categories).map(([categoryName, categoryData], index) => (
                                                <Box key={index}>
                                                    <ListItem
                                                        sx={{
                                                            px: 0,
                                                            py: 1,
                                                            cursor: 'pointer',
                                                            borderRadius: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#f8f9fa',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                            },
                                                            transition: 'all 0.2s ease-in-out'
                                                        }}
                                                        onClick={() => handleCategoryExpand(categoryName)}
                                                    >
                                                        <Box sx={{
                                                            width: 12,
                                                            height: 12,
                                                            backgroundColor: categoryData.color,
                                                            borderRadius: '50%',
                                                            mr: 2,
                                                            flexShrink: 0
                                                        }}/>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Typography variant="body1" sx={{
                                                                        fontWeight: 500,
                                                                        fontSize: '0.9rem'
                                                                    }}>
                                                                        {categoryName}
                                                                    </Typography>
                                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                                        <Typography variant="body1"
                                                                                    sx={{
                                                                                        fontWeight: 600,
                                                                                        color: '#212529',
                                                                                        mr: 1,
                                                                                        fontSize: '0.9rem'
                                                                                    }}>
                                                                            {categoryData.amount}
                                                                        </Typography>
                                                                        {expandedCategory === categoryName ? (
                                                                            <ExpandLess sx={{color: '#28a745'}}
                                                                                        fontSize="small"/>
                                                                        ) : (
                                                                            <ExpandMore sx={{color: '#6c757d'}}
                                                                                        fontSize="small"/>
                                                                        )}
                                                                    </Box>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>

                                                    {/* Rozwinięte produkty w kategorii */}
                                                    {expandedCategory === categoryName && (
                                                        <Box sx={{ml: 3, mb: 2}}>
                                                            {categoryData.products.map((product) => {
                                                                const receipt = selectedPerson.receipts?.find(r => r.id === product.receiptId);
                                                                return (
                                                                    <ListItem
                                                                        key={product.id}
                                                                        sx={{
                                                                            px: 2,
                                                                            py: 0.5,
                                                                            backgroundColor: '#f8f9fa',
                                                                            borderRadius: 1,
                                                                            mb: 0.5,
                                                                            position: 'relative',
                                                                            '&:hover': {
                                                                                backgroundColor: '#e9ecef',
                                                                                '& .receipt-tooltip': {
                                                                                    opacity: 1,
                                                                                    visibility: 'visible'
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <ListItemText
                                                                            primary={
                                                                                <Box sx={{
                                                                                    display: 'flex',
                                                                                    justifyContent: 'space-between'
                                                                                }}>
                                                                                    <Typography variant="body1"
                                                                                                sx={{
                                                                                                    fontWeight: 500,
                                                                                                    fontSize: '0.9rem'
                                                                                                }}>
                                                                                        {product.description}
                                                                                    </Typography>
                                                                                    <Typography variant="body1" sx={{
                                                                                        fontWeight: 600,
                                                                                        color: '#212529',
                                                                                        fontSize: '0.9rem'
                                                                                    }}>
                                                                                        {product.amount}
                                                                                    </Typography>
                                                                                </Box>
                                                                            }
                                                                            secondary={
                                                                                <Typography variant="body1"
                                                                                            color="#6c757d"
                                                                                            sx={{fontSize: '0.85rem'}}>
                                                                                    {product.date}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                        {/* Tooltip z informacją o paragonie */}
                                                                        {receipt && (
                                                                            <Box
                                                                                className="receipt-tooltip"
                                                                                sx={{
                                                                                    position: 'absolute',
                                                                                    top: '-80px',
                                                                                    right: 0,
                                                                                    backgroundColor: '#333',
                                                                                    color: 'white',
                                                                                    p: 1,
                                                                                    borderRadius: 1,
                                                                                    fontSize: '0.85rem',
                                                                                    opacity: 0,
                                                                                    visibility: 'hidden',
                                                                                    transition: 'opacity 0.3s',
                                                                                    zIndex: 1000,
                                                                                    minWidth: 200
                                                                                }}
                                                                            >
                                                                                <Typography variant="body1" sx={{
                                                                                    fontWeight: 600,
                                                                                    color: 'white',
                                                                                    fontSize: '0.85rem'
                                                                                }}>
                                                                                    Paragon: {receipt.id}
                                                                                </Typography><br/>
                                                                                <Typography variant="body1"
                                                                                            sx={{
                                                                                                color: 'white',
                                                                                                fontSize: '0.85rem'
                                                                                            }}>
                                                                                    {receipt.shop} - {receipt.date}
                                                                                </Typography><br/>
                                                                                <Typography variant="body1"
                                                                                            sx={{
                                                                                                color: 'white',
                                                                                                fontSize: '0.85rem'
                                                                                            }}>
                                                                                    Razem: {receipt.total}
                                                                                </Typography>
                                                                            </Box>
                                                                        )}
                                                                    </ListItem>
                                                                );
                                                            })}
                                                        </Box>
                                                    )}
                                                </Box>
                                            ))}
                                        </List>
                                    )}
                                </Box>
                            )}

                            {/* Widok paragonów */}
                            {householdView === 'receipts' && (
                                <Box>
                                    {(!selectedPerson.receipts || selectedPerson.receipts.length === 0) ? (
                                        <Typography variant="body1" color="#6c757d" sx={{fontSize: '0.9rem'}}>
                                            Brak paragonów
                                        </Typography>
                                    ) : (
                                        <List sx={{p: 0, maxHeight: 300, overflow: 'auto'}}>
                                            {selectedPerson.receipts.map((receipt) => (
                                                <Box key={receipt.id}>
                                                    <ListItem
                                                        sx={{
                                                            px: 0,
                                                            py: 1,
                                                            cursor: 'pointer',
                                                            borderRadius: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#f8f9fa',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                            },
                                                            transition: 'all 0.2s ease-in-out'
                                                        }}
                                                        onClick={() => setExpandedCategory(expandedCategory === receipt.id ? null : receipt.id)}
                                                    >
                                                        <Receipt sx={{color: '#6c757d', mr: 2}} fontSize="small"/>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Box>
                                                                        <Typography variant="body1" sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.9rem'
                                                                        }}>
                                                                            {receipt.shop}
                                                                        </Typography>
                                                                        <Typography variant="body1" color="#6c757d"
                                                                                    sx={{fontSize: '0.85rem'}}>
                                                                            {receipt.date} • {receipt.id}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                                        <Typography variant="body1" sx={{
                                                                            fontWeight: 600,
                                                                            color: '#212529',
                                                                            mr: 1,
                                                                            fontSize: '0.9rem'
                                                                        }}>
                                                                            {receipt.total}
                                                                        </Typography>
                                                                        {expandedCategory === receipt.id ? (
                                                                            <ExpandLess sx={{color: '#28a745'}}
                                                                                        fontSize="small"/>
                                                                        ) : (
                                                                            <ExpandMore sx={{color: '#6c757d'}}
                                                                                        fontSize="small"/>
                                                                        )}
                                                                    </Box>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>

                                                    {/* Rozwinięte produkty z paragonu */}
                                                    {expandedCategory === receipt.id && (
                                                        <Box sx={{ml: 3, mb: 2}}>
                                                            <Typography variant="body1" color="#6c757d" sx={{
                                                                fontWeight: 500,
                                                                mb: 1,
                                                                display: 'block',
                                                                fontSize: '0.9rem'
                                                            }}>
                                                                Produkty z paragonu:
                                                            </Typography>

                                                            {/* Nagłówki tabeli */}
                                                            <Box sx={{
                                                                display: 'grid',
                                                                gridTemplateColumns: '2fr 0.8fr 1fr 1.2fr',
                                                                gap: 1,
                                                                px: 2,
                                                                py: 1,
                                                                backgroundColor: '#e9ecef',
                                                                borderRadius: '4px 4px 0 0',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 600,
                                                                color: '#495057'
                                                            }}>
                                                                <Typography variant="body1"
                                                                            sx={{fontWeight: 600, fontSize: '0.85rem'}}>
                                                                    Nazwa produktu
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontWeight: 600,
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    Ilość
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontWeight: 600,
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'right'
                                                                }}>
                                                                    Kwota
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontWeight: 600,
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    Kategoria
                                                                </Typography>
                                                            </Box>

                                                            {/* Produkty z kategorii */}
                                                            {Object.entries(selectedPerson.categories).map(([categoryName, categoryData]) =>
                                                                categoryData.products
                                                                    .filter(product => product.receiptId === receipt.id)
                                                                    .map((product, idx) => (
                                                                        <Box
                                                                            key={product.id}
                                                                            sx={{
                                                                                display: 'grid',
                                                                                gridTemplateColumns: '2fr 0.8fr 1fr 1.2fr',
                                                                                gap: 1,
                                                                                px: 2,
                                                                                py: 1,
                                                                                backgroundColor: idx % 2 === 0 ? '#f8f9fa' : '#ffffff',
                                                                                borderBottom: '1px solid #e9ecef',
                                                                                alignItems: 'center'
                                                                            }}
                                                                        >
                                                                            <Typography variant="body1" sx={{
                                                                                fontWeight: 500,
                                                                                fontSize: '0.85rem'
                                                                            }}>
                                                                                {product.description}
                                                                            </Typography>
                                                                            <Typography variant="body1" sx={{
                                                                                fontSize: '0.85rem',
                                                                                textAlign: 'center',
                                                                                color: '#6c757d'
                                                                            }}>
                                                                                1 szt.
                                                                            </Typography>
                                                                            <Typography variant="body1" sx={{
                                                                                fontWeight: 600,
                                                                                fontSize: '0.85rem',
                                                                                textAlign: 'right',
                                                                                color: '#212529'
                                                                            }}>
                                                                                {product.amount}
                                                                            </Typography>
                                                                            <Box sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center'
                                                                            }}>
                                                                                <Box sx={{
                                                                                    width: 8,
                                                                                    height: 8,
                                                                                    backgroundColor: categoryData.color,
                                                                                    borderRadius: '50%',
                                                                                    mr: 1
                                                                                }}/>
                                                                                <Typography variant="body1" sx={{
                                                                                    fontSize: '0.85rem',
                                                                                    color: '#6c757d'
                                                                                }}>
                                                                                    {categoryName}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    ))
                                                            )}

                                                            {/* Produkty z paragonu, które nie są w kategoriach */}
                                                            {receipt.products && receipt.products.length > 0 && (
                                                                <>
                                                                    {receipt.products.map((productName, index) => (
                                                                        <Box
                                                                            key={`receipt-${index}`}
                                                                            sx={{
                                                                                display: 'grid',
                                                                                gridTemplateColumns: '2fr 0.8fr 1fr 1.2fr',
                                                                                gap: 1,
                                                                                px: 2,
                                                                                py: 1,
                                                                                backgroundColor: '#f0f8ff',
                                                                                borderBottom: '1px solid #e9ecef',
                                                                                alignItems: 'center'
                                                                            }}
                                                                        >
                                                                            <Typography variant="body1" sx={{
                                                                                fontWeight: 500,
                                                                                fontSize: '0.85rem'
                                                                            }}>
                                                                                {productName}
                                                                            </Typography>
                                                                            <Typography variant="body1" sx={{
                                                                                fontSize: '0.85rem',
                                                                                textAlign: 'center',
                                                                                color: '#6c757d'
                                                                            }}>
                                                                                1 szt.
                                                                            </Typography>
                                                                            <Typography variant="body1" sx={{
                                                                                fontSize: '0.85rem',
                                                                                textAlign: 'right',
                                                                                color: '#6c757d'
                                                                            }}>
                                                                                -
                                                                            </Typography>
                                                                            <Typography variant="body1" sx={{
                                                                                fontSize: '0.85rem',
                                                                                textAlign: 'center',
                                                                                color: '#6c757d'
                                                                            }}>
                                                                                Niekategoryzowane
                                                                            </Typography>
                                                                        </Box>
                                                                    ))}
                                                                </>
                                                            )}

                                                            {/* Stopka z podsumowaniem */}
                                                            <Box sx={{
                                                                display: 'grid',
                                                                gridTemplateColumns: '2fr 0.8fr 1fr 1.2fr',
                                                                gap: 1,
                                                                px: 2,
                                                                py: 1,
                                                                backgroundColor: '#e9ecef',
                                                                borderRadius: '0 0 4px 4px',
                                                                fontWeight: 600
                                                            }}>
                                                                <Typography variant="body1"
                                                                            sx={{fontWeight: 600, fontSize: '0.85rem'}}>
                                                                    RAZEM
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    -
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontWeight: 600,
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'right',
                                                                    color: '#212529'
                                                                }}>
                                                                    {receipt.total}
                                                                </Typography>
                                                                <Typography variant="body1" sx={{
                                                                    fontSize: '0.85rem',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    -
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            ))}
                                        </List>
                                    )}
                                </Box>
                            )}

                            {/* Widok wszystkich produktów */}
                            {householdView === 'products' && (
                                <Box>
                                    <List sx={{p: 0, maxHeight: 300, overflow: 'auto'}}>
                                        {Object.entries(selectedPerson.categories).map(([categoryName, categoryData]) =>
                                            categoryData.products.map((product) => {
                                                const receipt = selectedPerson.receipts?.find(r => r.id === product.receiptId);
                                                return (
                                                    <ListItem
                                                        key={product.id}
                                                        sx={{
                                                            px: 0,
                                                            py: 1,
                                                            borderBottom: '1px solid #e9ecef',
                                                            position: 'relative',
                                                            '&:hover': {
                                                                backgroundColor: '#f8f9fa',
                                                                '& .receipt-tooltip': {
                                                                    opacity: 1,
                                                                    visibility: 'visible'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            width: 8,
                                                            height: 8,
                                                            backgroundColor: categoryData.color,
                                                            borderRadius: '50%',
                                                            mr: 2,
                                                            flexShrink: 0,
                                                            mt: 1
                                                        }}/>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <Typography variant="body1" sx={{
                                                                        fontWeight: 500,
                                                                        fontSize: '0.9rem'
                                                                    }}>
                                                                        {product.description}
                                                                    </Typography>
                                                                    <Typography variant="body1" sx={{
                                                                        fontWeight: 600,
                                                                        color: '#212529',
                                                                        fontSize: '0.9rem'
                                                                    }}>
                                                                        {product.amount}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                            secondary={
                                                                <Typography variant="body1" color="#6c757d"
                                                                            sx={{fontSize: '0.85rem'}}>
                                                                    {product.date} • {categoryName}
                                                                </Typography>
                                                            }
                                                        />

                                                        {/* Tooltip z informacją o paragonie */}
                                                        {receipt && (
                                                            <Box
                                                                className="receipt-tooltip"
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '-80px',
                                                                    right: 0,
                                                                    backgroundColor: '#333',
                                                                    color: 'white',
                                                                    p: 1,
                                                                    borderRadius: 1,
                                                                    fontSize: '0.85rem',
                                                                    opacity: 0,
                                                                    visibility: 'hidden',
                                                                    transition: 'opacity 0.3s',
                                                                    zIndex: 1000,
                                                                    minWidth: 200
                                                                }}
                                                            >
                                                                <Typography variant="body1"
                                                                            sx={{
                                                                                fontWeight: 600,
                                                                                color: 'white',
                                                                                fontSize: '0.85rem'
                                                                            }}>
                                                                    Paragon: {receipt.id}
                                                                </Typography><br/>
                                                                <Typography variant="body1"
                                                                            sx={{color: 'white', fontSize: '0.85rem'}}>
                                                                    {receipt.shop} - {receipt.date}
                                                                </Typography><br/>
                                                                <Typography variant="body1"
                                                                            sx={{color: 'white', fontSize: '0.85rem'}}>
                                                                    Razem: {receipt.total}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </ListItem>
                                                );
                                            })
                                        )}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button
                        onClick={handleHouseholdModalClose}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#218838',
                            }
                        }}
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal rozliczeń */}
            <Dialog
                open={settlementsModalOpen}
                onClose={() => setSettlementsModalOpen(false)}
                fullWidth
                sx={{zIndex: 1303}}
                PaperProps={{
                    sx: {
                        height: "70vh",
                        maxWidth: "80%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto"
                    },
                }}
            >
                <DialogTitle sx={{position: 'relative'}}>
                    <Typography variant="h6" sx={{fontWeight: 600, color: '#212529', fontSize: '1.2rem'}}>
                        Rozliczenia
                    </Typography>
                    <IconButton
                        onClick={() => setSettlementsModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#6c757d',
                            '&:hover': {
                                color: '#495057'
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{p: 3}}>
                    {/* Nagłówek z opisem */}
                    <Box sx={{mb: 3}}>
                        <Typography variant="body2" color="#6c757d" sx={{fontSize: '0.9rem', mb: 2}}>
                            Lista wszystkich rozliczeń między domownikami. Kliknij na rozliczenie, aby zobaczyć
                            szczegóły.
                        </Typography>
                        <Divider sx={{borderColor: '#d4e7d4', borderWidth: 2}}/>
                    </Box>

                    {/* Lista rozliczeń */}
                    <List sx={{p: 0, maxHeight: 500, overflow: 'auto'}}>
                        {(settlements || []).map((settlement, index) => (
                            <Box key={settlement.id} sx={{mb: 2}}>
                                <Card
                                    sx={{
                                        backgroundColor: '#f8f9fa',
                                        border: settlement.status === 'settled' ? '2px solid #28a745' : '2px solid #ffc107',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                                            backgroundColor: '#ffffff'
                                        },
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                    elevation={1}
                                    onClick={() => setSelectedSettlement(selectedSettlement === settlement.id ? null : settlement.id)}
                                >
                                    <CardContent sx={{p: 2}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                            <Box sx={{mr: 2}}>
                                                {settlement.status === 'settled' ? (
                                                    <CheckCircle sx={{color: '#28a745', fontSize: '1.5rem'}}/>
                                                ) : (
                                                    <Schedule sx={{color: '#ffc107', fontSize: '1.5rem'}}/>
                                                )}
                                            </Box>
                                            <Box sx={{flexGrow: 1}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mb: 1
                                                }}>
                                                    <Typography variant="h6" sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1rem',
                                                        color: '#212529'
                                                    }}>
                                                        <SwapHoriz sx={{
                                                            fontSize: '1.2rem',
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
                                                            fontSize: '1.1rem'
                                                        }}>
                                                            {settlement.amount}
                                                        </Typography>
                                                        <Chip
                                                            label={settlement.status === 'settled' ? 'Rozliczone' : 'Oczekuje'}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: settlement.status === 'settled' ? '#e8f5e8' : '#fff3cd',
                                                                color: settlement.status === 'settled' ? '#28a745' : '#856404',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: selectedSettlement === settlement.id ? '#28a745' : '#e9ecef',
                                                                color: selectedSettlement === settlement.id ? '#ffffff' : '#6c757d',
                                                                '&:hover': {
                                                                    backgroundColor: selectedSettlement === settlement.id ? '#218838' : '#dee2e6'
                                                                }
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedSettlement(selectedSettlement === settlement.id ? null : settlement.id);
                                                            }}
                                                        >
                                                            {selectedSettlement === settlement.id ? (
                                                                <ExpandLess fontSize="small"/>
                                                            ) : (
                                                                <ExpandMore fontSize="small"/>
                                                            )}
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography variant="body2" color="#6c757d"
                                                                sx={{fontSize: '0.85rem'}}>
                                                        {settlement.reason && `${settlement.reason} • `}
                                                        <Receipt sx={{
                                                            fontSize: '0.9rem',
                                                            verticalAlign: 'middle',
                                                            mr: 0.5
                                                        }}/>
                                                        {settlement.receipts.length} paragon{settlement.receipts.length !== 1 ? 'ów' : ''}
                                                    </Typography>
                                                    {settlement.status === 'pending' && (
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color="success"
                                                            sx={{
                                                                fontSize: '0.75rem',
                                                                py: 0.5,
                                                                px: 1.5,
                                                                minHeight: 'auto',
                                                                textTransform: 'none',
                                                                fontWeight: 600,
                                                                borderRadius: 2
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSettlements(prev =>
                                                                    prev.map(s =>
                                                                        s.id === settlement.id ? {
                                                                            ...s,
                                                                            status: 'settled'
                                                                        } : s
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            ✓ Oznacz jako rozliczone
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>

                                    {/* Rozwinięte szczegóły settlements */}
                                    {selectedSettlement === settlement.id && (
                                        <Box sx={{
                                            borderTop: '2px dashed #d4e7d4',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '0 0 8px 8px'
                                        }}>
                                            <CardContent sx={{p: 3, pt: 2}}>
                                                <Typography variant="h6" sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    fontSize: '0.95rem',
                                                    color: '#28a745'
                                                }}>
                                                    📋 Szczegóły rozliczenia
                                                </Typography>

                                                <Box sx={{mb: 3}}>
                                                    <Typography variant="body2" sx={{
                                                        fontWeight: 500,
                                                        mb: 2,
                                                        fontSize: '0.9rem',
                                                        color: '#495057'
                                                    }}>
                                                        Paragony w rozliczeniu:
                                                    </Typography>

                                                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                                                        {settlement.receipts.map((receipt, receiptIndex) => (
                                                            <Card
                                                                key={receipt.id}
                                                                sx={{
                                                                    backgroundColor: '#f8f9fa',
                                                                    border: '1px solid #e9ecef',
                                                                    borderRadius: 2,
                                                                    '&:hover': {
                                                                        backgroundColor: '#e9ecef',
                                                                        transform: 'translateX(4px)'
                                                                    },
                                                                    transition: 'all 0.2s ease-in-out'
                                                                }}
                                                                elevation={0}
                                                            >
                                                                <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                                                                    <Box sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Box sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                            <Receipt sx={{
                                                                                color: '#28a745',
                                                                                mr: 1.5,
                                                                                fontSize: '1.2rem'
                                                                            }}/>
                                                                            <Box>
                                                                                <Typography variant="body1" sx={{
                                                                                    fontWeight: 600,
                                                                                    fontSize: '0.9rem',
                                                                                    color: '#212529'
                                                                                }}>
                                                                                    {receipt.description}
                                                                                </Typography>
                                                                                <Typography variant="body2"
                                                                                            color="#6c757d"
                                                                                            sx={{fontSize: '0.8rem'}}>
                                                                                    ID: {receipt.id} •
                                                                                    Data: {receipt.date}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{
                                                                            backgroundColor: '#28a745',
                                                                            color: 'white',
                                                                            px: 2,
                                                                            py: 0.5,
                                                                            borderRadius: 2,
                                                                            fontWeight: 700,
                                                                            fontSize: '0.9rem'
                                                                        }}>
                                                                            {receipt.amount}
                                                                        </Box>
                                                                    </Box>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </Box>
                                                </Box>

                                                <Divider sx={{mb: 2, borderColor: '#d4e7d4'}}/>

                                                <Box sx={{
                                                    p: 2.5,
                                                    backgroundColor: '#e8f5e8',
                                                    borderRadius: 2,
                                                    border: '2px solid #d4e7d4',
                                                    position: 'relative'
                                                }}>
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        top: -10,
                                                        left: 16,
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600
                                                    }}>
                                                        💡 PODSUMOWANIE
                                                    </Box>
                                                    <Typography variant="body1" sx={{
                                                        fontSize: '0.9rem',
                                                        color: '#495057',
                                                        mt: 1,
                                                        lineHeight: 1.6
                                                    }}>
                                                        <strong>{settlement.from}</strong> powinien
                                                        zwrócić <strong>{settlement.to}</strong> kwotę{' '}
                                                        <Box component="span" sx={{
                                                            backgroundColor: '#28a745',
                                                            color: 'white',
                                                            px: 1,
                                                            py: 0.25,
                                                            borderRadius: 1,
                                                            fontSize: '0.9rem',
                                                            fontWeight: 700
                                                        }}>
                                                            {settlement.amount}
                                                        </Box>
                                                        {settlement.reason && (
                                                            <>
                                                                {' '}za <em>{settlement.reason.toLowerCase()}</em>
                                                            </>
                                                        )}.
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Box>
                                    )}
                                </Card>

                                {/* Separator między rozliczeniami */}
                                {index < settlements.length - 1 && (
                                    <Box sx={{display: 'flex', alignItems: 'center', my: 2}}>
                                        <Divider sx={{flex: 1, borderColor: '#e9ecef'}}/>
                                        <Typography variant="caption" sx={{
                                            px: 2,
                                            color: '#6c757d',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 1,
                                            fontSize: '0.7rem'
                                        }}>
                                            • • •
                                        </Typography>
                                        <Divider sx={{flex: 1, borderColor: '#e9ecef'}}/>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button
                        onClick={() => setSettlementsModalOpen(false)}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#218838',
                            }
                        }}
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

