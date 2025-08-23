'use client'
import Container from "@mui/material/Container";
import * as React from "react";
import {useMemo, useState} from "react";
import BillsOverviewTable from "../tables/BillsOverviewTable";
import {BillFilters} from "../components/BillFilters";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {Bill, CreateBillDetails} from "../api/BillModel";
import {BillDateFilter, BillFilter, BillSortConfig} from "../types";
import CreateBillDialog from "../forms/CreateBillDialog";

interface BillDashboardData extends HouseholdReloadKeyProps {
    bills: Bill[];
}

export default function BillDashboard(props: BillDashboardData) {
    const createBillDialogController: DialogShowingController = GetShowingController()
    const [editedBill, setEditedBill] = useState<Bill | null>(null)
    const [createBillDetails, setCreateBillDetails] = useState<CreateBillDetails | null>(null)

    // Stan filtrów
    const [dateFilter, setDateFilter] = useState<BillDateFilter>({
        dueDateFrom: '',
        dueDateTo: '',
        paymentDateFrom: '',
        paymentDateTo: '',
        period: 'all'
    });

    const [billFilter, setBillFilter] = useState<BillFilter>({
        searchTerm: '',
        billType: 'all',
        status: 'all',
        whoPaid: 'all',
        period: ''
    });

    const [sortConfig, setSortConfig] = useState<BillSortConfig>({
        field: 'dueDate',
        direction: 'desc'
    });

    // Funkcje obsługi filtrów
    const handleSetPredefinedPeriod = (period: string) => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        let startDate = '';
        let endDate = today;

        switch (period) {
            case 'week':
                const weekAgo = new Date(now);
                weekAgo.setDate(now.getDate() - 7);
                startDate = weekAgo.toISOString().split('T')[0];
                break;
            case 'month':
                const monthAgo = new Date(now);
                monthAgo.setMonth(now.getMonth() - 1);
                startDate = monthAgo.toISOString().split('T')[0];
                break;
            case 'year':
                const yearAgo = new Date(now);
                yearAgo.setFullYear(now.getFullYear() - 1);
                startDate = yearAgo.toISOString().split('T')[0];
                break;
            case 'all':
            default:
                startDate = '';
                endDate = '';
                break;
        }

        setDateFilter(prev => ({
            ...prev,
            dueDateFrom: startDate,
            dueDateTo: endDate,
            period: period as any
        }));
    };

    const handleSort = (field: BillSortConfig['field']) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Dane do filtrów
    const billTypes = useMemo(() => {
        const types = props.bills.map(bill => bill.billType);
        return types.filter((type, index, self) =>
            index === self.findIndex(t => t.id === type.id)
        );
    }, [props.bills]);

    const users = useMemo(() => {
        const allUsers = props.bills.map(bill => bill.whoPaid);
        return allUsers.filter((user, index, self) =>
            index === self.findIndex(u => u.userId === user.userId)
        );
    }, [props.bills]);

    const periods = useMemo(() => {
        const allPeriods = props.bills.map(bill => bill.period);
        return [...new Set(allPeriods)].sort();
    }, [props.bills]);

    // Filtrowane rachunki
    const filteredBills = useMemo(() => {
        let filtered = [...props.bills];

        // Filtrowanie po wyszukiwanym tekście
        if (billFilter.searchTerm) {
            const searchLower = billFilter.searchTerm.toLowerCase();
            filtered = filtered.filter(bill =>
                bill.billType.name.toLowerCase().includes(searchLower) ||
                bill.whoPaid.userName.toLowerCase().includes(searchLower) ||
                bill.period.toLowerCase().includes(searchLower) ||
                (bill.description && bill.description.toLowerCase().includes(searchLower))
            );
        }

        // Filtrowanie po typie rachunku
        if (billFilter.billType !== 'all') {
            filtered = filtered.filter(bill => bill.billType.id === billFilter.billType);
        }

        // Filtrowanie po statusie
        if (billFilter.status !== 'all') {
            filtered = filtered.filter(bill =>
                billFilter.status === 'paid' ? bill.isPaid : !bill.isPaid
            );
        }

        // Filtrowanie po płacącym
        if (billFilter.whoPaid !== 'all') {
            filtered = filtered.filter(bill => bill.whoPaid.userId === billFilter.whoPaid);
        }

        // Filtrowanie po okresie
        if (billFilter.period) {
            filtered = filtered.filter(bill => bill.period === billFilter.period);
        }

        // Filtrowanie po dacie terminu płatności
        if (dateFilter.dueDateFrom) {
            filtered = filtered.filter(bill =>
                new Date(bill.dueDate) >= new Date(dateFilter.dueDateFrom)
            );
        }
        if (dateFilter.dueDateTo) {
            filtered = filtered.filter(bill =>
                new Date(bill.dueDate) <= new Date(dateFilter.dueDateTo)
            );
        }

        // Filtrowanie po dacie płatności
        if (dateFilter.paymentDateFrom) {
            filtered = filtered.filter(bill =>
                bill.paymentDate && new Date(bill.paymentDate) >= new Date(dateFilter.paymentDateFrom)
            );
        }
        if (dateFilter.paymentDateTo) {
            filtered = filtered.filter(bill =>
                bill.paymentDate && new Date(bill.paymentDate) <= new Date(dateFilter.paymentDateTo)
            );
        }

        // Sortowanie
        filtered.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortConfig.field) {
                case 'dueDate':
                    aValue = new Date(a.dueDate).getTime();
                    bValue = new Date(b.dueDate).getTime();
                    break;
                case 'paymentDate':
                    aValue = a.paymentDate ? new Date(a.paymentDate).getTime() : 0;
                    bValue = b.paymentDate ? new Date(b.paymentDate).getTime() : 0;
                    break;
                case 'amount':
                    aValue = a.amount;
                    bValue = b.amount;
                    break;
                case 'billType':
                    aValue = a.billType.name.toLowerCase();
                    bValue = b.billType.name.toLowerCase();
                    break;
                case 'whoPaid':
                    aValue = a.whoPaid.userName.toLowerCase();
                    bValue = b.whoPaid.userName.toLowerCase();
                    break;
                case 'period':
                    aValue = a.period;
                    bValue = b.period;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [props.bills, billFilter, dateFilter, sortConfig]);

    return (
        <Container disableGutters={true} sx={{
            pt: 3,
            pb: 3,
            maxWidth: {
                xs: '100%',
                md: '100%',
                lg: '100%',
                xl: '100%',
            },
        }}>

            <BillFilters
                dateFilter={dateFilter}
                billFilter={billFilter}
                sortConfig={sortConfig}
                filteredCount={filteredBills.length}
                billTypes={billTypes}
                users={users}
                periods={periods}
                onDateFilterChange={setDateFilter}
                onBillFilterChange={setBillFilter}
                onSort={handleSort}
                onSetPredefinedPeriod={handleSetPredefinedPeriod}
            />

            <BillsOverviewTable
                bills={filteredBills}
                reloadTable={props.reloadTable}
                editedBill={editedBill}
                setEditedBill={setEditedBill}
                createBillController={createBillDialogController}
            />
            <CreateBillDialog
                creatingController={createBillDialogController}
                editedBill={editedBill}
                setEditedBill={setEditedBill}
                createBillDetails={createBillDetails}
                setCreateBillDetails={setCreateBillDetails}
                reloadTable={props.reloadTable}
            />
        </Container>
    )
}
