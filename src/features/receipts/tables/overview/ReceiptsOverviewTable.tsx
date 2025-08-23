import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import TableColumn from "../../../household/components/base/TableColumn";
import * as React from "react";
import {useState} from "react";
import {HouseholdReloadKeyProps} from "../../../household/api/HouseholdModel";
import {sort} from "../../../../util/SortUtil";
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import ConfirmationDialog from "../../../household/components/base/ConfirmationDialog";
import {deleteReceipt} from "../../api/ReceiptService";
import {Receipt} from "../../api/ReceiptModel";
import TableItem from "./TableItem";

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
    const deleteReceiptDialogController = GetShowingController()

    const sortedReceipts: Receipt[] = (() => {
        switch (orderBy) {
            case "shop":
                return sort(orderShop, props.receipts, value => value.shop)
            case "shoppingDate":
                return sort(orderShoppingDate, props.receipts, value => value.shoppingTime);
            case "receiptAmount":
                return sort(orderReceiptAmount, props.receipts, value => value.receiptAmount);
            case "whoPaid":
                return sort(orderWhoPaid, props.receipts, value => value.whoPaid.userName);
            case "settled":
                return sort(orderSettled, props.receipts, value => value.settled);
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

    return (
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
                        <TableColumn columnName="Sklep" orderType={orderShop}
                                     setOrderType={setOrderShop}
                                     setOrderBy={() => setOrderBy('shop')}></TableColumn>
                        <TableColumn columnName="Data zakupów" orderType={orderShoppingDate}
                                     setOrderType={setOrderShoppingDate}
                                     setOrderBy={() => setOrderBy('shoppingDate')}></TableColumn>
                        <TableColumn columnName="Kwota" orderType={orderReceiptAmount}
                                     setOrderType={setOrderReceiptAmount}
                                     setOrderBy={() => setOrderBy('receiptAmount')}></TableColumn>
                        <TableColumn columnName="Kto zapłacil" orderType={orderWhoPaid}
                                     setOrderType={setOrderWhoPaid}
                                     setOrderBy={() => setOrderBy('whoPaid')}></TableColumn>
                        <TableColumn columnName="Paragon rozliczony" orderType={orderSettled}
                                     setOrderType={setOrderSettled}
                                     setOrderBy={() => setOrderBy('settled')}></TableColumn>
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedReceipts
                        .map((receipt) => (
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