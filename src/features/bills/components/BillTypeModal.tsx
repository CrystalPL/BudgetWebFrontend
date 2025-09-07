import React, {useState} from 'react';
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@mui/material';
import {Add, Close, Save} from '@mui/icons-material';
import {BillTypeForm} from './BillTypeForm';

import {BillType} from "../../bills2/api/BillModel";

interface BillTypeModalProps {
    open: boolean;
    onClose: () => void;
    editingType: BillType | null;
    onSave: (data: {
        name: string;
        icon: string;
        unit?: string;
        description?: string;
    }) => void;
    isLoading?: boolean;
}

export const BillTypeModal: React.FC<BillTypeModalProps> = ({
                                                                open,
                                                                onClose,
                                                                editingType,
                                                                onSave,
                                                                isLoading = false
                                                            }) => {
    const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);

    const handleSave = () => {
        if (formRef) {
            // Trigger form submission
            const event = new Event('submit', {cancelable: true, bubbles: true});
            formRef.dispatchEvent(event);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={!isLoading ? onClose : undefined}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1,
                fontSize: '1.25rem',
                fontWeight: 600
            }}>
                {editingType ? 'Edytuj typ rachunku' : 'Dodaj nowy typ rachunku'}
                <IconButton onClick={onClose} size="small" disabled={isLoading}>
                    <Close/>
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{p: 3}}>
                <BillTypeForm
                    editingType={editingType}
                    onSave={onSave}
                    onCancel={onClose}
                    isLoading={isLoading}
                    isModal={true}
                    formRef={setFormRef}
                />
            </DialogContent>

            <DialogActions sx={{p: 2, gap: 1}}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Anuluj
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16}/> : (editingType ? <Save/> : <Add/>)}
                    sx={{
                        backgroundColor: '#007bff',
                        '&:hover': {backgroundColor: '#0056b3'}
                    }}
                >
                    {editingType ? 'Zapisz zmiany' : 'Dodaj typ'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
