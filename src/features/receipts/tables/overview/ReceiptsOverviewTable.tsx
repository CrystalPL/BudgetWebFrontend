import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import TableColumn, {OrderType} from "../../../household/components/base/TableColumn";
import * as React from "react";
import {useState} from "react";
import {HouseholdReloadKeyProps} from "../../../household/api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import ConfirmationDialog from "../../../household/components/base/ConfirmationDialog";
import {deleteReceipt} from "../../api/ReceiptService";
import {Receipt, UserWhoPaid} from "../../api/ReceiptModel";
import TableItem from "./TableItem";
import AdvancedFilterButton from "../../components/AdvancedFilterButton";
import {useAdvancedFilters} from "../../hooks/useAdvancedFilters";
import {StateProp, useStateProp} from "../../../../filter/StateProp";
import {FilterValue, GetFilter} from "../../../../filter/basic/FilterModel";

interface ReceiptTableProps extends HouseholdReloadKeyProps {
    receipts: Receipt[]
    editedReceipt: Receipt | null
    setEditedReceipt: (receipt: Receipt) => void;
    createReceiptController: DialogShowingController
}

export default function ReceiptsOverviewTable(props: ReceiptTableProps) {
    const shopOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const shoppingDateOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const receiptAmountOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const whoPaidOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const settledOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const [orderBy, setOrderBy] = useState<'shop' | 'shoppingDate' | 'receiptAmount' | 'whoPaid' | 'settled'>('shop');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const deleteReceiptDialogController = GetShowingController();

    const {getActiveFilter} = useAdvancedFilters();

    // Definicja dostępnych kolumn dla zaawansowanych filtrów
    const availableColumns = [
        {name: 'shop', type: 'text' as const, label: 'Sklep'},
        {name: 'shoppingTime', type: 'date' as const, label: 'Data zakupów'},
        {name: 'receiptAmount', type: 'number' as const, label: 'Kwota'},
        {name: 'whoPaid.userName', type: 'text' as const, label: 'Kto zapłacił', fieldOptions: {isUserField: true}},
        {name: 'settled', type: 'boolean' as const, label: 'Paragon rozliczony'}
    ];

    // Resetuj stronę przy zmianie filtrów lub zaawansowanych filtrów
    // useEffect(() => {
    //     setPage(0);
    // }, [shopFilter, shoppingDateFilter, receiptAmountFilter, whoPaidFilter, settledFilter, getActiveFilter()]);

    const paginatedReceipts = props.receipts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const activeAdvancedFilter = getActiveFilter();

    const shopFilter: FilterValue<string> = GetFilter();
    const shoppingTimeFilter: FilterValue<Date> = GetFilter();
    const amountFilter: FilterValue<number> = GetFilter();
    const whoPaidFilter: FilterValue<UserWhoPaid> = GetFilter();
    const settledFilter: FilterValue<boolean> = GetFilter();

    console.log(shopFilter.valueFrom.value)

    return (<>
        <AdvancedFilterButton availableColumns={availableColumns}/>
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                mb: 4,
            }}
        >
            <Table>
                <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                    <TableRow>
                        <TableColumn<string>
                            columnName="Sklep"
                            orderProps={shopOrderState}
                            setOrderBy={() => setOrderBy('shop')}
                            tableFilterProps={{
                                columnType: 'text',
                                filterValue: shopFilter
                            }}
                        />
                        <TableColumn<Date>
                            columnName="Data zakupów"
                            orderProps={shoppingDateOrderState}
                            setOrderBy={() => setOrderBy('shoppingDate')}
                            tableFilterProps={{
                                columnType: 'date',
                                filterValue: shoppingTimeFilter
                            }}
                        />
                        <TableColumn<number>
                            columnName="Kwota"
                            orderProps={receiptAmountOrderState}
                            setOrderBy={() => setOrderBy('receiptAmount')}
                            tableFilterProps={{
                                columnType: 'number',
                                filterValue: amountFilter
                            }}
                        />
                        <TableColumn<UserWhoPaid>
                            columnName="Kto zapłacil"
                            orderProps={whoPaidOrderState}
                            setOrderBy={() => setOrderBy('whoPaid')}
                            tableFilterProps={{
                                columnType: 'autocomplete',
                                filterValue: whoPaidFilter,
                                functionToGetSelectItems: async () => [],
                                functionToMapItem: (item: UserWhoPaid) => ({
                                    key: item.userId,
                                    value: item.userId,
                                    renderAs: item.userName
                                })
                            }}
                        />
                        <TableColumn<boolean>
                            columnName="Paragon rozliczony"
                            orderProps={settledOrderState}
                            setOrderBy={() => setOrderBy('settled')}
                            tableFilterProps={{
                                columnType: 'boolean',
                                filterValue: settledFilter
                            }}
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
                count={props.receipts.length}
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
    </>)
}