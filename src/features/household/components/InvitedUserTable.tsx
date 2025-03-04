import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import * as React from "react";
import {useState} from "react";
import {sort} from "../../../util/SortUtil";
import TableColumn from "./base/TableColumn";
import {undoInvitation} from "../api/HouseholdService";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {HouseholdInvitedMember, HouseholdReloadKeyProps} from "../api/HouseholdModel";

interface InvitedUserTableProps extends HouseholdReloadKeyProps {
    householdInviteMembers: HouseholdInvitedMember[]
}

export default function InvitedUserTable({householdInviteMembers: members, reloadTable}: InvitedUserTableProps) {
    const [orderEmail, setOrderEmail] = useState<'asc' | 'desc'>('asc');
    const [orderInvitationDate, setOrderInvitationDate] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'email' | 'invitedDate'>('email');

    const sortedMembers: HouseholdInvitedMember[] = orderBy === 'email'
        ? sort(orderEmail, members, value => value.email)
        : sort(orderInvitationDate, members, value => value.invitedTime.getMilliseconds());

    const snackbarController = useSnackbarContext();
    const handleUndoInvite = async (member: HouseholdInvitedMember) => {
        const result = await undoInvitation(member.userId)
        snackbarController.setOpenSnackbar(true)
        snackbarController.setStatusMessage(result.message)
        snackbarController.setStatus(result.success ? 'success' : 'error')
        reloadTable()
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
                        <TableColumn columnName="Adres e-mail" orderType={orderEmail}
                                     setOrderType={setOrderEmail}
                                     setOrderBy={() => setOrderBy('email')}>
                        </TableColumn>
                        <TableColumn columnName="Data zaproszenia" orderType={orderInvitationDate}
                                     setOrderType={setOrderInvitationDate}
                                     setOrderBy={() => setOrderBy('invitedDate')}>
                        </TableColumn>
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
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.invitedTime.toLocaleString('pl-PL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleUndoInvite(member)}
                                    >
                                        <UndoIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}