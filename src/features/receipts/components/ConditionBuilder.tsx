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
    Tooltip,
    Button,
    ButtonGroup
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import {
    FilterCondition,
    FilterType,
    FilterOperator,
    LogicalOperator
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
    showOperatorBefore?: boolean;
    isFirstCondition?: boolean;
}

export default function ConditionBuilder({
    condition,
    availableColumns,
    onChange,
    onRemove,
    canRemove,
    showOperatorBefore = false,
    isFirstCondition = false
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
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
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
                    <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
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
                        label="Wartość"
                        type="date"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
                    />
                );
            case 'number':
                return (
                    <TextField
                        label="Wartość"
                        type="number"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
                    />
                );
            default:
                return (
                    <TextField
                        label="Wartość"
                        value={condition.value}
                        onChange={(e) => onChange({ value: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
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
                        label="Do"
                        type="date"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
                    />
                );
            case 'number':
                return (
                    <TextField
                        label="Do"
                        type="number"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
                    />
                );
            default:
                return (
                    <TextField
                        label="Do"
                        value={condition.value2 || ''}
                        onChange={(e) => onChange({ value2: e.target.value })}
                        size="small"
                        sx={{ minWidth: 150 }}
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

    const addParenthesis = (type: 'open' | 'close') => {
        if (type === 'open') {
            onChange({
                openParenthesis: (condition.openParenthesis || 0) + 1
            });
        } else {
            onChange({
                closeParenthesis: (condition.closeParenthesis || 0) + 1
            });
        }
    };

    const removeParenthesis = (type: 'open' | 'close') => {
        if (type === 'open') {
            const current = condition.openParenthesis || 0;
            onChange({
                openParenthesis: Math.max(0, current - 1)
            });
        } else {
            const current = condition.closeParenthesis || 0;
            onChange({
                closeParenthesis: Math.max(0, current - 1)
            });
        }
    };

    return (
        <Paper
            sx={{
                p: 1.5,
                mb: 1,
                border: isConditionValid() ? '1px solid #e0e0e0' : '2px solid #f44336',
                bgcolor: isConditionValid() ? 'background.paper' : 'error.light',
                opacity: isConditionValid() ? 1 : 0.9
            }}
            variant="outlined"
        >
            {/* Operator logiczny i nawiasy przed warunkiem */}
            {!isFirstCondition && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    {/* Wybór operatora logicznego */}
                    <ButtonGroup size="small">
                        <Button
                            variant={condition.logicalOperatorBefore === 'AND' ? 'contained' : 'outlined'}
                            color={condition.logicalOperatorBefore === 'AND' ? 'success' : 'inherit'}
                            onClick={() => onChange({ logicalOperatorBefore: 'AND' })}
                            sx={{ fontSize: '0.75rem', minWidth: '40px' }}
                        >
                            I
                        </Button>
                        <Button
                            variant={condition.logicalOperatorBefore === 'OR' ? 'contained' : 'outlined'}
                            color={condition.logicalOperatorBefore === 'OR' ? 'warning' : 'inherit'}
                            onClick={() => onChange({ logicalOperatorBefore: 'OR' })}
                            sx={{ fontSize: '0.75rem', minWidth: '40px' }}
                        >
                            LUB
                        </Button>
                    </ButtonGroup>

                    {/* Nawiasy otwierające */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            Nawiasy:
                        </Typography>
                        <Button size="small" onClick={() => addParenthesis('open')} sx={{ minWidth: '30px', fontSize: '0.75rem' }}>
                            +(
                        </Button>
                        {(condition.openParenthesis || 0) > 0 && (
                            <>
                                <Typography variant="body2" sx={{ mx: 0.5 }}>
                                    {'('.repeat(condition.openParenthesis || 0)}
                                </Typography>
                                <Button size="small" onClick={() => removeParenthesis('open')} sx={{ minWidth: '30px', fontSize: '0.75rem' }}>
                                    -(
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            )}

            {/* Główny warunek */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                {/* Pole */}
                <FormControl size="small" sx={{ minWidth: 150 }}>
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

                {/* Operator */}
                {condition.columnName && (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
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

                {/* Wartość */}
                {condition.columnName && condition.operator && (
                    <>{renderValueInput()}</>
                )}

                {/* Druga wartość dla "między" */}
                {condition.operator === 'between' && (
                    <>{renderSecondValueInput()}</>
                )}

                {/* Nawiasy zamykające */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Button size="small" onClick={() => addParenthesis('close')} sx={{ minWidth: '30px', fontSize: '0.75rem' }}>
                        +)
                    </Button>
                    {(condition.closeParenthesis || 0) > 0 && (
                        <>
                            <Typography variant="body2" sx={{ mx: 0.5 }}>
                                {')'.repeat(condition.closeParenthesis || 0)}
                            </Typography>
                            <Button size="small" onClick={() => removeParenthesis('close')} sx={{ minWidth: '30px', fontSize: '0.75rem' }}>
                                -)
                            </Button>
                        </>
                    )}
                </Box>

                {/* Przycisk usuwania */}
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

            {/* Ostrzeżenie o nieprawidłowym warunku */}
            {!isConditionValid() && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main', mt: 1 }}>
                    <WarningIcon fontSize="small" />
                    <Typography variant="caption">
                        Ten warunek jest niekompletny. Wypełnij wszystkie wymagane pola.
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
