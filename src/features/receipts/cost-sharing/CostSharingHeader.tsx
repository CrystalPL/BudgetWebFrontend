import {Box, DialogTitle, Stack, Typography} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export function CostSharingHeader() {
    return (
        <DialogTitle sx={{
            mb: 2,
            pb: 2,
            background: "#a9be77",
            color: "white",
        }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <AccountBalanceWalletIcon sx={{fontSize: 28}}/>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Podział kosztów
                    </Typography>
                    <Typography variant="body2" sx={{opacity: 0.9}}>
                        Sprawdź, kto i ile powinien oddać
                    </Typography>
                </Box>
            </Stack>
        </DialogTitle>
    );
}
