import Container from "@mui/material/Container";
import * as React from "react";
import DashboardHeader from "./components/DashboardHeader";
import InviteUserDialog from "./components/dialogs/InviteUserDialog";
import UserTable from "./components/tables/UserTable";
import InvitedUserTable from "./components/tables/InvitedUserTable";
import {HouseholdInvitedMember, HouseholdMember, HouseholdReloadKeyProps} from "./api/HouseholdModel";
import {DialogShowingController, GetShowingController} from "../../controllers/DialogShowingController";
import ChangeHouseholdNameDialog from "./components/dialogs/ChangeHouseholdNameDialog";
import {deleteHouseholdRequest, leaveHousehold} from "./api/HouseholdService";
import ConfirmationDialog from "./components/base/ConfirmationDialog";

interface HouseholdDashboardData extends HouseholdReloadKeyProps {
    householdMembers: HouseholdMember[],
    householdInviteMembers: HouseholdInvitedMember[]
}

export default function HouseholdDashboard(data: HouseholdDashboardData) {
    const inviteUserDialogController: DialogShowingController = GetShowingController()
    const changeHouseholdNameDialogController = GetShowingController()
    const deleteHouseholdDialogController = GetShowingController()
    const leaveHouseholdDialogController = GetShowingController()

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
            <DashboardHeader openLeaveHouseholdDialog={leaveHouseholdDialogController.openDialog}
                             openDeleteHouseholdDialog={deleteHouseholdDialogController.openDialog}
                             openInvitingDialog={inviteUserDialogController.openDialog}
                             openHouseholdChangeNameDialog={changeHouseholdNameDialogController.openDialog}></DashboardHeader>

            <UserTable reloadTable={data.reloadTable} householdMembers={data.householdMembers}></UserTable>

            <InvitedUserTable householdInviteMembers={data.householdInviteMembers}
                              reloadTable={data.reloadTable}></InvitedUserTable>

            <InviteUserDialog reloadTable={data.reloadTable} {...inviteUserDialogController}></InviteUserDialog>
            <ChangeHouseholdNameDialog {...changeHouseholdNameDialogController}></ChangeHouseholdNameDialog>

            {/*Dialog do opuszczania gospodarstwa*/}
            <ConfirmationDialog
                open={leaveHouseholdDialogController.openDialogStatus}
                closeDialog={leaveHouseholdDialogController.closeDialog}
                title="Potwierdzenie opuszczenia"
                content="Czy na pewno chcesz opuścić gospodarstwo?"
                confirmText="Opuść"
                confirmColor="error"
                action={leaveHousehold}
                reloadTable={data.reloadTable}
            />

            {/*Dialog do usuwania gospodarstwa*/}
            <ConfirmationDialog
                open={deleteHouseholdDialogController.openDialogStatus}
                closeDialog={deleteHouseholdDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content="Czy na pewno chcesz usunąć gospodarstwo?"
                confirmText="Usuń"
                confirmColor="error"
                action={deleteHouseholdRequest}
                reloadTable={data.reloadTable}
            />
        </Container>
    )
}