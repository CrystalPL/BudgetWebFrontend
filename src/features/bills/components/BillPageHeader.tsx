import React from 'react';
import {Box, Card, Tab, Tabs, Typography} from '@mui/material';
import {Receipt, Settings, TableChart} from '@mui/icons-material';

interface BillPageHeaderProps {
    activeTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const BillPageHeader: React.FC<BillPageHeaderProps> = ({
                                                                  activeTab,
                                                                  onTabChange
                                                              }) => {
    return (
        <>
            {/* Nagłówek strony */}
            <Box sx={{mb: 4}}>
                <Typography variant="h4" sx={{fontWeight: 700, color: '#212529', mb: 1}}>
                    <Receipt sx={{fontSize: '2rem', mr: 1, verticalAlign: 'middle', color: '#007bff'}}/>
                    System Rachunków
                </Typography>
                <Typography variant="body1" color="#6c757d" sx={{fontSize: '1.1rem'}}>
                    Zarządzaj rachunkami domowymi, typami rachunków i śledź płatności
                </Typography>
            </Box>

            {/* Zakładki */}
            <Card sx={{mb: 3}}>
                <Tabs
                    value={activeTab}
                    onChange={onTabChange}
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
                        icon={<TableChart/>}
                        iconPosition="start"
                        label="Rachunki"
                    />
                    <Tab
                        icon={<Settings/>}
                        iconPosition="start"
                        label="Typy rachunków"
                    />
                </Tabs>
            </Card>
        </>
    );
};
