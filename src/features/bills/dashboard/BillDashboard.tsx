'use client'
import Container from "@mui/material/Container";
import * as React from "react";
import {useState} from "react";
import BillDashboardHeader from "./BillDashboardHeader";
import BillsOverviewTable from "../tables/BillsOverviewTable";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {Bill, CreateBillDetails} from "../api/BillModel";
import CreateBillDialog from "../forms/CreateBillDialog";

interface BillDashboardData extends HouseholdReloadKeyProps {
    bills: Bill[];
}

export default function BillDashboard(props: BillDashboardData) {
    const createBillDialogController: DialogShowingController = GetShowingController()
    const [editedBill, setEditedBill] = useState<Bill | null>(null)
    const [createBillDetails, setCreateBillDetails] = useState<CreateBillDetails | null>(null)

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '90%',
                lg: '80%',
                xl: '88%',
            },
        }}>
            <BillDashboardHeader creatingController={createBillDialogController}/>
            <BillsOverviewTable
                bills={props.bills}
                reloadTable={props.reloadTable}
                editedBill={editedBill}
                setEditedBill={setEditedBill}
                createBillController={createBillDialogController}
            />
            <CreateBillDialog
                creatingController={createBillDialogController}
                editedBill={editedBill}
                setEditedBill={setEditedBill}
                createBillDetails={createBillDetails}
                setCreateBillDetails={setCreateBillDetails}
                reloadTable={props.reloadTable}
            />
        </Container>
    )
}
