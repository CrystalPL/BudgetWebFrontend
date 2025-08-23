import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import {FilterConfig, FilterOperator, FilterType} from '../types/FilterTypes';
import {UserWhoPaid} from '../api/ReceiptModel';
import {getCreateReceiptDetails} from '../api/ReceiptService';

interface FilterDialogProps {
    open: boolean;
    onClose: () => void;
    columnType: FilterType;
    columnName: string;
    onApplyFilter: (config: FilterConfig) => void;
    currentFilter?: FilterConfig;
    anchorEl: HTMLElement | null;
    fieldOptions?: {
        isUserField?: boolean;
    };
}

export default function FilterDialog({
                                         open,
                                         onClose,
                                         columnType,
                                         columnName,
                                         onApplyFilter,
                                         currentFilter,
                                         anchorEl,
                                         fieldOptions = {}
                                     }: FilterDialogProps) {
    const [operator, setOperator] = useState<FilterOperator>(
        currentFilter?.operator ||
        (columnType === 'text' ? 'contains' :
            columnType === 'number' ? 'equals' :
                columnType === 'date' ? 'equals' :
                    'equals')
    );

    const [value, setValue] = useState<string | number | boolean>(currentFilter?.value || '');
    const [value2, setValue2] = useState<string | number | boolean>(currentFilter?.value2 || '');
    const [active, setActive] = useState<boolean>(currentFilter?.active || false);

    // Lista użytkowników dla pola "Kto zapłacił"
    const [users, setUsers] = useState<UserWhoPaid[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

    // Pobieranie listy użytkowników, jeśli pole jest polem użytkownika
    useEffect(() => {
        if (open && fieldOptions?.isUserField) {
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
    }, [open, fieldOptions?.isUserField]);

    // Aktualizuj stany przy zmianie currentFilter lub otwarciu popovera
    useEffect(() => {
        if (open && currentFilter) {
            setOperator(currentFilter.operator);
            setValue(currentFilter.value);
            setValue2(currentFilter.value2 || '');
            setActive(currentFilter.active);
        }
    }, [currentFilter, open]);

    const handleApply = () => {
        const config: FilterConfig = {
            columnName,
            columnType,
            operator,
            value,
            value2: operator === 'between' ? value2 : undefined,
            active
        };
        onApplyFilter(config);
        onClose();
    };

    const handleClear = () => {
        onApplyFilter({
            columnName,
            columnType,
            operator: operator,
            value: '',
            active: false
        });
        onClose();
    };

    const handleOperatorChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const newOperator = e.target.value as FilterOperator;
        console.log("Zmiana operatora:", newOperator);
        setOperator(newOperator);
    };

    // Przygotuj odpowiednie opcje dla operatorów w zależności od typu kolumny
    const getOperatorMenuItems = () => {
        if (columnType === 'text') {
            return [
                <MenuItem key="contains" value="contains">Zawiera</MenuItem>,
                <MenuItem key="notContains" value="notContains">Nie zawiera</MenuItem>,
                <MenuItem key="equals" value="equals">Równa się</MenuItem>,
                <MenuItem key="notEquals" value="notEquals">Nie równa się</MenuItem>,
                <MenuItem key="startsWith" value="startsWith">Zaczyna się od</MenuItem>,
                <MenuItem key="endsWith" value="endsWith">Kończy się na</MenuItem>
            ];
        } else if (columnType === 'number') {
            return [
                <MenuItem key="equals" value="equals">Równa się</MenuItem>,
                <MenuItem key="notEquals" value="notEquals">Nie równa się</MenuItem>,
                <MenuItem key="greaterThan" value="greaterThan">Większe niż</MenuItem>,
                <MenuItem key="lessThan" value="lessThan">Mniejsze niż</MenuItem>,
                <MenuItem key="greaterThanOrEqual" value="greaterThanOrEqual">Większe lub równe</MenuItem>,
                <MenuItem key="lessThanOrEqual" value="lessThanOrEqual">Mniejsze lub równe</MenuItem>,
                <MenuItem key="between" value="between">Pomiędzy</MenuItem>
            ];
        } else if (columnType === 'date') {
            return [
                <MenuItem key="equals" value="equals">Równa się</MenuItem>,
                <MenuItem key="notEquals" value="notEquals">Nie równa się</MenuItem>,
                <MenuItem key="before" value="before">Przed</MenuItem>,
                <MenuItem key="after" value="after">Po</MenuItem>,
                <MenuItem key="between" value="between">Pomiędzy</MenuItem>
            ];
        } else if (columnType === 'boolean') {
            return [
                <MenuItem key="equals" value="equals">Równa się</MenuItem>
            ];
        }
        return [];
    };

    // Renderuj odpowiedni input dla wartości w zależności od typu kolumny i opcji pola
    const renderValueInput = () => {
        if (fieldOptions?.isUserField) {
            return (
                <FormControl fullWidth size="small" sx={{mt: 1}}>
                    <InputLabel>Użytkownik</InputLabel>
                    <Select
                        value={value}
                        label="Użytkownik"
                        onChange={(e) => setValue(e.target.value)}
                        size="small"
                        disabled={loadingUsers}
                    >
                        {loadingUsers ? (
                            <MenuItem disabled><CircularProgress size={20}/></MenuItem>
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
        } else if (columnType === 'boolean') {
            return (
                <FormControl fullWidth size="small" sx={{mt: 1}}>
                    <InputLabel>Wartość</InputLabel>
                    <Select
                        value={value}
                        label="Wartość"
                        onChange={(e) => setValue(e.target.value)}
                        size="small"
                    >
                        <MenuItem value="true">Tak</MenuItem>
                        <MenuItem value="false">Nie</MenuItem>
                    </Select>
                </FormControl>
            );
        } else if (columnType === 'date') {
            return (
                <TextField
                    fullWidth
                    label="Wartość"
                    type="date"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    InputLabelProps={{shrink: true}}
                    size="small"
                    sx={{mt: 1}}
                />
            );
        } else if (columnType === 'number') {
            return (
                <TextField
                    fullWidth
                    label="Wartość"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    sx={{mt: 1}}
                />
            );
        } else {
            return (
                <TextField
                    fullWidth
                    label="Wartość"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    sx={{mt: 1}}
                />
            );
        }
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Paper sx={{p: 2, width: 300, maxHeight: 400, overflowY: 'auto'}}>
                <Typography variant="subtitle1" sx={{mb: 1, fontWeight: 'bold'}}>
                    Filtrowanie: {columnName}
                </Typography>

                <Box sx={{mt: 2}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                color="primary"
                                size="small"
                            />
                        }
                        label="Filtr aktywny"
                    />

                    <FormControl fullWidth margin="dense" size="small">
                        <InputLabel>Operator</InputLabel>
                        <Select
                            value={operator}
                            label="Operator"
                            onChange={(e) => setOperator(e.target.value as FilterOperator)}
                            size="small"
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                PaperProps: {
                                    style: {
                                        maxHeight: 200
                                    },
                                },
                            }}
                        >
                            {getOperatorMenuItems()}
                        </Select>
                    </FormControl>

                    <Box sx={{mt: 1}}>
                        {renderValueInput()}
                    </Box>

                    {operator === 'between' && (
                        <Box sx={{mt: 1}}>
                            <Typography variant="caption" color="textSecondary">
                                Do:
                            </Typography>
                            {columnType === 'date' ? (
                                <TextField
                                    fullWidth
                                    label="Wartość końcowa"
                                    type="date"
                                    value={value2}
                                    onChange={(e) => setValue2(e.target.value)}
                                    InputLabelProps={{shrink: true}}
                                    size="small"
                                    sx={{mt: 0.5}}
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    label="Wartość końcowa"
                                    type={columnType === 'number' ? 'number' : 'text'}
                                    value={value2}
                                    onChange={(e) => setValue2(e.target.value)}
                                    size="small"
                                    sx={{mt: 0.5}}
                                />
                            )}
                        </Box>
                    )}
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1}}>
                    <Button onClick={handleClear} color="error" size="small">
                        Wyczyść
                    </Button>
                    <Button onClick={onClose} size="small">
                        Anuluj
                    </Button>
                    <Button onClick={handleApply} color="primary" variant="contained" size="small">
                        Zastosuj
                    </Button>
                </Box>
            </Paper>
        </Popover>
    );
}
