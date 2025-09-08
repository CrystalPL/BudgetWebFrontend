import {
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import TableColumn, {OrderType} from "../../household/components/base/TableColumn";
import * as React from "react";
import {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import {sort} from "../../../util/SortUtil";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import ConfirmationDialog from "../../household/components/base/ConfirmationDialog";
import EditRoleDialog from "./EditRoleDialog";
import {useRouter} from "next/navigation";
import {Star, StarOutlineOutlined} from "@mui/icons-material";
import {FaCrown} from "react-icons/fa";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {deleteRole, makeRoleDefault} from "../api/RoleService";
import {Role} from "../api/RoleModel";
import {StateProp, useStateProp} from "../../../filter/StateProp";

interface RolesTableProps extends HouseholdReloadKeyProps {
    roles: Role[]
}

export default function RoleTable(props: RolesTableProps) {
    const roleNameOrderState: StateProp<OrderType> = useStateProp<OrderType>('asc');
    const sortedRoles: Role[] = sort(roleNameOrderState.value, props.roles, value => value.name)
    const [editedRole, setEditedRole] = useState<Role | null>(null)
    const editRoleDialogController: DialogShowingController = GetShowingController()
    const deleteRoleDialogController: DialogShowingController = GetShowingController()
    const snackbarController = useSnackbarContext();

    const getRoleChip = (role: Role) => {
        return <Chip label={role.name} sx={{
            fontWeight: 'bold',
            backgroundColor: role.hexColor
        }}/>;
    };

    const handleAction = (role: Role, dialogController: DialogShowingController) => {
        setEditedRole(role)
        dialogController.openDialog()
    }

    const router = useRouter()
    const handleEditRolePermissions = (role: Role) => {
        router.push("/household/roles/" + role.id)
    }

    const handleSetAsDefault = async (role: Role) => {
        const response = await makeRoleDefault(role.id)

        snackbarController.setStatus(response.success ? "success" : "error");
        snackbarController.setStatusMessage(response.message);
        snackbarController.setOpenSnackbar(true);

        if (response.success) {
            props.reloadTable()
        }
    }

    const getDefaultRoleTooltip = (role: Role) => {
        const tooltipKey = role.isDefault ? 'default' : 'setDefault'

        if (role.isOwnerRole) {
            return (
                <Tooltip title="Właściciel" arrow key={tooltipKey}>
                    <span>
                        <IconButton disabled>
                            <FaCrown color="gold"></FaCrown>
                         </IconButton>
                    </span>
                </Tooltip>
            )

        }

        if (role.isDefault) {
            return (
                <Tooltip title="Domyślna rola" arrow key={tooltipKey}>
                    <span>
                        <IconButton disabled>
                            <Star color="warning"/>
                         </IconButton>
                    </span>
                </Tooltip>
            )
        }

        return (
            <Tooltip title="Ustaw rolę jako domyślną" arrow key={tooltipKey}>
                <IconButton
                    color="warning"
                    onClick={() => handleSetAsDefault(role)}
                    sx={{
                        "&:hover": {
                            backgroundColor: "rgba(255,193,7,0.2)",
                        },
                    }}
                >
                    <StarOutlineOutlined/>
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                mb: 4,
            }}
        >
            <Table>
                <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                    <TableRow>
                        <TableColumn
                            columnName="Nazwa roli"
                            orderProps={roleNameOrderState}
                            setOrderBy={() => {
                            }}/>
                        <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Kolor</TableCell>
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRoles
                        .map((role) => (
                            <TableRow key={role.id} sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{getRoleChip(role)}</TableCell>
                                <TableCell align="right">
                                    {getDefaultRoleTooltip(role)}
                                    <Tooltip title="Edytuj role" arrow>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAction(role, editRoleDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(75,187,71,0.2)",
                                                },
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edytuj uprawnienia roli" arrow>
                                        <IconButton
                                            onClick={() => handleEditRolePermissions(role)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(117,117,117,0.24)",
                                                },
                                            }}
                                        >
                                            <MenuIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Usuń rolę" arrow>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleAction(role, deleteRoleDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(206,21,21,0.2)",
                                                },
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <EditRoleDialog {...editRoleDialogController} reloadTable={props.reloadTable}
                            editedRole={editedRole}></EditRoleDialog>
            <ConfirmationDialog
                open={deleteRoleDialogController.openDialogStatus}
                closeDialog={deleteRoleDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content={
                    <>
                        <Typography variant="body1">
                            Usunięcie roli spowoduje ustawianie wszystkim użytkownikom domyślnej roli.
                        </Typography>
                        <Typography variant="body1">
                            Czy na pewno chcesz usunąć rolę <strong>{editedRole?.name}</strong>?
                        </Typography>
                        <Typography variant="body1" color="error" fontWeight="bold">
                            TEJ OPERACJI NIE DA SIĘ COFNĄĆ
                        </Typography>
                    </>
                }
                confirmText="Usuń"
                confirmColor="error"
                action={() => deleteRole(editedRole?.id)}
                reloadTable={props.reloadTable}
            />
        </TableContainer>
    )
}