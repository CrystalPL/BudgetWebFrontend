import Container from "@mui/material/Container";
import BillDashboardHeader from "./BillDashboardHeader";
import React, {useState} from "react";
import BillTab from "./tabs/BillTab";

export default function BillDashboard() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '95%',
                lg: '95%',
                xl: '95%',
            },
        }}>
            <BillDashboardHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <BillTab/>
        </Container>
    );
}