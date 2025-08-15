import React, {useState} from 'react';
import {Box} from '@mui/material';
import {Settlement, UserFilter} from '../types';
import {useSettlements} from '../hooks/useSettlements';
import {getInitialLogs, getInitialSettlements, users} from '../utils/mockData';

// Import komponentów
import {PageHeader} from './PageHeader';
import {MainFilters} from './MainFilters';
import {UserAndTypeFilters, UserAndTypeFilters as HistoryUserFilters} from './UserAndTypeFilters';
import {SettlementsList} from './SettlementsList';
import {HistoryFilters} from './HistoryFilters';
import {HistoryList} from './HistoryList';
import {DownloadModal} from './DownloadModal';
import {DetailsModal} from './DetailsModal';

export const SettlementsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedSettlementDetails, setSelectedSettlementDetails] = useState<Settlement | null>(null);
    const [downloadModalOpen, setDownloadModalOpen] = useState(false);
    const [downloadUserFilter, setDownloadUserFilter] = useState<UserFilter>({type: 'all'});

    // Użyj hook do zarządzania stanem
    const {
        // Stan
        settlements,
        searchTerm,
        statusFilter,
        mainUserFilter,
        typeFilter,
        dateFilter,
        historyFilter,
        sortConfig,
        settlementsPage,
        logsPage,

        // Dane przefiltrowane
        filteredSettlements,
        getPaginatedSettlements,
        getPaginatedLogs,
        getFilteredLogs,
        totalSettlementsPages,
        totalLogsPages,

        // Funkcje do zmiany stanu
        setSearchTerm,
        setStatusFilter,
        setMainUserFilter,
        setTypeFilter,
        setDateFilter,
        setHistoryFilter,

        // Akcje
        handleMarkAsSettled,
        handleCancelSettlement,
        setPredefinedPeriod,
        handleSort,
        handleSettlementsPageChange,
        handleLogsPageChange
    } = useSettlements({
        initialSettlements: getInitialSettlements(),
        initialLogs: getInitialLogs()
    });

    // Funkcje obsługi modalów
    const handleShowDetails = (settlement: Settlement) => {
        setSelectedSettlementDetails(settlement);
        setDetailsModalOpen(true);
    };

    const handleDownloadClick = () => {
        setDownloadModalOpen(true);
    };

    // Funkcja do eksportu danych
    const handleExportSettlements = () => {
        const getFilteredForDownload = () => {
            let filtered = settlements.filter(s => s.status === 'settled');

            if (downloadUserFilter.type === 'single' && downloadUserFilter.singleUser) {
                filtered = filtered.filter(s =>
                    s.from === downloadUserFilter.singleUser || s.to === downloadUserFilter.singleUser
                );
            } else if (downloadUserFilter.type === 'between' && downloadUserFilter.userFrom && downloadUserFilter.userTo) {
                filtered = filtered.filter(s =>
                    (s.from === downloadUserFilter.userFrom && s.to === downloadUserFilter.userTo) ||
                    (s.from === downloadUserFilter.userTo && s.to === downloadUserFilter.userFrom)
                );
            }

            return filtered;
        };

        const filtered = getFilteredForDownload();
        const dataStr = JSON.stringify(filtered, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `rozliczenia_${downloadUserFilter.type}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        setDownloadModalOpen(false);
    };

    // Funkcje resetowania filtrów
    const handleClearMainFilters = () => {
        setMainUserFilter({type: 'all'});
        setTypeFilter({type: 'all'});
    };

    const handleClearHistoryUserFilters = () => {
        setMainUserFilter({type: 'all'});
    };

    return (
        <Box sx={{flexGrow: 1, p: 3, backgroundColor: '#ffffff', minHeight: '100vh'}}>
            <PageHeader
                activeTab={activeTab}
                onTabChange={(_, newValue) => setActiveTab(newValue)}
            />

            {/* Zawartość zakładek */}
            {activeTab === 0 && (
                <Box>
                    <MainFilters
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        onSearchChange={setSearchTerm}
                        onStatusFilterChange={setStatusFilter}
                        onDownloadClick={handleDownloadClick}
                    />

                    <UserAndTypeFilters
                        mainUserFilter={mainUserFilter}
                        typeFilter={typeFilter}
                        users={users}
                        filteredCount={filteredSettlements.length}
                        onMainUserFilterChange={setMainUserFilter}
                        onTypeFilterChange={setTypeFilter}
                        onClearFilters={handleClearMainFilters}
                    />

                    <SettlementsList
                        settlements={getPaginatedSettlements()}
                        currentPage={settlementsPage}
                        totalPages={totalSettlementsPages}
                        totalCount={filteredSettlements.length}
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        onPageChange={handleSettlementsPageChange}
                        onShowDetails={handleShowDetails}
                        onMarkAsSettled={handleMarkAsSettled}
                        onCancelSettlement={handleCancelSettlement}
                    />
                </Box>
            )}

            {activeTab === 1 && (
                <Box>
                    <HistoryFilters
                        dateFilter={dateFilter}
                        historyFilter={historyFilter}
                        typeFilter={typeFilter}
                        sortConfig={sortConfig}
                        filteredCount={getFilteredLogs().length}
                        onDateFilterChange={setDateFilter}
                        onHistoryFilterChange={setHistoryFilter}
                        onTypeFilterChange={setTypeFilter}
                        onSort={handleSort}
                        onSetPredefinedPeriod={setPredefinedPeriod}
                    />

                    <HistoryUserFilters
                        mainUserFilter={mainUserFilter}
                        typeFilter={{type: 'all'}} // Nie pokazujemy filtra typu w historii, bo już jest wyżej
                        users={users}
                        filteredCount={getFilteredLogs().length}
                        onMainUserFilterChange={setMainUserFilter}
                        onTypeFilterChange={() => {
                        }} // Pusty handler
                        onClearFilters={handleClearHistoryUserFilters}
                    />

                    <HistoryList
                        logs={getPaginatedLogs()}
                        settlements={settlements}
                        currentPage={logsPage}
                        totalPages={totalLogsPages}
                        totalCount={getFilteredLogs().length}
                        onPageChange={handleLogsPageChange}
                        onShowDetails={handleShowDetails}
                    />
                </Box>
            )}

            {/* Modales */}
            <DownloadModal
                open={downloadModalOpen}
                userFilter={downloadUserFilter}
                users={users}
                settlements={settlements}
                onClose={() => setDownloadModalOpen(false)}
                onUserFilterChange={setDownloadUserFilter}
                onExport={handleExportSettlements}
            />

            <DetailsModal
                open={detailsModalOpen}
                settlement={selectedSettlementDetails}
                onClose={() => setDetailsModalOpen(false)}
            />
        </Box>
    );
};
