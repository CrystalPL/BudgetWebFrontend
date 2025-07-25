import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import TableColumn from "../../household/components/base/TableColumn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useState} from "react";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {sort} from "../../../util/SortUtil";
import {History} from "@mui/icons-material";
import {Receipt} from "@/features/receipts/api/ReceiptModel";

interface ReceiptTableProps extends HouseholdReloadKeyProps {
    receipts: Receipt[]
}

export default function ReceiptTable({receipts, reloadTable}: ReceiptTableProps) {
    const [orderShop, setOrderShop] = useState<'asc' | 'desc'>('asc');
    const [orderShoppingDate, setOrderShoppingDate] = useState<'asc' | 'desc'>('asc');
    const [orderReceiptAmount, setOrderReceiptAmount] = useState<'asc' | 'desc'>('asc');
    const [orderWhoPaid, setOrderWhoPaid] = useState<'asc' | 'desc'>('asc');
    const [orderSettled, setOrderSettled] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'shop' | 'shoppingDate' | 'receiptAmount' | 'whoPaid' | 'settled'>('shop');

    const sortedReceipts: Receipt[] = (() => {
        switch (orderBy) {
            case "shop":
                return sort(orderShop, receipts, value => value.shop)
            case "shoppingDate":
                return sort(orderShoppingDate, receipts, value => value.shoppingTime);
            case "receiptAmount":
                return sort(orderReceiptAmount, receipts, value => value.receiptAmount);
            case "whoPaid":
                return sort(orderWhoPaid, receipts, value => value.whoPaid);
            case "settled":
                return sort(orderSettled, receipts, value => value.settled);
        }
    })();


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
                    {sortedReceipts
                        .map((receipt) => (
                            <TableRow key={receipt.id} sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}>
                                <TableCell>{receipt.shop}</TableCell>
                                <TableCell>{receipt.shoppingTime.toLocaleString('pl-PL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</TableCell>
                                <TableCell>{receipt.receiptAmount}</TableCell>
                                <TableCell>{receipt.whoPaid.name}</TableCell>
                                <TableCell>{receipt.settled ? "Tak" : "Nie"}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edytuj paragon">
                                        <IconButton
                                            color="primary"
                                            // onClick={() => handleAction(receipt, editCategoryDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(75,187,71,0.2)",
                                                },
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Usuń paragon">
                                        <IconButton
                                            color="error"
                                            // onClick={() => handleAction(receipt, deleteCategoryDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(206,21,21,0.2)",
                                                },
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Historia zmian">
                                        <IconButton
                                            color="error"
                                            // onClick={() => handleAction(receipt, deleteCategoryDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(206,21,21,0.2)",
                                                },
                                            }}
                                        >
                                            <History/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}