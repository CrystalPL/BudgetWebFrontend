import React from 'react';
import {
    Box,
    Container,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

const TableSkeleton = () => {
    return (
        <Container sx={{pt: 5, pb: 5}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                {/* Dodajemy Skeleton do nagłówka "Zarządzanie domownikami" */}
                <Skeleton variant="text" width={200} height={32}/>
            </Box>

            {/* Tabela oczekujących użytkowników - Skeleton */}
            <TableContainer component={Paper} sx={{borderRadius: 3, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', mb: 4}}>
                <Table>
                    <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Skeleton variant="text" width={150} height={20}/>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Skeleton variant="text" width={100} height={20}/>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Skeleton variant="text" width={100} height={20}/>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Skeleton variant="text" width={100} height={20}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index} sx={{'&:hover': {backgroundColor: '#f5f5f5'}}}>
                                <TableCell>
                                    <Skeleton variant="text" width={150} height={20}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={100} height={20}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={100} height={20}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton variant="circular" width={24} height={24}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default TableSkeleton;
