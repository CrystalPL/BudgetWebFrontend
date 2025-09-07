import {Box, DialogTitle, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {FaMoneyBill} from "react-icons/fa";

export function BillCreatorHeader() {
    return (
        <DialogTitle sx={{
            background: "#a9be77",
            color: "white",
        }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Box p={1} borderRadius={2} bgcolor="rgba(255,255,255,0.2)" display='flex' alignItems='center'>
                    <FaMoneyBill size='32'/>
                </Box>
                <Typography variant="h4">
                    Tworzenie rachunki/edytowanie rachunki
                </Typography>
            </Stack>
        </DialogTitle>
    );
}
