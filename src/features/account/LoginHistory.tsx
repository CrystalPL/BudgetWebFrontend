import React from 'react';
import {
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Box from "@mui/material/Box";

const LoginHistory = () => {
    const rows = [
        {
            loginType: 'Credential login',
            time: '01:44 PM Oct 1, 2024',
            ip: '95.130.17.84',
            userAgent: 'Chrome, Mac OS 10.15.7'
        },
        {
            loginType: 'Credential login',
            time: '01:24 PM Oct 1, 2024',
            ip: '95.130.17.84',
            userAgent: 'Chrome, Mac OS 10.15.7'
        }
    ];

    return (
        <Box sx={{pb: 5}}>
            <Typography variant="h5" gutterBottom>
                Historia logowania
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '12px', // zaokrąglone rogi
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // lekki cień
                    mb: 4,
                }}
            >
                <Table>
                    <TableHead sx={{backgroundColor: '#f5f5f5'}}> {/* szare tło nagłówka */}
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', color: '#757575', borderBottom: '1px solid #ddd'}}>Typ
                                logowania</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#757575', borderBottom: '1px solid #ddd'}}>Adres
                                ip</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: '#757575',
                                borderBottom: '1px solid #ddd'
                            }}>Urządzenie</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography variant="subtitle1">{row.loginType}</Typography>
                                            </>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="textSecondary">
                                                {row.time}
                                            </Typography>
                                        }
                                    />
                                </TableCell>
                                <TableCell>{row.ip}</TableCell>
                                <TableCell>{row.userAgent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
};

export default LoginHistory;
