import React from 'react';
import {Box, Typography} from '@mui/material';
import {UserWhoPaid} from "../../../api/ReceiptModel";
import {UserDebt} from "../../CostSharingModel";
import {CostSharingSettlement} from "./CostSharingSettlement";

export interface CostSharingSettlementsMainSectionProps {
    userDebts: UserDebt[]
    whoPaid: UserWhoPaid
    selectedUserId: number | null
    toggleCardExpansion: (userId: number) => void
}

export default function CostSharingSettlementsMainSection(props: CostSharingSettlementsMainSectionProps) {
    return (<>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.primary">
            Wybierz rozliczenie:
        </Typography>
        <Box display="flex" flexDirection="column" gap={0.75} overflow="auto" flex={1} pr={1} minHeight={0}
             maxHeight={getMaxHeight(props)}
        >
            {props.userDebts.map((userDebt) => (
                <CostSharingSettlement key={userDebt.user.userId} userDebt={userDebt} mainSectionProps={props}/>
            ))}
        </Box>
    </>);
}

function getMaxHeight(props: CostSharingSettlementsMainSectionProps) {
    return {
        xs: props.userDebts.length < 4 ? '400px' : '400px',
        md: '100%'
    }
}