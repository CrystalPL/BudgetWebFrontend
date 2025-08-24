import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box} from "@mui/material";
import TableColumn from "../../../household/components/base/TableColumn";
import * as React from "react";
import {useEffect, useState} from "react";
import {HouseholdReloadKeyProps} from "../../../household/api/HouseholdModel";
import {sort} from "../../../../util/SortUtil";
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import ConfirmationDialog from "../../../household/components/base/ConfirmationDialog";
import {deleteReceipt} from "../../api/ReceiptService";
import {Receipt} from "../../api/ReceiptModel";
import TableItem from "./TableItem";
import {applyFilter, applyAdvancedFilter, FilterConfig} from "../../types/FilterTypes";
import AdvancedFilterButton from "../../components/AdvancedFilterButton";
import {useAdvancedFilters} from "../../hooks/useAdvancedFilters";

interface ReceiptTableProps extends HouseholdReloadKeyProps {
    receipts: Receipt[]
    editedReceipt: Receipt | null
    setEditedReceipt: (receipt: Receipt) => void;
    createReceiptController: DialogShowingController
}

export default function ReceiptsOverviewTable(props: ReceiptTableProps) {
    const [orderShop, setOrderShop] = useState<'asc' | 'desc'>('asc');
    const [orderShoppingDate, setOrderShoppingDate] = useState<'asc' | 'desc'>('asc');
    const [orderReceiptAmount, setOrderReceiptAmount] = useState<'asc' | 'desc'>('asc');
    const [orderWhoPaid, setOrderWhoPaid] = useState<'asc' | 'desc'>('asc');
    const [orderSettled, setOrderSettled] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'shop' | 'shoppingDate' | 'receiptAmount' | 'whoPaid' | 'settled'>('shop');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const deleteReceiptDialogController = GetShowingController();

    // Hook dla zaawansowanych filtrów
    const { getActiveFilter } = useAdvancedFilters();

    // Filtry dla każdej kolumny
    const [shopFilter, setShopFilter] = useState<FilterConfig>({
        columnName: 'shop',
        columnType: 'text',
        operator: 'contains',
        value: '',
        active: false
    });

    const [shoppingDateFilter, setShoppingDateFilter] = useState<FilterConfig>({
        columnName: 'shoppingTime',
        columnType: 'date',
        operator: 'equals',
        value: '',
        active: false
    });

    const [receiptAmountFilter, setReceiptAmountFilter] = useState<FilterConfig>({
        columnName: 'receiptAmount',
        columnType: 'number',
        operator: 'equals',
        value: '',
        active: false
    });

    const [whoPaidFilter, setWhoPaidFilter] = useState<FilterConfig>({
        columnName: 'whoPaid.userName',
        columnType: 'text',
        operator: 'contains',
        value: '',
        active: false
    });

    const [settledFilter, setSettledFilter] = useState<FilterConfig>({
        columnName: 'settled',
        columnType: 'boolean',
        operator: 'equals',
        value: '',
        active: false
    });

    // Definicja dostępnych kolumn dla zaawansowanych filtrów
    const availableColumns = [
        { name: 'shop', type: 'text' as const, label: 'Sklep' },
        { name: 'shoppingTime', type: 'date' as const, label: 'Data zakupów' },
        { name: 'receiptAmount', type: 'number' as const, label: 'Kwota' },
        { name: 'whoPaid.userName', type: 'text' as const, label: 'Kto zapłacił', fieldOptions: { isUserField: true } },
        { name: 'settled', type: 'boolean' as const, label: 'Paragon rozliczony' }
    ];

    // Resetuj stronę przy zmianie filtrów lub zaawansowanych filtrów
    useEffect(() => {
        setPage(0);
    }, [shopFilter, shoppingDateFilter, receiptAmountFilter, whoPaidFilter, settledFilter, getActiveFilter()]);

    // Zastosuj filtry - najpierw podstawowe, potem zaawansowane
    const filteredReceipts = (() => {
        const activeAdvancedFilter = getActiveFilter();

        if (activeAdvancedFilter) {
            // Jeśli jest aktywny zaawansowany filtr, ignoruj podstawowe filtry kolumnowe
            return applyAdvancedFilter(props.receipts, activeAdvancedFilter);
        } else {
            // Jeśli nie ma zaawansowanego filtru, stosuj podstawowe filtry kolumnowe
            return applyFilter(props.receipts, [
                shopFilter,
                shoppingDateFilter,
                receiptAmountFilter,
                whoPaidFilter,
                settledFilter
            ]);
        }
    })();

    const sortedReceipts: Receipt[] = (() => {
        switch (orderBy) {
            case "shop":
                return sort(orderShop, filteredReceipts, value => value.shop)
            case "shoppingDate":
                return sort(orderShoppingDate, filteredReceipts, value => value.shoppingTime);
            case "receiptAmount":
                return sort(orderReceiptAmount, filteredReceipts, value => value.receiptAmount);
            case "whoPaid":
                return sort(orderWhoPaid, filteredReceipts, value => value.whoPaid.userName);
            case "settled":
                return sort(orderSettled, filteredReceipts, value => value.settled);
        }
    })();

    const paginatedReceipts = sortedReceipts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const activeAdvancedFilter = getActiveFilter();

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                mb: 4,
            }}
        >
            {/* Pasek z zaawansowanymi filtrami */}
            <Box sx={{
                p: 2,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box>
                    <AdvancedFilterButton availableColumns={availableColumns} />
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    {activeAdvancedFilter
                        ? `Filtrowanie: ${filteredReceipts.length} z ${props.receipts.length} paragonów (zaawansowany filtr aktywny)`
                        : `Pokazano: ${filteredReceipts.length} z ${props.receipts.length} paragonów`
                    }
                </Box>
            </Box>

            <Table>
                <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                    <TableRow>
                        <TableColumn
                            columnName="Sklep"
                            orderType={orderShop}
                            setOrderType={setOrderShop}
                            setOrderBy={() => setOrderBy('shop')}
                            columnType="text"
                            filterConfig={shopFilter}
                            onFilterChange={activeAdvancedFilter ? undefined : setShopFilter}
                        />
                        <TableColumn
                            columnName="Data zakupów"
                            orderType={orderShoppingDate}
                            setOrderType={setOrderShoppingDate}
                            setOrderBy={() => setOrderBy('shoppingDate')}
                            columnType="date"
                            filterConfig={shoppingDateFilter}
                            onFilterChange={activeAdvancedFilter ? undefined : setShoppingDateFilter}
                        />
                        <TableColumn
                            columnName="Kwota"
                            orderType={orderReceiptAmount}
                            setOrderType={setOrderReceiptAmount}
                            setOrderBy={() => setOrderBy('receiptAmount')}
                            columnType="number"
                            filterConfig={receiptAmountFilter}
                            onFilterChange={activeAdvancedFilter ? undefined : setReceiptAmountFilter}
                        />
                        <TableColumn
                            columnName="Kto zapłacil"
                            orderType={orderWhoPaid}
                            setOrderType={setOrderWhoPaid}
                            setOrderBy={() => setOrderBy('whoPaid')}
                            columnType="text"
                            filterConfig={whoPaidFilter}
                            onFilterChange={activeAdvancedFilter ? undefined : setWhoPaidFilter}
                            fieldOptions={{isUserField: true}}
                        />
                        <TableColumn
                            columnName="Paragon rozliczony"
                            orderType={orderSettled}
                            setOrderType={setOrderSettled}
                            setOrderBy={() => setOrderBy('settled')}
                            columnType="boolean"
                            filterConfig={settledFilter}
                            onFilterChange={activeAdvancedFilter ? undefined : setSettledFilter}
                        />
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedReceipts.map((receipt) => (
                        <TableItem key={receipt.id} receipt={receipt} setEditedReceipt={props.setEditedReceipt}
                                   createReceiptController={props.createReceiptController}
                                   deleteReceiptDialogController={deleteReceiptDialogController}/>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={sortedReceipts.length}
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
            <ConfirmationDialog
                open={deleteReceiptDialogController.openDialogStatus}
                closeDialog={deleteReceiptDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content="Czy na pewno chcesz usunąć paragon?"
                confirmText="Usuń"
                confirmColor="error"
                action={() => deleteReceipt(props.editedReceipt?.id)}
                reloadTable={props.reloadTable}
            />
        </TableContainer>
    )
}