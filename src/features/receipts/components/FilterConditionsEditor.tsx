import React, { useState } from 'react';
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Chip,
    Divider,
    Tooltip,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import {
    SavedFilter,
    FilterCondition,
    LogicalOperator,
    FilterType
} from '../types/FilterTypes';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import ConditionBuilder from './ConditionBuilder';
import AddConditionButton from './AddConditionButton';

interface FilterConditionsEditorProps {
    filter: SavedFilter;
    onSave: (filter: SavedFilter) => void;
    onCancel: () => void;
    availableColumns: Array<{
        name: string;
        type: FilterType;
        label: string;
        fieldOptions?: {
            isUserField?: boolean;
        };
    }>;
}

export default function FilterConditionsEditor({
    filter,
    onSave,
    onCancel,
    availableColumns
}: FilterConditionsEditorProps) {
    const {
        addGroup,
        removeGroup,
        updateGroupOperator,
        addCondition,
        removeCondition,
        updateCondition,
        updateGroupLogicalOperator,
        updateGroupLogicalOperatorBefore
    } = useAdvancedFilters();

    const [currentFilter, setCurrentFilter] = useState<SavedFilter>(filter);

    const handleSave = () => {
        onSave(currentFilter);
    };

    const handleAddGroup = () => {
        const updatedFilter = addGroup(currentFilter);
        setCurrentFilter(updatedFilter);
    };

    const handleRemoveGroup = (groupId: string) => {
        const updatedFilter = removeGroup(currentFilter, groupId);
        setCurrentFilter(updatedFilter);
    };

    const handleUpdateGroupOperator = (groupId: string, operator: LogicalOperator) => {
        const updatedFilter = updateGroupOperator(currentFilter, groupId, operator);
        setCurrentFilter(updatedFilter);
    };

    const handleAddCondition = (groupId: string) => {
        const updatedFilter = addCondition(currentFilter, groupId);
        setCurrentFilter(updatedFilter);
    };

    const handleRemoveCondition = (groupId: string, conditionId: string) => {
        const updatedFilter = removeCondition(currentFilter, groupId, conditionId);
        setCurrentFilter(updatedFilter);
    };

    const handleUpdateCondition = (groupId: string, conditionId: string, updates: Partial<FilterCondition>) => {
        const updatedFilter = updateCondition(currentFilter, groupId, conditionId, updates);
        setCurrentFilter(updatedFilter);
    };

    const handleUpdateGroupLogicalOperator = (operator: LogicalOperator) => {
        const updatedFilter = updateGroupLogicalOperator(currentFilter, operator);
        setCurrentFilter(updatedFilter);
    };

    const handleUpdateGroupLogicalOperatorBefore = (groupId: string, operator: LogicalOperator) => {
        const updatedFilter = updateGroupLogicalOperatorBefore(currentFilter, groupId, operator);
        setCurrentFilter(updatedFilter);
    };

    const isFilterValid = () => {
        if (currentFilter.groups.length === 0) return false;

        return currentFilter.groups.every(group =>
            group.conditions.length > 0 &&
            group.conditions.every(condition =>
                condition.columnName &&
                condition.value !== undefined &&
                condition.value !== ''
            )
        );
    };

    const getTotalConditions = () => {
        return currentFilter.groups.reduce((sum, group) => sum + group.conditions.length, 0);
    };

    const generateFilterLogicPreview = (filter: SavedFilter): string => {
        if (filter.groups.length === 0) return 'Brak warunków';

        const groupPreviews = filter.groups.map((group, groupIndex) => {
            const conditionPreviews = group.conditions.map((condition, conditionIndex) => {
                const openParenthesis = '('.repeat(condition.openParenthesis || 0);
                const closeParenthesis = ')'.repeat(condition.closeParenthesis || 0);

                const column = condition.columnName || '[pole]';
                const operator = getOperatorSymbol(condition.operator);
                const value = condition.value || '[wartość]';
                const value2 = condition.value2 ? ` i ${condition.value2}` : '';

                const conditionText = `${openParenthesis}${column} ${operator} ${value}${value2}${closeParenthesis}`;

                if (conditionIndex === 0) return conditionText;

                const logicalOp = condition.logicalOperatorBefore || 'AND';
                return ` ${logicalOp} ${conditionText}`;
            }).join('');

            const groupText = conditionPreviews;

            if (groupIndex === 0) return groupText;

            const groupOperator = group.logicalOperatorBefore || 'AND';
            return ` ${groupOperator} (${groupText})`;
        }).join('');

        return groupPreviews;
    };

    const getOperatorSymbol = (operator: string): string => {
        const symbols: Record<string, string> = {
            'contains': 'zawiera',
            'notContains': 'nie zawiera',
            'equals': '=',
            'notEquals': '≠',
            'startsWith': 'zaczyna się od',
            'endsWith': 'kończy się na',
            'greaterThan': '>',
            'lessThan': '<',
            'greaterThanOrEqual': '≥',
            'lessThanOrEqual': '≤',
            'between': 'między',
            'before': 'przed',
            'after': 'po'
        };
        return symbols[operator] || operator;
    };

    return (
        <>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SettingsIcon />
                        <Typography variant="h6">Edytuj warunki filtru</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            label={`${currentFilter.groups.length} grup`}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            label={`${getTotalConditions()} warunków`}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ minHeight: 600, maxHeight: '80vh', overflow: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Informacje o filtrze */}
                    <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }} variant="outlined">
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Edytujesz warunki dla filtru: "{filter.name}"
                        </Typography>
                        {filter.description && (
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {filter.description}
                            </Typography>
                        )}
                    </Paper>

                    {/* Operator logiczny między grupami - tylko gdy jest więcej grup */}
                    {currentFilter.groups.length > 1 && (
                        <Paper sx={{ p: 2 }} variant="outlined">
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Połączenie grup warunków
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel>Operator między grupami</InputLabel>
                                <Select
                                    value={currentFilter.groupLogicalOperator}
                                    label="Operator między grupami"
                                    onChange={(e) => handleUpdateGroupLogicalOperator(e.target.value as LogicalOperator)}
                                >
                                    <MenuItem value="AND">I (AND) - wszystkie grupy muszą być spełnione</MenuItem>
                                    <MenuItem value="OR">LUB (OR) - przynajmniej jedna grupa musi być spełniona</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    )}

                    {/* Grupy warunków */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Grupy warunków
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddGroup}
                                size="small"
                            >
                                Dodaj grupę
                            </Button>
                        </Box>

                        {currentFilter.groups.length === 0 && (
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Dodaj przynajmniej jedną grupę warunków aby filtr mógł działać.
                            </Alert>
                        )}

                        {currentFilter.groups.map((group, groupIndex) => (
                            <Box key={group.id} sx={{ mb: 3 }}>
                                {/* Operator przed grupą (dla drugiej i kolejnych grup) */}
                                {groupIndex > 0 && (
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2
                                    }}>
                                        <Paper sx={{ p: 1, border: '1px solid #e0e0e0' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Operator przed grupą:
                                                </Typography>
                                                <FormControl size="small" sx={{ minWidth: 100 }}>
                                                    <Select
                                                        value={group.logicalOperatorBefore || 'AND'}
                                                        onChange={(e) => handleUpdateGroupLogicalOperatorBefore(group.id, e.target.value as LogicalOperator)}
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.875rem' }}
                                                    >
                                                        <MenuItem value="AND">I (AND)</MenuItem>
                                                        <MenuItem value="OR">LUB (OR)</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Paper>
                                    </Box>
                                )}

                                <Paper sx={{ p: 2, border: '2px dashed #e0e0e0' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                            Grupa {groupIndex + 1} ({group.conditions.length} warunków)
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <AddConditionButton
                                                onAddCondition={() => handleAddCondition(group.id)}
                                                onChangeOperator={(operator) => handleUpdateGroupOperator(group.id, operator)}
                                                currentOperator={group.logicalOperator}
                                                disabled={false}
                                            />
                                            {currentFilter.groups.length > 1 && (
                                                <Tooltip title="Usuń grupę">
                                                    <IconButton
                                                        onClick={() => handleRemoveGroup(group.id)}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Operator logiczny w grupie */}
                                    {group.conditions.length > 1 && (
                                        <Box sx={{ mb: 2 }}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Operator w grupie</InputLabel>
                                                <Select
                                                    value={group.logicalOperator}
                                                    label="Operator w grupie"
                                                    onChange={(e) => handleUpdateGroupOperator(group.id, e.target.value as LogicalOperator)}
                                                >
                                                    <MenuItem value="AND">I (AND) - wszystkie warunki</MenuItem>
                                                    <MenuItem value="OR">LUB (OR) - przynajmniej jeden warunek</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    )}

                                    {/* Warunki w grupie */}
                                    {group.conditions.length === 0 && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            Ta grupa nie ma żadnych warunków. Dodaj przynajmniej jeden warunek.
                                        </Alert>
                                    )}

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        {group.conditions.map((condition, conditionIndex) => (
                                            <ConditionBuilder
                                                key={condition.id}
                                                condition={condition}
                                                availableColumns={availableColumns}
                                                onChange={(updates) => handleUpdateCondition(group.id, condition.id, updates)}
                                                onRemove={() => handleRemoveCondition(group.id, condition.id)}
                                                canRemove={group.conditions.length > 1 || currentFilter.groups.length > 1}
                                                isFirstCondition={conditionIndex === 0}
                                            />
                                        ))}
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Box>

                    {/* Podgląd logiki filtru */}
                    {currentFilter.groups.length > 0 && (
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }} variant="outlined">
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Podgląd logiki filtru:
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {generateFilterLogicPreview(currentFilter)}
                            </Typography>
                        </Paper>
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel} startIcon={<CancelIcon />}>
                    Anuluj
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!isFilterValid()}
                    startIcon={<SaveIcon />}
                >
                    Zapisz warunki
                </Button>
            </DialogActions>
        </>
    );
}
