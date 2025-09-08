import {UserDebt} from "../../CostSharingModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Avatar, Box, Chip, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CostSharingSettlementsMainSectionProps} from "./CostSharingSettlementsMainSection";

interface CostSharingSettlementProps {
    userDebt: UserDebt,
    mainSectionProps: CostSharingSettlementsMainSectionProps
}

interface AboutDebtorProps {
    userDebt: UserDebt,
    mainSectionProps: CostSharingSettlementsMainSectionProps
}

export function CostSharingSettlement(props: CostSharingSettlementProps) {
    return (
        <Card
            elevation={props.mainSectionProps.selectedUserId === props.userDebt.user.userId ? 3 : 1}
            onClick={() => props.mainSectionProps.toggleCardExpansion(props.userDebt.user.userId)}
            sx={{
                borderRadius: 1.25,
                border: "1px solid",
                borderColor: props.mainSectionProps.selectedUserId === props.userDebt.user.userId ? "error.300" : "error.100",
                transition: "all 0.3s ease",
                cursor: "pointer",
                flexShrink: 0
            }}
        >
            <CardContent sx={{
                p: 1,
                "&:last-child": {pb: 2}
            }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <AboutDebtor userDebt={props.userDebt} mainSectionProps={props.mainSectionProps}/>
                    <DebtValueAndProductCount userDebt={props.userDebt}/>
                </Box>
            </CardContent>
        </Card>
    );
}

function AboutDebtor(props: AboutDebtorProps) {
    return (
        <Box display="flex" alignItems="center" gap={1.25}>
            {/*TODO OGARNAC POBIERANIE REAL AVATAROW*/}
            <Avatar sx={{bgcolor: "error.main", width: 30, height: 30}}>
                <Typography variant="body2" fontWeight="bold">
                    {props.userDebt.user.userName.charAt(0).toUpperCase()}
                </Typography>
            </Avatar>
            <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                    {props.userDebt.user.userName}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" color="text.secondary">
                        ma oddać
                    </Typography>
                    <ArrowForwardIcon sx={{fontSize: 11}} color="action"/>
                    <Chip
                        label={props.mainSectionProps.whoPaid.userName}
                        size="small"
                        color="info"
                        variant="outlined"
                        sx={{height: 16, fontSize: "0.6rem"}}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function DebtValueAndProductCount(props: { userDebt: UserDebt }) {
    return (
        <Box textAlign="right">
            <Typography variant="subtitle1" fontWeight="bold" color="error.main">
                {props.userDebt.totalDebt.toFixed(2)} zł
            </Typography>
            <Chip
                label={`${props.userDebt.items.length} ${props.userDebt.items.length === 1 ? "produkt" : "produktów"}`}
                size="small"
                color="warning"
                variant="filled"
                sx={{height: 16, fontSize: "0.6rem"}}
            />
        </Box>
    );
}
