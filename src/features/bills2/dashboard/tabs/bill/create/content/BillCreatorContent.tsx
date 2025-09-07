import {DialogContent} from "@mui/material";
import Stack from "@mui/material/Stack";
import {CreateBillDetails} from "../../../../../api/BillModel";
import BillCreatorContentFirstCard from "./components/BillCreatorContentFirstCard";

interface BillCreatorContentProps {
    createBillDetails: CreateBillDetails;
}

export default function BillCreatorContent(props: BillCreatorContentProps) {
    return (
        <DialogContent sx={{
            p: 2,
            mt: 1,
            maxHeight: '100%',
            display: 'flex',
        }}>
            <Stack spacing={3} maxWidth='100%' width='100%'>
                <BillCreatorContentFirstCard {...props} />
                <BillCreatorContentFirstCard {...props} />
            </Stack>
        </DialogContent>
    )
}