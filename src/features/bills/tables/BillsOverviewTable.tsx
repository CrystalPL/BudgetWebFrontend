'use client'
import {
    Avatar,
    Box,
    Chip,
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
} from "@mui/material";
import {AttachFile, Delete, Edit, Visibility} from "@mui/icons-material";
import {Bill} from "../api/BillModel";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {deleteBill} from "../api/BillService";
import {useState} from "react";
import AttachmentViewer from "../components/AttachmentViewer";

interface Props {
    bills: Bill[];
    reloadTable: () => void;
    editedBill: Bill | null;
    setEditedBill: (bill: Bill | null) => void;
    createBillController: DialogShowingController;
}

export default function BillsOverviewTable(props: Props) {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState<{
        url: string,
        name: string,
        type: string
    } | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleEdit = (bill: Bill) => {
        props.setEditedBill(bill);
        props.createBillController.openDialog();
    };

    const handleDelete = async (billId: number) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten rachunek?')) {
            try {
                await deleteBill(billId);
                props.reloadTable();
            } catch (error) {
                console.error('Błąd podczas usuwania rachunku:', error);
            }
        }
    };

    const handleViewAttachment = (bill: Bill) => {
        if (bill.attachmentUrl && bill.attachmentName && bill.attachmentType) {
            setSelectedAttachment({
                url: bill.attachmentUrl,
                name: bill.attachmentName,
                type: bill.attachmentType
            });
            setViewerOpen(true);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '-';
        return date.toLocaleDateString('pl-PL');
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN'
        }).format(amount);
    };

    const getBillTypeIcon = (billType: any) => {
        return billType.icon || '📄';
    };

    const sortedBills = [...props.bills].sort((a, b) => {
        // Najpierw nieopłacone, potem według daty płatności
        if (a.isPaid !== b.isPaid) {
            return a.isPaid ? 1 : -1;
        }
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });

    const paginatedBills = sortedBills.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <TableContainer component={Paper} elevation={1}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Typ</TableCell>
                            <TableCell>Kwota</TableCell>
                            <TableCell>Termin płatności</TableCell>
                            <TableCell>Data płatności</TableCell>
                            <TableCell>Okres</TableCell>
                            <TableCell>Płacący</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Załącznik</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBills.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Brak rachunków do wyświetlenia
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBills.map((bill) => (
                                <TableRow key={bill.id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Avatar sx={{width: 24, height: 24, fontSize: 14}}>
                                                {getBillTypeIcon(bill.billType)}
                                            </Avatar>
                                            {bill.billType.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="medium">
                                            {formatAmount(bill.amount)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color={
                                            !bill.isPaid && new Date(bill.dueDate) < new Date() ? 'error' : 'text.primary'
                                        }>
                                            {formatDate(bill.dueDate)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{formatDate(bill.paymentDate)}</TableCell>
                                    <TableCell>{bill.period}</TableCell>
                                    <TableCell>{bill.whoPaid.userName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={bill.isPaid ? 'Opłacony' : 'Nieopłacony'}
                                            color={bill.isPaid ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {bill.attachmentUrl ? (
                                            <Tooltip title={`Zobacz załącznik: ${bill.attachmentName}`}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleViewAttachment(bill)}
                                                    color="primary"
                                                >
                                                    <Visibility/>
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Brak załącznika">
                                                <IconButton size="small" disabled>
                                                    <AttachFile/>
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <Tooltip title="Edytuj">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(bill)}
                                                    color="primary"
                                                >
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Usuń">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(bill.id)}
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
                    count={sortedBills.length}
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

            <AttachmentViewer
                open={viewerOpen}
                onClose={() => setViewerOpen(false)}
                attachment={selectedAttachment}
            />
        </Box>
    );
}
