import Container from "@mui/material/Container";
import * as React from "react";
import DashboardHeader from "./components/DashboardHeader";
import InviteUserDialog, {
    GetInviteUserDialogController,
    InviteUserDialogController
} from "./components/InviteUserDialog";
import UserTable from "./components/UserTable";
import InvitedUserTable from "./components/InvitedUserTable";
import {HouseholdInvitedMember, HouseholdMember, HouseholdReloadKeyProps} from "./api/HouseholdModel";

interface HouseholdDashboardData extends HouseholdReloadKeyProps {
    householdMembers: HouseholdMember[],
    householdInviteMembers: HouseholdInvitedMember[]
}

export default function NewHouseholdDashboard(data: HouseholdDashboardData) {
    const inviteUserDialogController: InviteUserDialogController = GetInviteUserDialogController()

    return (
        <Container sx={{
            pt: 5,
            pb: 5,
            maxWidth: {
                xs: '100%',
                md: '90%',
                lg: '80%',
                xl: '88%',
            },
        }}>
            <DashboardHeader openInvitingDialog={inviteUserDialogController.openDialog}></DashboardHeader>

            <UserTable householdMembers={data.householdMembers}></UserTable>
            <InvitedUserTable householdInviteMembers={data.householdInviteMembers}
                              reloadTable={data.reloadTable}></InvitedUserTable>

            <InviteUserDialog reloadTable={data.reloadTable} {...inviteUserDialogController}></InviteUserDialog>
        </Container>
    )
}