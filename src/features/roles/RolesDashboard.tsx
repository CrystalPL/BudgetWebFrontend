import Container from "@mui/material/Container";
import * as React from "react";
import RoleTable from "./components/RoleTable";
import {HouseholdReloadKeyProps} from "../household/api/HouseholdModel";
import RoleDashboardHeader from "./components/RoleDashboardHeader";
import {DialogShowingController, GetShowingController} from "../../controllers/DialogShowingController";
import CreateRoleDialog from "./components/CreateRoleDialog";

import {Role} from "./api/RoleModel";

interface RoleDashboardData extends HouseholdReloadKeyProps {
    roles: Role[],
}

export default function RolesDashboard(props: RoleDashboardData) {
    const createRoleDialogController: DialogShowingController = GetShowingController()

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
            <RoleDashboardHeader openCreateRoleDialog={createRoleDialogController.openDialog}></RoleDashboardHeader>
            <RoleTable roles={props.roles} reloadTable={props.reloadTable}></RoleTable>
            <CreateRoleDialog {...createRoleDialogController} reloadTable={props.reloadTable}></CreateRoleDialog>
        </Container>
    )
}