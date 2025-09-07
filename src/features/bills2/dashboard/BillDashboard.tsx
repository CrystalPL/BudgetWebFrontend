import Container from "@mui/material/Container";
import BillDashboardHeader from "./BillDashboardHeader";
import React, {useState} from "react";
import BillTab from "./tabs/bill/BillTab";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {StateProp} from "../../../filter/StateProp";

import {Bill} from "../api/BillModel";

interface BillDashboardProps extends HouseholdReloadKeyProps {
    billsProp: StateProp<Bill[]>
}

export default function BillDashboard(props: BillDashboardProps) {
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
            <BillTab {...props}/>
        </Container>
    );
}