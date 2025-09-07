import {Box, Card, CardContent, FormControl, InputLabel, Select, Typography} from "@mui/material";
import {Receipt} from "@mui/icons-material";
import {BillType, CreateBillDetails} from "../../../../../../api/BillModel";
import {StateProp, useStateProp} from "../../../../../../../../filter/StateProp";

interface BillCreatorContentFirstCardProps {
    createBillDetails: CreateBillDetails;
}

export default function BillCreatorContentFirstCard(props: BillCreatorContentFirstCardProps) {
    const stateProp: StateProp<BillType | null> = useStateProp<BillType>();

    return (
        <Card sx={{borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flex: 1}}>
            <CardContent sx={{p: 3}}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Receipt color="primary"/>
                    <Typography variant="h6" fontWeight={600}>
                        Podstawowe informacje
                    </Typography>
                </Box>
            </CardContent>
            <FormControl fullWidth>
                <InputLabel>Typ rachunku</InputLabel>
                <Select>

                </Select>
            </FormControl>
        </Card>
    )
}