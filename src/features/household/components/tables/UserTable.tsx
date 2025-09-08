'use client'
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
    Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useState} from "react";
import {sort} from "../../../../util/SortUtil";
import TableColumn from "../base/TableColumn";
import {HouseholdMember, HouseholdMemberRole, HouseholdReloadKeyProps} from "../../api/HouseholdModel";
import ChangeUserRoleDialog from "../dialogs/ChangeUserRoleDialog";
import {DialogShowingController, GetShowingController} from "../../../../controllers/DialogShowingController";
import {deleteUser, transferHouseholdOwner} from "../../api/HouseholdService";
import ConfirmationDialog from "../base/ConfirmationDialog";
import {FaCrown} from "react-icons/fa";

interface UserTableProps extends HouseholdReloadKeyProps {
    householdMembers: HouseholdMember[]
}

export default function UserTable({householdMembers: members, reloadTable}: UserTableProps) {
    const [orderUsername, setOrderUsername] = useState<'asc' | 'desc'>('asc');
    const [orderRole, setOrderRole] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'username' | 'role'>('username');
    const [editedMember, setEditedMember] = useState<HouseholdMember | null>(null);
    const editUserRoleDialogController: DialogShowingController = GetShowingController()
    const deleteUserDialogController: DialogShowingController = GetShowingController()
    const transferOwnerDialogController: DialogShowingController = GetShowingController()

    const sortedMembers: HouseholdMember[] = orderBy === 'username'
        ? sort(orderUsername, members, value => value.username)
        : sort(orderRole, members, value => value.role.name);

    const getRoleChip = (role: HouseholdMemberRole) => {
        return <Chip label={role.name} sx={{
            fontWeight: 'bold',
            backgroundColor: role.color
        }}/>;
    };

    const handleAction = (member: HouseholdMember, dialogController: DialogShowingController) => {
        setEditedMember(member)
        dialogController.openDialog()
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
                        <TableColumn columnName="Nazwa użytkownika" orderType={orderUsername}
                                     setOrderType={setOrderUsername}
                                     setOrderBy={() => setOrderBy('username')}></TableColumn>
                        <TableColumn columnName="Rola" orderType={orderRole} setOrderType={setOrderRole}
                                     setOrderBy={() => setOrderBy('role')}></TableColumn>
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedMembers
                        .map((member) => (
                            <TableRow key={member.userId} sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}>
                                <TableCell>{member.username}</TableCell>
                                <TableCell>{getRoleChip(member.role)}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edytuj rolę">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAction(member, editUserRoleDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(75,187,71,0.2)",
                                                },
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Usuń użytkownika">
                                        <IconButton color="error"
                                                    onClick={() => handleAction(member, deleteUserDialogController)}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "rgba(206,21,21,0.2)",
                                                        },
                                                    }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Mianuj właścicielem">
                                        <IconButton
                                            onClick={() => handleAction(member, transferOwnerDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(217,207,13,0.2)",
                                                },
                                            }}
                                        >
                                            <FaCrown color="gold"></FaCrown>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <ChangeUserRoleDialog reloadTable={reloadTable}
                                  editedMember={editedMember} {...editUserRoleDialogController}></ChangeUserRoleDialog>

            {/*Dialog go usuwania użytkownika*/}
            <ConfirmationDialog
                open={deleteUserDialogController.openDialogStatus}
                closeDialog={deleteUserDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content={`Czy na pewno chcesz usunąć użytkownika ${editedMember?.username} z gospodarstwa?`}
                confirmText="Usuń"
                confirmColor="error"
                action={() => deleteUser(editedMember?.userId)}
                reloadTable={reloadTable}
            />

            {/*Dialog do przekazywania właściciela gospodarstwa*/}
            <ConfirmationDialog
                open={transferOwnerDialogController.openDialogStatus}
                closeDialog={transferOwnerDialogController.closeDialog}
                title="Potwierdzenie zmiany właściciela"
                content={`Czy na pewno chcesz mianowąć ${editedMember?.username} właścicielem gospodarstwa?`}
                confirmText="Mianuj"
                confirmColor="error"
                action={() => transferHouseholdOwner(editedMember?.userId)}
                reloadTable={reloadTable}
            />
        </TableContainer>
    )
}