import React from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon
} from '@mui/icons-material';
import { LogicalOperator } from '../types/FilterTypes';

interface AddConditionButtonProps {
    onAddCondition: () => void;
    onChangeOperator: (operator: LogicalOperator) => void;
    currentOperator: LogicalOperator;
    disabled?: boolean;
}

export default function AddConditionButton({
    onAddCondition,
    onChangeOperator,
    currentOperator,
    disabled = false
}: AddConditionButtonProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ButtonGroup variant="outlined" size="small" disabled={disabled}>
                <Tooltip title="Dodaj warunek z operatorem I (AND)">
                    <Button
                        variant={currentOperator === 'AND' ? 'contained' : 'outlined'}
                        color={currentOperator === 'AND' ? 'success' : 'inherit'}
                        onClick={() => {
                            if (currentOperator !== 'AND') {
                                onChangeOperator('AND');
                            }
                            onAddCondition();
                        }}
                        startIcon={<AddIcon />}
                        sx={{
                            minWidth: '100px',
                            fontWeight: currentOperator === 'AND' ? 'bold' : 'normal'
                        }}
                    >
                        + I
                    </Button>
                </Tooltip>
                <Tooltip title="Dodaj warunek z operatorem LUB (OR)">
                    <Button
                        variant={currentOperator === 'OR' ? 'contained' : 'outlined'}
                        color={currentOperator === 'OR' ? 'warning' : 'inherit'}
                        onClick={() => {
                            if (currentOperator !== 'OR') {
                                onChangeOperator('OR');
                            }
                            onAddCondition();
                        }}
                        startIcon={<AddIcon />}
                        sx={{
                            minWidth: '100px',
                            fontWeight: currentOperator === 'OR' ? 'bold' : 'normal'
                        }}
                    >
                        + LUB
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </Box>
    );
}
