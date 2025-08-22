import React from 'react';
import {Avatar, Box, Card, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {CostSharingSummarySection} from "./CostSharingSummarySection";
import CardContent from "@mui/material/CardContent";
import {CostSharingSettlementsHeader} from "./settlements-section/CostSharingSettlementsHeader";
import CostSharingSettlementsMainSection from "./settlements-section/CostSharingSettlementsMainSection";
import {UserDebt} from '../CostSharingModel';
import {ReceiptItem, UserWhoPaid} from '../../api/ReceiptModel';

interface CostSharingSummaryAndSettlementsSectionProps {
    userDebts: UserDebt[]
    productList: ReceiptItem[]
    whoPaid: UserWhoPaid
    selectedUserId: number | null
    toggleCardExpansion: (userId: number) => void
}

export default function CostSharingSummaryAndSettlementsSection(props: CostSharingSummaryAndSettlementsSectionProps) {
    return (
        <Box flex={[1]} display='flex' flexDirection='column' maxHeight='100%'>
            <CostSharingSummarySection items={props.productList} whoPaid={props.whoPaid}/>
            {GetDebtorsContent(props)}
        </Box>
    )
}

function GetDebtorsContent(props: CostSharingSummaryAndSettlementsSectionProps) {
    if (props.userDebts.length > 0) {
        return <GetDebtors {...props}/>
    }

    return <NoDebtors/>
}

function GetDebtors(props: CostSharingSummaryAndSettlementsSectionProps) {
    return (
        <Card elevation={6}
              sx={{
                  borderRadius: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                  maxHeight: "100%"
              }}>
            <CardContent
                sx={{
                    p: 1.5,
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100%"
                }}>
                <CostSharingSettlementsHeader userDebts={props.userDebts}/>
                <CostSharingSettlementsMainSection userDebts={props.userDebts} whoPaid={props.whoPaid}
                                                   selectedUserId={props.selectedUserId}
                                                   toggleCardExpansion={props.toggleCardExpansion}/>
            </CardContent>
        </Card>
    );
}

function NoDebtors() {
    return (
        <Card elevation={6} sx={{borderRadius: 3, textAlign: "center"}}>
            <CardContent sx={{p: 3}}>
                <Avatar sx={{bgcolor: "success.main", width: 72, height: 72, mx: "auto", mb: 1.5}}>
                    <PersonIcon sx={{fontSize: 36}}/>
                </Avatar>
                <Typography variant="h6" fontWeight="bold" color="success.main" gutterBottom>
                    Świetnie! Brak długów
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Wszystkie koszty zostały pokryte przez osobę, która zapłaciła za paragon.
                </Typography>
            </CardContent>
        </Card>
    );
}
