import React from 'react';
import {Box, Typography} from '@mui/material';
import {FilterList as FilterListIcon} from '@mui/icons-material';
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {AdvancedFilter} from "../api/AdvancedFilterModel";
import {HouseholdReloadKeyProps} from "../../../features/household/api/HouseholdModel";
import FilterInfo from "./AdvancedFilterInfo";
import {StateProp} from "../../StateProp";

interface GetFiltersProps extends HouseholdReloadKeyProps {
    filters: AdvancedFilter[]
    editedFilterProps: StateProp<AdvancedFilter | null>
    creatingFilterController: DialogShowingController
    duplicateFilterController: DialogShowingController
    editConditionsFilterController: DialogShowingController
}

export function GetFilters(props: GetFiltersProps) {
    if (props.filters.length === 0) {
        return <EmptyFilters/>
    }

    return props.filters.map((filter, index) => (
        <FilterInfo key={index}
                    allFilters={props.filters}
                    currentFilter={filter}
                    reloadTable={props.reloadTable}
                    editedFilterProps={props.editedFilterProps}
                    creatingFilterController={props.creatingFilterController}
                    duplicateFilterController={props.duplicateFilterController}
                    editConditionsFilterController={props.editConditionsFilterController}
        />
    ))
}

function EmptyFilters() {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='200px'
             color='text.secondary'>
            <FilterListIcon sx={{fontSize: 48, mb: 2}}/>
            <Typography variant="body1">Brak zapisanych filtrów</Typography>
            <Typography variant="body2">
                Kliknij &quot;Nowy filtr&quot; aby utworzyć pierwszy
            </Typography>
        </Box>
    )
}