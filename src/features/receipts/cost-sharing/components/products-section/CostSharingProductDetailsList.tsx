import {ReceiptItem} from "../../../api/ReceiptModel";
import {Avatar, Box, Chip, Typography} from "@mui/material";
import React from "react";
import {UserDebt} from "../../CostSharingModel";

interface GetProductListForUserProps {
    userDebt: UserDebt
}

interface ProductInListProps {
    item: ReceiptItem
    index: number
}

export function GetProductListForUser(props: GetProductListForUserProps) {
    return (
        <Box flex={1} display="flex" flexDirection="column" minHeight={0}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom mb={0.75}>
                Produkty dla: {props.userDebt.user.userName}
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.75} overflow='auto' flex={1} pr={1}>
                {props.userDebt.items.map((item, index) => <CostSharingProductDetailsList key={index} index={index}
                                                                                          item={item}/>)}
            </Box>
        </Box>
    )
}

function CostSharingProductDetailsList(props: ProductInListProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1} borderRadius={1} bgcolor="white"
             border="1px solid" borderColor="grey.200" flexShrink={0}
             sx={{
                 "&:hover": {
                     bgcolor: "grey.100",
                     borderColor: "primary.200"
                 }
             }}
        >
            <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                    sx={{
                        width: 24,
                        height: 24,
                        bgcolor: "primary.main",
                        fontSize: "0.75rem"
                    }}
                >
                    {props.index + 1}
                </Avatar>
                <Typography variant="body2" fontWeight="medium">
                    {props.item.productName}
                </Typography>
            </Box>
            <Chip
                label={`${props.item.moneyDividing?.toFixed(2)} zł`}
                size="small"
                color="error"
                variant="outlined"
                sx={{height: 20, fontSize: "0.65rem"}}
            />
        </Box>
    );
}