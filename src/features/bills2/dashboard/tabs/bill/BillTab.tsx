import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {StateProp, useStateProp} from "../../../../../filter/StateProp";
import TableColumn, {OrderType} from "../../../../household/components/base/TableColumn";
import {Bill, BillingPeriod, BillType} from "../../../api/BillModel";
import {FilterValue, GetFilter} from "../../../../../filter/FilterModel";
import {UserWhoPaid} from "../../../../receipts/api/ReceiptModel";
import ConfirmationDialog from "../../../../household/components/base/ConfirmationDialog";
import {deleteReceipt} from "../../../../receipts/api/ReceiptService";
import {DialogShowingController, GetShowingController} from "../../../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../../../household/api/HouseholdModel";
import BillTabTableItem from "./BillTabTableItem";
import AdvancedFilterMainDialog from "../../../../../filter/advanced/main/AdvancedFilterMainDialog";
import {AdvancedField} from "../../../../../filter/advanced/api/AdvancedFilterModel";
import AddIcon from "@mui/icons-material/Add";
import {AutocompleteItem} from "../../../../../filter/advanced/filter-editor/condition-line/components/RenderInput";
import BillCreatorDialog from "./create/BillCreatorDialog";

type BillTypeOrder = 'type' | 'amount' | 'dueDate' | 'paymentDate' | 'billingPeriod' | 'whoPaid' | 'status'

interface BillTabProps extends HouseholdReloadKeyProps {
    billsProp: StateProp<Bill[]>
}

export default function BillTab(props: BillTabProps) {
    const typeOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const amountOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const dueDateOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const paymentDateOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const billingPeriodOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const whoPaidOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const statusOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const [orderBy, setOrderBy] = useState<BillTypeOrder>('type');

    const typeFilter: FilterValue<BillType> = GetFilter();
    const amountFilter: FilterValue<number> = GetFilter();
    const dueDateFilter: FilterValue<Date> = GetFilter();
    const paymentDateFilter: FilterValue<Date> = GetFilter();
    const billingPeriodFilter: FilterValue<BillingPeriod> = GetFilter();
    const whoPaidFilter: FilterValue<UserWhoPaid> = GetFilter();
    const statusFilter: FilterValue<boolean> = GetFilter();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const deleteBillDialogController = GetShowingController();

    useEffect(() => {
        setPage(0);
        //TODO pobieranie danych z backendu
    }, [
        typeOrderState,
        amountOrderState,
        dueDateOrderState,
        paymentDateOrderState,
        billingPeriodOrderState,
        whoPaidOrderState,
        statusOrderState,
        typeFilter,
        amountFilter,
        dueDateFilter,
        paymentDateFilter,
        billingPeriodFilter,
        whoPaidFilter,
        statusFilter
    ]);

    const paginatedBills = props.billsProp.value.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const advancedFilterShowingController: DialogShowingController = GetShowingController();
    const billCreatorDialogController: DialogShowingController = GetShowingController();

    const fields: AdvancedField<any>[] = [
        {
            columnDataType: 'autocomplete',
            columnName: 'type',
            columnLabel: "Typ",
            functionToGetSelectItems: async () => [],
            functionToMapItem: (item: UserWhoPaid): AutocompleteItem<any> => ({
                value: item.userId,
                renderAs: item.userName
            })
        },
        {
            columnDataType: 'number',
            columnName: 'amount',
            columnLabel: "Kwota",
        },
        {
            columnDataType: 'date',
            columnName: 'dueDate',
            columnLabel: "Termin płatności",
        },
        {
            columnDataType: 'date',
            columnName: 'paymentDate',
            columnLabel: "Data płatności",
        },
        {
            columnDataType: 'date',
            columnName: 'period',
            columnLabel: "Okres",
        },
        {
            columnDataType: 'autocomplete',
            columnName: 'whoPaid',
            columnLabel: "Kto zapłacił",
            functionToGetSelectItems: async () => [],
            functionToMapItem: (item: UserWhoPaid): AutocompleteItem<any> => ({
                value: item.userId,
                renderAs: item.userName
            })
        },
        {
            columnDataType: 'boolean',
            columnName: 'status',
            columnLabel: "Status",
            availableBooleanOptions: [
                {
                    label: "Opłacony",
                    value: true
                },
                {
                    label: "Nieopłacony",
                    value: false
                }
            ]
        },
    ]

    return (<>
        <Box display="flex" flexDirection="row" justifyContent='space-between' mb={2}>
            <Button sx={{bgcolor: 'green'}} onClick={advancedFilterShowingController.openDialog}></Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
                onClick={billCreatorDialogController.openDialog}
            >
                Dodaj rachunek
            </Button>
        </Box>
        <AdvancedFilterMainDialog fields={fields} dialogController={advancedFilterShowingController}/>
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
                        <TableColumn<BillType>
                            columnName="Typ"
                            orderProps={typeOrderState}
                            setOrderBy={() => setOrderBy('type')}
                            tableFilterProps={{
                                columnType: 'autocomplete',
                                filterValue: typeFilter
                            }}
                        />
                        <TableColumn<number>
                            columnName="Kwota"
                            orderProps={amountOrderState}
                            setOrderBy={() => setOrderBy('amount')}
                            tableFilterProps={{
                                columnType: 'number',
                                filterValue: amountFilter
                            }}
                        />
                        <TableColumn<Date>
                            columnName="Termin płatności"
                            orderProps={dueDateOrderState}
                            setOrderBy={() => setOrderBy('dueDate')}
                            tableFilterProps={{
                                columnType: 'date',
                                filterValue: dueDateFilter
                            }}
                        />
                        <TableColumn<Date>
                            columnName="Data płatności"
                            orderProps={paymentDateOrderState}
                            setOrderBy={() => setOrderBy('paymentDate')}
                            tableFilterProps={{
                                columnType: 'date',
                                filterValue: paymentDateFilter
                            }}
                        />
                        <TableColumn<BillingPeriod>
                            columnName="Okres"
                            orderProps={billingPeriodOrderState}
                            setOrderBy={() => setOrderBy('billingPeriod')}
                            tableFilterProps={{
                                columnType: 'autocomplete',
                                filterValue: billingPeriodFilter
                            }}
                        />
                        <TableColumn<UserWhoPaid>
                            columnName="Płacący"
                            orderProps={whoPaidOrderState}
                            setOrderBy={() => setOrderBy('whoPaid')}
                            tableFilterProps={{
                                columnType: 'autocomplete',
                                filterValue: whoPaidFilter
                            }}
                        />
                        <TableColumn<boolean>
                            columnName="Status"
                            orderProps={statusOrderState}
                            setOrderBy={() => setOrderBy('status')}
                            tableFilterProps={{
                                columnType: 'boolean',
                                filterValue: statusFilter
                            }}
                            availableBooleanOptions={[
                                {
                                    label: "Opłacony",
                                    value: true
                                },
                                {
                                    label: "Nieopłacony",
                                    value: false
                                }
                            ]}
                        />
                        <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Załącznik</TableCell>
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedBills.map((bill, index) => (
                        <BillTabTableItem bill={bill} key={index}
                                          deleteBillDialogController={deleteBillDialogController}/>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={props.billsProp.value.length}
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
                open={deleteBillDialogController.openDialogStatus}
                closeDialog={deleteBillDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content="Czy na pewno chcesz usunąć rachunek?"
                confirmText="Usuń"
                confirmColor="error"
                action={() => deleteReceipt(1231231)}  //TODO
                reloadTable={props.reloadTable}
            />
            <BillCreatorDialog billCreatorDialogController={billCreatorDialogController}/>
        </TableContainer>
    </>)
}
