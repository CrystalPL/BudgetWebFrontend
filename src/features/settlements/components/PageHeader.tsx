import React from 'react';
import {Box, Card, Tab, Tabs, Typography} from '@mui/material';
import {AccountBalance, History} from '@mui/icons-material';

interface PageHeaderProps {
    activeTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
                                                          activeTab,
                                                          onTabChange
                                                      }) => {
    return (
        <>
            {/* Nagłówek strony */}
            <Box sx={{mb: 4}}>
                <Typography variant="h4" sx={{fontWeight: 700, color: '#212529', mb: 1}}>
                    <AccountBalance sx={{fontSize: '2rem', mr: 1, verticalAlign: 'middle', color: '#28a745'}}/>
                    System Rozliczeń
                </Typography>
                <Typography variant="body1" color="#6c757d" sx={{fontSize: '1.1rem'}}>
                    Zarządzaj rozliczeniami między domownikami i śledź historię płatności
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
                        icon={<AccountBalance/>}
                        iconPosition="start"
                        label="Rozliczenia"
                    />
                    <Tab
                        icon={<History/>}
                        iconPosition="start"
                        label="Historia rozliczeń"
                    />
                </Tabs>
            </Card>
        </>
    );
};
