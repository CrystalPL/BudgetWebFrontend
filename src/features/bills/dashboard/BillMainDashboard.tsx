'use client'
import React, {useEffect, useState} from 'react';
import {Alert, Container, Snackbar} from '@mui/material';
import {BillPageHeader} from '../components/BillPageHeader';
import BillDashboard from './BillDashboard';
import {BillTypeTable} from '../components/BillTypeTable';
import {BillTypeForm} from '../components/BillTypeForm';
import {Bill, BillType} from '../api/BillModel';
import {createBillType, deleteBillType, getBillTypes, updateBillType} from '../api/BillTypeService';
import {HouseholdReloadKeyProps} from '../../household/api/HouseholdModel';

interface BillMainDashboardProps extends HouseholdReloadKeyProps {
    bills: Bill[];
}

export default function BillMainDashboard(props: BillMainDashboardProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [billTypes, setBillTypes] = useState<BillType[]>([]);
    const [editingType, setEditingType] = useState<BillType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [managementView, setManagementView] = useState<'list' | 'form'>('list');
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        if (newValue === 0) {
            setEditingType(null);
            setManagementView('list');
        }
    };

    const handleEdit = (billType: BillType) => {
        setEditingType(billType);
        setManagementView('form');
    };

    const handleAdd = () => {
        setEditingType(null);
        setManagementView('form');
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
                setManagementView('list');
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

    const handleCancel = () => {
        setEditingType(null);
        setManagementView('list');
    };

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '90%',
                lg: '80%',
                xl: '88%',
            },
        }}>
            <BillPageHeader
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {activeTab === 0 && (
                <BillDashboard
                    bills={props.bills}
                    reloadTable={props.reloadTable}
                />
            )}

            {activeTab === 1 && (
                <>
                    {managementView === 'list' ? (
                        <BillTypeTable
                            billTypes={billTypes}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAdd={handleAdd}
                        />
                    ) : (
                        <BillTypeForm
                            editingType={editingType}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isLoading={isLoading}
                        />
                    )}
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
