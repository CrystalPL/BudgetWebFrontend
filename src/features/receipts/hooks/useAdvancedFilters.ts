import { useState, useEffect } from 'react';
import {
    SavedFilter,
    FilterGroup,
    FilterCondition,
    FilterBuilderState,
    LogicalOperator,
    ColumnDataType,
    FilterOperator
} from '../types/FilterTypes';

const STORAGE_KEY = 'advancedFilters';

export const useAdvancedFilters = () => {
    const [state, setState] = useState<FilterBuilderState>({
        savedFilters: [],
        activeFilterId: undefined,
        currentFilter: undefined
    });

    // Ładowanie filtrów z localStorage przy inicjalizacji
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Konwertuj daty z string na Date
                const filters = parsed.savedFilters.map((filter: any) => ({
                    ...filter,
                    createdAt: new Date(filter.createdAt),
                    updatedAt: new Date(filter.updatedAt)
                }));
                setState(prev => ({
                    ...prev,
                    savedFilters: filters
                }));
            } catch (error) {
                console.error('Błąd podczas ładowania filtrów:', error);
            }
        }
    }, []);

    // Zapisywanie filtrów do localStorage przy każdej zmianie
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    // Tworzenie nowego filtru
    const createFilter = (name: string, description?: string): SavedFilter => {
        const newFilter: SavedFilter = {
            id: generateId(),
            name,
            description,
            groups: [{
                id: generateId(),
                conditions: [],
                logicalOperator: 'AND'
            }],
            groupLogicalOperator: 'AND',
            active: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        setState(prev => ({
            ...prev,
            savedFilters: [...prev.savedFilters, newFilter],
            currentFilter: newFilter
        }));

        return newFilter;
    };

    // Zapisywanie filtru
    const saveFilter = (filter: SavedFilter) => {
        const updatedFilter = {
            ...filter,
            updatedAt: new Date()
        };

        setState(prev => ({
            ...prev,
            savedFilters: prev.savedFilters.map(f =>
                f.id === filter.id ? updatedFilter : f
            ),
            currentFilter: prev.currentFilter?.id === filter.id ? updatedFilter : prev.currentFilter
        }));
    };

    // Usuwanie filtru
    const deleteFilter = (filterId: string) => {
        setState(prev => ({
            ...prev,
            savedFilters: prev.savedFilters.filter(f => f.id !== filterId),
            activeFilterId: prev.activeFilterId === filterId ? undefined : prev.activeFilterId,
            currentFilter: prev.currentFilter?.id === filterId ? undefined : prev.currentFilter
        }));
    };

    // Aktywowanie/deaktywowanie filtru
    const setActiveFilter = (filterId?: string) => {
        setState(prev => {
            const updatedFilters = prev.savedFilters.map(f => ({
                ...f,
                active: f.id === filterId
            }));

            return {
                ...prev,
                savedFilters: updatedFilters,
                activeFilterId: filterId
            };
        });
    };

    // Ustawianie bieżącego filtru do edycji
    const setCurrentFilter = (filter: SavedFilter | undefined) => {
        setState(prev => ({
            ...prev,
            currentFilter: filter
        }));
    };

    // Dodawanie grupy warunków
    const addGroup = (filter: SavedFilter): SavedFilter => {
        const newGroup: FilterGroup = {
            id: generateId(),
            conditions: [],
            logicalOperator: 'AND',
            logicalOperatorBefore: 'AND' // Domyślny operator przed nową grupą
        };

        return {
            ...filter,
            groups: [...filter.groups, newGroup],
            updatedAt: new Date()
        };
    };

    // Usuwanie grupy warunków
    const removeGroup = (filter: SavedFilter, groupId: string): SavedFilter => {
        return {
            ...filter,
            groups: filter.groups.filter(g => g.id !== groupId),
            updatedAt: new Date()
        };
    };

    // Aktualizacja operatora logicznego grupy
    const updateGroupOperator = (filter: SavedFilter, groupId: string, operator: LogicalOperator): SavedFilter => {
        return {
            ...filter,
            groups: filter.groups.map(g =>
                g.id === groupId ? { ...g, logicalOperator: operator } : g
            ),
            updatedAt: new Date()
        };
    };

    // Dodawanie warunku do grupy
    const addCondition = (filter: SavedFilter, groupId: string): SavedFilter => {
        const newCondition: FilterCondition = {
            id: generateId(),
            columnName: '',
            columnType: 'text',
            operator: 'contains',
            value: '',
            logicalOperatorBefore: 'AND', // Domyślnie AND
            openParenthesis: 0,
            closeParenthesis: 0
        };

        return {
            ...filter,
            groups: filter.groups.map(g =>
                g.id === groupId
                    ? { ...g, conditions: [...g.conditions, newCondition] }
                    : g
            ),
            updatedAt: new Date()
        };
    };

    // Usuwanie warunku z grupy
    const removeCondition = (filter: SavedFilter, groupId: string, conditionId: string): SavedFilter => {
        return {
            ...filter,
            groups: filter.groups.map(g =>
                g.id === groupId
                    ? { ...g, conditions: g.conditions.filter(c => c.id !== conditionId) }
                    : g
            ),
            updatedAt: new Date()
        };
    };

    // Aktualizacja warunku
    const updateCondition = (filter: SavedFilter, groupId: string, conditionId: string, updates: Partial<FilterCondition>): SavedFilter => {
        return {
            ...filter,
            groups: filter.groups.map(g =>
                g.id === groupId
                    ? {
                        ...g,
                        conditions: g.conditions.map(c =>
                            c.id === conditionId ? { ...c, ...updates } : c
                        )
                    }
                    : g
            ),
            updatedAt: new Date()
        };
    };

    // Aktualizacja operatora logicznego między grupami
    const updateGroupLogicalOperator = (filter: SavedFilter, operator: LogicalOperator): SavedFilter => {
        return {
            ...filter,
            groupLogicalOperator: operator,
            updatedAt: new Date()
        };
    };

    // Nowa funkcja - aktualizacja tylko informacji podstawowych filtru
    const updateFilterInfo = (filterId: string, name: string, description?: string) => {
        setState(prev => ({
            ...prev,
            savedFilters: prev.savedFilters.map(f =>
                f.id === filterId ? { ...f, name, description, updatedAt: new Date() } : f
            ),
            currentFilter: prev.currentFilter?.id === filterId
                ? { ...prev.currentFilter, name, description, updatedAt: new Date() }
                : prev.currentFilter
        }));
    };

    // Nowa funkcja - aktualizacja operatora logicznego przed konkretną grupą
    const updateGroupLogicalOperatorBefore = (filter: SavedFilter, groupId: string, operator: LogicalOperator): SavedFilter => {
        return {
            ...filter,
            groups: filter.groups.map(g =>
                g.id === groupId ? { ...g, logicalOperatorBefore: operator } : g
            ),
            updatedAt: new Date()
        };
    };

    // Pobieranie aktywnego filtru
    const getActiveFilter = (): SavedFilter | undefined => {
        return state.savedFilters.find(f => f.active);
    };

    // Duplikowanie filtru
    const duplicateFilter = (filterId: string, newName: string): SavedFilter | undefined => {
        const originalFilter = state.savedFilters.find(f => f.id === filterId);
        if (!originalFilter) return undefined;

        const duplicatedFilter: SavedFilter = {
            ...originalFilter,
            id: generateId(),
            name: newName,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            groups: originalFilter.groups.map(group => ({
                ...group,
                id: generateId(),
                conditions: group.conditions.map(condition => ({
                    ...condition,
                    id: generateId()
                }))
            }))
        };

        setState(prev => ({
            ...prev,
            savedFilters: [...prev.savedFilters, duplicatedFilter]
        }));

        return duplicatedFilter;
    };

    return {
        state,
        createFilter,
        saveFilter,
        deleteFilter,
        setActiveFilter,
        setCurrentFilter,
        addGroup,
        removeGroup,
        updateGroupOperator,
        addCondition,
        removeCondition,
        updateCondition,
        updateGroupLogicalOperator,
        updateGroupLogicalOperatorBefore,
        updateFilterInfo,
        getActiveFilter,
        duplicateFilter
    };
};

// Helper funkcja do generowania unikalnych ID
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
