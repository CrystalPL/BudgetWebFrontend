import {Box, DialogContent} from "@mui/material";
import React, {useState} from "react";
import {ReceiptItem, UserWhoPaid} from "../api/ReceiptModel";
import {calculateCostSharing} from "./CostSharingUtil";
import CostSharingSummaryAndSettlementsSection from "./components/CostSharingSummaryAndSettlementsSection";
import CostSharingProductDetails from "./components/CostSharingProductDetails";

export interface CostSharingMainContentProps {
    productList: ReceiptItem[]
    whoPaid: UserWhoPaid
    householdUsers: UserWhoPaid[]
}

export default function CostSharingMainContent(props: CostSharingMainContentProps) {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const toggleCardExpansion = (userId: number) => {
        setSelectedUserId(prev => prev === userId ? null : userId);
    };

    const userDebts = calculateCostSharing(props.whoPaid, props.productList, props.householdUsers);
    return (
        <DialogContent
            sx={{p: 2, maxHeight: '100%', display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2}}>
            <Box maxHeight='100%' sx={{maxWidth: {xs: '100%', md: '40%'}}} display='flex' flexDirection='column'
                 flex={1}>
                <CostSharingSummaryAndSettlementsSection
                    userDebts={userDebts}
                    productList={props.productList}
                    whoPaid={props.whoPaid}
                    selectedUserId={selectedUserId}
                    toggleCardExpansion={toggleCardExpansion}
                />
            </Box>
            <Box maxHeight='100%' sx={{maxWidth: {xs: '100%', md: '60%'}}} display='flex' flexDirection='column'
                 flex={1}>
                <CostSharingProductDetails userDebts={userDebts} selectedUserId={selectedUserId}/>
            </Box>
        </DialogContent>
    )
}
// sx={{
//     maxHeight: {
//         xs: userDebts.length < 5 ? '100vh' : '100%',
//             md: '100%'
//     }
// }}