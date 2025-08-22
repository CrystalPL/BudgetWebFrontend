import {Box, Typography} from "@mui/material";
import React from "react";

import {UserDebt} from "../../CostSharingModel";
import {GetProductListForUser} from "./CostSharingProductDetailsList";

interface CostSharingProductDetailsProps {
    userDebts: UserDebt[]
    selectedUserId: number | null
}

export default function CostSharingProductDetails(props: CostSharingProductDetailsProps) {
    return (
        <Box flex={1} display='flex' flexDirection='column' maxHeight={getMaxHeight(props)}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Szczegóły produktów:
            </Typography>
            <Box border='1px solid' borderColor='grey.200' borderRadius={2} p={1} bgcolor='grey.50' flex={1}
                 display='flex' flexDirection='column' minHeight={0}
            >
                {getProductList(props)}
            </Box>
        </Box>
    )
}

function getMaxHeight(props: CostSharingProductDetailsProps) {
    const userDebt = props.userDebts.find(userDebt => userDebt.user.userId === props.selectedUserId)
    const items = userDebt == undefined ? [] : userDebt.items
    return {
        xs: items.length < 10 ? '100%' : '400px',
        md: '100%'
    }
}

function getProductList(props: CostSharingProductDetailsProps) {
    if (props.selectedUserId === null) {
        return <NoDebtors/>
    }

    return props.userDebts
        .filter(userDebt => userDebt.user.userId === props.selectedUserId)
        .map(userDebt => <GetProductListForUser key={userDebt.user.userId} userDebt={userDebt}/>)
}

function NoDebtors() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1}
             textAlign="center"
        >
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Wybierz rozliczenie
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Kliknij na użytkownika po lewej stronie, aby zobaczyć szczegóły produktów
            </Typography>
        </Box>
    )
}