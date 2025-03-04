import {Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useState} from "react";
import {sort} from "../../../util/SortUtil";
import TableColumn from "./base/TableColumn";
import {HouseholdMember, HouseholdMemberRole} from "../api/HouseholdModel";

interface UserTableProps {
    householdMembers: HouseholdMember[]
}

export default function UserTable({householdMembers: members}: UserTableProps) {
    const [orderUsername, setOrderUsername] = useState<'asc' | 'desc'>('asc');
    const [orderRole, setOrderRole] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'username' | 'role'>('username');

    const sortedMembers: HouseholdMember[] = orderBy === 'username'
        ? sort(orderUsername, members, value => value.username)
        : sort(orderRole, members, value => value.role.name);

    const getRoleChip = (role: HouseholdMemberRole) => {
        return <Chip label={role.name} sx={{
            fontWeight: 'bold',
            backgroundColor: role.color
        }}/>;
    };

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
                                    <IconButton
                                        color="primary"
                                        // onClick={() => handleEditRole(member)}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        // onClick={() => handleDeleteClick(member)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}