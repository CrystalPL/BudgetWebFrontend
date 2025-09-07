'use client'
import React, {useEffect, useState} from 'react';
import {BillTypeTable} from '../components/BillTypeTable';
import {BillTypeModal} from '../components/BillTypeModal';
import {createBillType, deleteBillType, getBillTypes, updateBillType} from '../api/BillTypeService';
import {HouseholdReloadKeyProps} from '../../household/api/HouseholdModel';
import Container from "@mui/material/Container";
import BillDashboardHeader from "../../bills2/dashboard/BillDashboardHeader";
import BillDashboard from "./BillDashboard";
import {Bill, BillType} from "../../bills2/api/BillModel";

interface BillMainDashboardProps extends HouseholdReloadKeyProps {
    bills: Bill[];
}

export default function BillMainDashboard(props: BillMainDashboardProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [billTypes, setBillTypes] = useState<BillType[]>([]);
    const [editingType, setEditingType] = useState<BillType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
        setSnackbar({open: true, message, severity});
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}));
    };

    const loadBillTypes = async () => {
        try {
            setIsLoading(true);
            const response = await getBillTypes();
            if (response.success) {
                setBillTypes(response.data);
            } else {
                showSnackbar('Błąd podczas ładowania typów rachunków', 'error');
            }
        } catch (error) {
            console.error('Error loading bill types:', error);
            showSnackbar('Błąd podczas ładowania typów rachunków', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 1) {
            loadBillTypes();
        }
    }, [activeTab]);

    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue);
        if (newValue === 0) {
            setEditingType(null);
        }
    };

    const handleEdit = (billType: BillType) => {
        setEditingType(billType);
        setModalOpen(true);
    };

    const handleAdd = () => {
        setEditingType(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingType(null);
        setModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Czy na pewno chcesz usunąć ten typ rachunku?')) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await deleteBillType(id);
            if (response.success) {
                showSnackbar('Typ rachunku został usunięty pomyślnie');
                await loadBillTypes();
            } else {
                showSnackbar('Błąd podczas usuwania typu rachunku', 'error');
            }
        } catch (error) {
            console.error('Error deleting bill type:', error);
            showSnackbar('Błąd podczas usuwania typu rachunku', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (data: {
        name: string;
        icon: string;
        unit?: string;
        description?: string;
    }) => {
        try {
            setIsLoading(true);
            let response;

            if (editingType) {
                response = await updateBillType({
                    id: editingType.id,
                    ...data
                });
            } else {
                response = await createBillType(data);
            }

            if (response.success) {
                const action = editingType ? 'zaktualizowany' : 'dodany';
                showSnackbar(`Typ rachunku został ${action} pomyślnie`);
                await loadBillTypes();
                setEditingType(null);
                setModalOpen(false);
            } else {
                showSnackbar('Błąd podczas zapisywania typu rachunku', 'error');
            }
        } catch (error) {
            console.error('Error saving bill type:', error);
            showSnackbar('Błąd podczas zapisywania typu rachunku', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '95%',
                lg: '95%',
                xl: '95%',
            },
        }}>
            <BillDashboardHeader
                activeTab={activeTab}
                setActiveTab={handleTabChange}
            />

            {activeTab === 0 && (
                <BillDashboard
                    bills={props.bills}
                    reloadTable={props.reloadTable}
                />
            )}

            {activeTab === 1 && (
                <BillTypeTable
                    billTypes={billTypes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            )}

            <BillTypeModal
                open={modalOpen}
                onClose={handleCloseModal}
                editingType={editingType}
                onSave={handleSave}
                isLoading={isLoading}
            />
        </Container>
    );
}

interface ActiveTabProps {
    activeTab: number
    dashboardProps: BillMainDashboardProps
}

function ActiveTab(props: ActiveTabProps) {
    if (props.activeTab == 0) {
        return (
            <BillDashboard
                bills={props.dashboardProps.bills}
                reloadTable={props.dashboardProps.reloadTable}
            />
        )
    }

    return (
        <BillTypeTable
            billTypes={billTypes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
        />
    )
}
