import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
    Tooltip
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import {
    FilterCondition,
    FilterType,
    FilterOperator
} from '../types/FilterTypes';
import { UserWhoPaid } from '../api/ReceiptModel';
import { getCreateReceiptDetails } from '../api/ReceiptService';

interface ConditionBuilderProps {
    condition: FilterCondition;
    availableColumns: Array<{
        name: string;
        type: FilterType;
        label: string;
        fieldOptions?: {
            isUserField?: boolean;
        };
    }>;
    onChange: (updates: Partial<FilterCondition>) => void;
    onRemove: () => void;
    canRemove: boolean;
}

export default function ConditionBuilder({
    condition,
    availableColumns,
    onChange,
    onRemove,
    canRemove
}: ConditionBuilderProps) {
    const [users, setUsers] = useState<UserWhoPaid[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

    const selectedColumn = availableColumns.find(col => col.name === condition.columnName);
    const isUserField = selectedColumn?.fieldOptions?.isUserField;

    // Pobierz listę użytkowników jeśli pole jest polem użytkownika
    useEffect(() => {
        if (isUserField) {
            setLoadingUsers(true);
            getCreateReceiptDetails()
                .then((data) => {
                    setUsers(data.whoPaidLists);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania listy użytkowników:', error);
                })
                .finally(() => {
                    setLoadingUsers(false);
                });
        }
    }, [isUserField]);

    // Resetuj operator i wartości gdy zmienia się kolumna
    const handleColumnChange = (columnName: string) => {
        const column = availableColumns.find(col => col.name === columnName);
        if (column) {
            const defaultOperator = getDefaultOperator(column.type);
            onChange({
                columnName,
                columnType: column.type,
                operator: defaultOperator,
                value: '',
                value2: undefined,
                fieldOptions: column.fieldOptions
            });
        }
    };

    // Resetuj wartości gdy zmienia się operator
    const handleOperatorChange = (operator: FilterOperator) => {
        onChange({
            operator,
            value: '',
            value2: undefined
        });
    };

    const getDefaultOperator = (type: FilterType): FilterOperator => {
        switch (type) {
            case 'text':
                return 'contains';
            case 'number':
                return 'equals';
            case 'date':
                return 'equals';
            case 'boolean':
                return 'equals';
            default:
                return 'equals';
        }
    };

    const getOperatorOptions = (type: FilterType) => {
        switch (type) {
            case 'text':
                return [
                    { value: 'contains', label: 'Zawiera' },
                    { value: 'notContains', label: 'Nie zawiera' },
                    { value: 'equals', label: 'Równa się' },
                    { value: 'notEquals', label: 'Nie równa się' },
                    { value: 'startsWith', label: 'Zaczyna się od' },
                    { value: 'endsWith', label: 'Kończy się na' }
                ];
            case 'number':
                return [
                    { value: 'equals', label: 'Równa się' },
                    { value: 'notEquals', label: 'Nie równa się' },
                    { value: 'greaterThan', label: 'Większe niż' },
                    { value: 'lessThan', label: 'Mniejsze niż' },
                    { value: 'greaterThanOrEqual', label: 'Większe lub równe' },
                    { value: 'lessThanOrEqual', label: 'Mniejsze lub równe' },
                    { value: 'between', label: 'Między' }
                ];
            case 'date':
                return [
                    { value: 'equals', label: 'Równa się' },
                    { value: 'notEquals', label: 'Nie równa się' },
                    { value: 'before', label: 'Przed' },
                    { value: 'after', label: 'Po' },
                    { value: 'between', label: 'Między' }
                ];
            case 'boolean':
                return [
                    { value: 'equals', label: 'Równa się' }
                ];
            default:
                return [];
        }
    };

    const renderValueInput = () => {
        if (isUserField) {
            return (
                <FormControl fullWidth size="small">
                    <InputLabel>Użytkownik</InputLabel>
                    <Select
                        value={condition.value}
                        label="Użytkownik"
                        onChange={(e) => onChange({ value: e.target.value })}
                        disabled={loadingUsers}
                    >
                        {loadingUsers ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} />
                            </MenuItem>
                        ) : (
                            users.map((user) => (
                                <MenuItem key={user.userId} value={user.userName}>
                                    {user.userName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            );
        }

        switch (condition.columnType) {
            case 'boolean':
                return (
                    <FormControl fullWidth size="small">
                        <InputLabel>Wartość</InputLabel>
                        <Select
                            value={condition.value}
                            label="Wartość"
                            onChange={(e) => onChange({ value: e.target.value })}
                        >
                            <MenuItem value="true">Tak</MenuItem>
                            <MenuItem value="false">Nie</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 'date':
                return (
                    <TextField
                        fullWidth
                        label="Wartość"
                        type="date"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                    />
                );
            case 'number':
                return (
                    <TextField
                        fullWidth
                        label="Wartość"
                        type="number"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                    />
                );
            default:
                return (
                    <TextField
                        fullWidth
                        label="Wartość"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                    />
                );
        }
    };

    const renderSecondValueInput = () => {
        if (condition.operator !== 'between') return null;

        switch (condition.columnType) {
            case 'date':
                return (
                    <TextField
                        fullWidth
                        label="Do"
                        type="date"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />
                );
            case 'number':
                return (
                    <TextField
                        fullWidth
                        label="Do"
                        type="number"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        size="small"
                    />
                );
            default:
                return (
                    <TextField
                        fullWidth
                        label="Do"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        size="small"
                    />
                );
        }
    };

    const isConditionValid = () => {
        if (!condition.columnName) return false;
        if (condition.value === undefined || condition.value === '') return false;
        if (condition.operator === 'between' && (condition.value2 === undefined || condition.value2 === '')) {
            return false;
        }
        return true;
    };

    return (
        <Paper
            sx={{
                p: 2,
                mb: 1,
                border: isConditionValid() ? '1px solid #e0e0e0' : '2px solid #f44336',
                bgcolor: isConditionValid() ? 'background.paper' : 'error.light',
                opacity: isConditionValid() ? 1 : 0.9
            }}
            variant="outlined"
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Pierwsza linia: Pole, Operator, Wartość */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <FormControl sx={{ minWidth: 200 }} size="small">
                            <InputLabel>Pole</InputLabel>
                            <Select
                                value={condition.columnName}
                                label="Pole"
                                onChange={(e) => handleColumnChange(e.target.value)}
                            >
                                {availableColumns.map((column) => (
                                    <MenuItem key={column.name} value={column.name}>
                                        {column.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {condition.columnName && (
                            <FormControl sx={{ minWidth: 180 }} size="small">
                                <InputLabel>Operator</InputLabel>
                                <Select
                                    value={condition.operator}
                                    label="Operator"
                                    onChange={(e) => handleOperatorChange(e.target.value as FilterOperator)}
                                >
                                    {getOperatorOptions(condition.columnType).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {condition.columnName && condition.operator && (
                            <Box sx={{ minWidth: 200 }}>
                                {renderValueInput()}
                            </Box>
                        )}

                        {canRemove && (
                            <Tooltip title="Usuń warunek">
                                <IconButton
                                    onClick={onRemove}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    {/* Druga linia: Druga wartość dla operatora "między" */}
                    {condition.operator === 'between' && (
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ minWidth: 200 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Druga wartość:
                                </Typography>
                            </Box>
                            <Box sx={{ minWidth: 180 }} />
                            <Box sx={{ minWidth: 200 }}>
                                {renderSecondValueInput()}
                            </Box>
                            <Box sx={{ width: 40 }} /> {/* Spacer dla przycisku */}
                        </Box>
                    )}

                    {/* Ostrzeżenie o nieprawidłowym warunku */}
                    {!isConditionValid() && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                            <WarningIcon fontSize="small" />
                            <Typography variant="body2">
                                Ten warunek jest niekompletny. Wypełnij wszystkie wymagane pola.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}
