'use client'
import React, {useState} from "react";
import {GroupPermission, Permission, PermissionKey, roles} from "./api/RolePermissions";
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {savePermissions} from "./api/RoleService";
import {useSnackbarContext} from "../../context/SnackbarContext";
import {useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";

interface Props {
    roleId: number
    rolePermission: PermissionKey[]
}

export default function RolePermissionTable(props: Props) {
    const [openRows, setOpenRows] = useState<number[]>([]);
    const [rolePermissions, setRolePermissions] = useState<PermissionKey[]>(props.rolePermission);
    const snackbarController = useSnackbarContext()
    const router = useRouter();

    const isAllPermissionSelected = (id: number) => {
        const groupPermission: GroupPermission = roles.find(permission => permission.id === id)!;
        return groupPermission.permissions.every(permission => isPermissionSelected(permission));
    }

    const isPermissionSelected = (permisison: PermissionKey) => {
        return rolePermissions.includes(permisison);
    }

    const selectGroupPermission = (id: number) => {
        const groupPermission: GroupPermission = roles.find(permission => permission.id === id)!;
        const status = !isAllPermissionSelected(id)
        setRolePermissions(prevPermissions => {
            if (status) {
                const updated = [...prevPermissions];
                groupPermission.permissions.forEach(permission => {
                    if (!updated.includes(permission)) {
                        updated.push(permission);
                    }
                });
                return updated;
            } else {
                return prevPermissions.filter(permission => !groupPermission.permissions.includes(permission));
            }
        });
    }

    const selectPermission = (permission: PermissionKey) => {
        setRolePermissions(prevPermissions => {
            if (prevPermissions.includes(permission)) {
                return prevPermissions.filter(p => p !== permission);
            } else {
                return [...prevPermissions, permission];
            }
        });
    }

    const toggleRow = (id: number) => {
        setOpenRows(prev => {
            if (prev.includes(id)) {
                return prev.filter(index => index !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    const savePermissionsHandler = async () => {
        const response = await savePermissions(props.roleId, rolePermissions);

        snackbarController.setStatus(response.success ? 'success' : 'error')
        snackbarController.setOpenSnackbar(true)
        snackbarController.setStatusMessage(response.message)
    }

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
            <Typography variant="h5" sx={{fontWeight: 'medium', mb: 4, fontSize: '1.5rem'}}>
                Zarządzanie uprawnieniami
            </Typography>

            <TableContainer component={Paper} sx={{
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                mb: 4,
            }}>
                <Table>
                    <TableBody>
                        {roles.map((role) => (
                            <React.Fragment key={role.id}>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <IconButton onClick={() => toggleRow(role.id)}>
                                                {openRows.includes(role.id) ? <KeyboardArrowUpIcon/> :
                                                    <KeyboardArrowDownIcon/>}
                                            </IconButton>
                                            <Checkbox
                                                checked={isAllPermissionSelected(role.id)}
                                                onChange={() => selectGroupPermission(role.id)}
                                            />
                                            <Typography variant="body1"
                                                        sx={{fontSize: '1.25rem'}}>{role.name}</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{padding: 0}}>
                                        <Collapse in={openRows.includes(role.id)} timeout="auto" unmountOnExit>
                                            <Box sx={{padding: 2}}>
                                                {role.permissions.map((permission: PermissionKey, index2) => (
                                                    <Box key={index2}
                                                         sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                                        <Checkbox
                                                            checked={isPermissionSelected(permission)}
                                                            onChange={() => selectPermission(permission)}
                                                        />
                                                        <Typography variant="body2"
                                                                    sx={{fontSize: '1rem'}}>{Permission[permission]}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" onClick={() => router.push('/household/roles')}>
                    Powrót
                </Button>
                <Button variant="contained" onClick={savePermissionsHandler}>
                    Zapisz Ustawienia
                </Button>
            </Stack>
        </Container>
    );
}