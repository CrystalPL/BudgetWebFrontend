import {Avatar, Box, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {UserDebt} from "../../CostSharingModel";

interface CostSharingSettlementsHeader {
    userDebts: UserDebt[]
}

export function CostSharingSettlementsHeader(props: CostSharingSettlementsHeader) {
    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 1.5, mb: 1.5}}>
            <Avatar sx={{bgcolor: "error.main", width: 32, height: 32}}>
                <ArrowForwardIcon sx={{fontSize: 18}}/>
            </Avatar>
            <Box>
                <Typography variant="h6" fontWeight="bold" color="error.main">
                    Rozliczenia
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {props.userDebts.length} {props.userDebts.length === 1 ? "osoba ma" : "osób ma"} coś
                    do
                    oddania
                </Typography>
            </Box>
        </Box>
    );
}