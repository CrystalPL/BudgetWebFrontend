import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import {Add, Delete, Edit} from '@mui/icons-material';
import {BillType} from '../api/BillModel';

interface BillTypeTableProps {
    billTypes: BillType[];
    onEdit: (billType: BillType) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

export const BillTypeTable: React.FC<BillTypeTableProps> = ({
                                                                billTypes,
                                                                onEdit,
                                                                onDelete,
                                                                onAdd
                                                            }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const paginatedTypes = billTypes.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{p: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                    <Typography variant="h6" sx={{fontWeight: 600}}>
                        Lista typów rachunków ({billTypes.length})
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add/>}
                        onClick={onAdd}
                        sx={{
                            backgroundColor: '#007bff',
                            '&:hover': {backgroundColor: '#0056b3'}
                        }}
                    >
                        Dodaj nowy typ
                    </Button>
                </Box>

                <TableContainer component={Paper} elevation={1}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ikona</TableCell>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>Jednostka</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell align="center">Akcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedTypes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body2" color="text.secondary">
                                            Brak typów rachunków do wyświetlenia
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedTypes.map((billType) => (
                                    <TableRow key={billType.id} hover>
                                        <TableCell>
                                            <Avatar
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor: '#f5f5f5',
                                                    color: '#333',
                                                    fontSize: '1.2rem'
                                                }}
                                            >
                                                {billType.icon || '📄'}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" fontWeight="medium">
                                                {billType.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {billType.unit || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {billType.description || '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="center" gap={1}>
                                                <Tooltip title="Edytuj">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => onEdit(billType)}
                                                        color="primary"
                                                    >
                                                        <Edit/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Usuń">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => onDelete(billType.id)}
                                                        color="error"
                                                    >
                                                        <Delete/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={billTypes.length}
                        page={page}
                        onPageChange={(_event, page) => setPage(page)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelRowsPerPage="Wierszy na stronę:"
                        labelDisplayedRows={({from, to, count}) =>
                            `${from}–${to} z ${count !== -1 ? count : `ponad ${to}`}`
                        }
                    />
                </TableContainer>
            </Box>
        </Card>
    );
};
