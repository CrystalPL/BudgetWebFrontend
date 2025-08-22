import {ReceiptItem, UserWhoPaid} from "../../api/ReceiptModel";
import EuroIcon from "@mui/icons-material/Euro";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

interface CostSharingSummarySectionProps {
    items: ReceiptItem[];
    whoPaid: UserWhoPaid;
}

export function CostSharingSummarySection(props: CostSharingSummarySectionProps) {
    return (
        <Card elevation={6} sx={{mb: 3, borderRadius: 3, overflow: "visible"}}>
            <CardContent sx={{p: 2}}>
                <Header/>
                <Grid container spacing={2}>
                    <AmountToReturn items={props.items}/>
                    <WhoPaidForReceipt whoPaid={props.whoPaid}/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function Header() {
    return (
        <Box display='flex' alignItems='center' gap={2} mb={2}>
            <Avatar sx={{bgcolor: "primary.main", width: 48, height: 48}}>
                <ReceiptIcon/>
            </Avatar>
            <Box>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                    Podsumowanie paragonu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Szczegóły zakupów i płatności
                </Typography>
            </Box>
        </Box>
    );
}

function AmountToReturn(props: { items: ReceiptItem[] }) {
    const totalAmount = props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Grid size={{xs: 12, md: 6}}>
            <Box p={1.5} borderRadius={2} bgcolor="success.50" border="1px solid" borderColor="success.200">
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <EuroIcon color="success" sx={{fontSize: 20}}/>
                    <Typography variant="body2" color="success.dark" fontWeight="medium">
                        Całkowita kwota
                    </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                    {totalAmount.toFixed(2)} zł
                </Typography>
            </Box>
        </Grid>
    );
}

function WhoPaidForReceipt(props: { whoPaid: UserWhoPaid }) {
    return <Grid size={{xs: 12, md: 6}}>
        <Box p={1.5} borderRadius={2} bgcolor="info.50" border="1px solid" borderColor="info.200">
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <PersonIcon color="info" sx={{fontSize: 20}}/>
                <Typography variant="body2" color="info.dark" fontWeight="medium">
                    Zapłacił
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{bgcolor: "info.main", width: 28, height: 28, fontSize: 14}}>
                    {props.whoPaid.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" fontWeight="bold" color="info.main">
                    {props.whoPaid.userName}
                </Typography>
            </Box>
        </Box>
    </Grid>;
}
