import React, {useEffect, useState} from 'react';
import {Alert, Container, Snackbar} from '@mui/material';
import {BillTypePageHeader} from '../components/BillTypePageHeader';
import {BillTypeTable} from '../components/BillTypeTable';
import {BillTypeForm} from '../components/BillTypeForm';
import {BillType} from '../api/BillModel';
import {createBillType, deleteBillType, getBillTypes, updateBillType} from '../api/BillTypeService';

export default function BillTypeDashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const [billTypes, setBillTypes] = useState<BillType[]>([]);
    const [editingType, setEditingType] = useState<BillType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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
        loadBillTypes();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        if (newValue === 0) {
            setEditingType(null);
        }
    };

    const handleEdit = (billType: BillType) => {
        setEditingType(billType);
        setActiveTab(1);
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
                setActiveTab(0);
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
        setActiveTab(0);
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
            <BillTypePageHeader
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {activeTab === 0 && (
                <BillTypeTable
                    billTypes={billTypes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {activeTab === 1 && (
                <BillTypeForm
                    editingType={editingType}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isLoading={isLoading}
                />
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
