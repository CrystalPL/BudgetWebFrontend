import {Box, DialogContent} from "@mui/material";
import React, {useState} from "react";
import {UserDebt} from "../../CostSharingModel";
import CostSharingSummaryAndSettlementsSection from "../CostSharingSummaryAndSettlementsSection";
import CostSharingProductDetails from "../products-section/CostSharingProductDetails";
import {ReceiptItem, UserWhoPaid} from "../../../api/ReceiptModel";

interface CostSharingMainContentProps {
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
        <DialogContent sx={{
            p: 2,
            maxHeight: '100%',
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            gap: 2
        }}
        >
            <Box maxHeight='100%' maxWidth={{xs: '100%', md: '40%'}} display='flex' flexDirection='column' flex={1}>
                <CostSharingSummaryAndSettlementsSection
                    userDebts={userDebts}
                    productList={props.productList}
                    whoPaid={props.whoPaid}
                    selectedUserId={selectedUserId}
                    toggleCardExpansion={toggleCardExpansion}
                />
            </Box>
            <Box maxHeight='100%' maxWidth={{xs: '100%', md: '60%'}} display='flex' flexDirection='column' flex={1}>
                <CostSharingProductDetails userDebts={userDebts} selectedUserId={selectedUserId}/>
            </Box>
        </DialogContent>
    )
}

function calculateCostSharing(whoPaid: UserWhoPaid, productList: ReceiptItem[], householdUsers: UserWhoPaid[]): UserDebt[] {
    const userDebts = new Map<number, UserDebt>();

    householdUsers.forEach(user => {
        if (user.userId !== whoPaid.userId) {
            userDebts.set(user.userId, {
                user,
                totalDebt: 0,
                items: []
            });
        }
    });

    productList.forEach(item => {
        if (item.userToReturnMoney && item.moneyDividing && typeof item.moneyDividing === 'number') {
            const userDebt = userDebts.get(item.userToReturnMoney.userId);
            if (userDebt) {
                userDebt.totalDebt = (userDebt.totalDebt || 0) + item.moneyDividing;
                userDebt.items.push(item);
            }
        }
    });

    return Array.from(userDebts.values()).filter(debt => debt.totalDebt > 0);
}