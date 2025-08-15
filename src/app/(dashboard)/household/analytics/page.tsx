'use client'
import React from 'react';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {AttachMoney, Category, ErrorOutline, TrendingUp} from '@mui/icons-material';

export default function Page() {
    return FinancialCards();
}

const FinancialCards = () => {
    const cardsData = [
        {
            title: "Całkowite wydatki",
            value: "4250,67 zł",
            change: "+12% od poprzedniego miesiąca",
            changeType: "increase",
            icon: <AttachMoney/>,
            color: "#dc3545"
        },
        {
            title: "Całkowite przychody",
            value: "5800,00 zł",
            change: "+5% od poprzedniego miesiąca",
            changeType: "increase",
            icon: <TrendingUp/>,
            color: "#28a745"
        },
        {
            title: "Największa kategoria",
            value: "Żywność",
            subtitle: "1250,90 zł w tym miesiącu",
            icon: <Category/>,
            color: "#6c757d"
        },
        {
            title: "Nieuregulowane paragony",
            value: "3",
            subtitle: "Wymagają uwagi",
            icon: <ErrorOutline/>,
            color: "#fd7e14"
        }
    ];

    return (
        <Box sx={{flexGrow: 1, p: 3}}>
            <Grid container spacing={3}>
                {cardsData.map((card, index) => (
                    <Grid size={{xs: 12, sm: 6, md: 3}} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#f0f8f0', // jasnozielone tło
                                border: '1px solid #d4e7d4', // jasnozielona ramka
                                borderRadius: 3
                            }}
                            elevation={1}
                        >
                            <CardContent sx={{p: 3}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                                    <Typography variant="body2" color="#6c757d">
                                        {card.title}
                                    </Typography>
                                    <Box sx={{color: card.color}}>
                                        {card.icon}
                                    </Box>
                                </Box>

                                <Typography variant="h4" sx={{fontWeight: 600}}>
                                    {card.value}
                                </Typography>

                                {card.change && (
                                    <Typography variant="caption" color="#28a745">
                                        {card.change}
                                    </Typography>
                                )}

                                {card.subtitle && (
                                    <Typography variant="caption" color="#6c757d">
                                        {card.subtitle}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};