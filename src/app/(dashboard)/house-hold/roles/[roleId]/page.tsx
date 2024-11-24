'use client'
import React, {useState} from "react";
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

const testData: Role[] = [
    {
        id: 1,
        name: "Zarządzanie Użytkownikami",
        permissions: [
            {id: 1, name: "Zarządzanie użytkownikami"},
            {id: 2, name: "Zarządzanie rolami"},
            {id: 3, name: "Zarządzanie uprawnieniami"}
        ]
    },
    {
        id: 2,
        name: "Zarządzanie Danymi",
        permissions: [
            {id: 4, name: "Przeglądanie raportów"},
            {id: 5, name: "Eksport danych"},
            {id: 6, name: "Import danych"}
        ]
    },
    {
        id: 3,
        name: "Zarządzanie Systemem",
        permissions: [
            {id: 7, name: "Zarządzanie ustawieniami"},
            {id: 8, name: "Zarządzanie logami"}
        ]
    }
];

export default function EditRolePermissions() {
    const [openRows, setOpenRows] = useState<number[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key: number]: boolean }>({});

    const handleToggleRow = (id: number) => {
        setOpenRows((prev) =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (roleId: number, permissions: Permission[]) => {
        const allSelected = permissions.every(permission => selectedPermissions[permission.id]);

        const newSelected = permissions.reduce((acc, permission) => {
            acc[permission.id] = !allSelected;
            return acc;
        }, {} as { [key: number]: boolean });

        setSelectedPermissions((prev) => ({
            ...prev,
            ...newSelected
        }));
    };

    const handleSaveSettings = () => {
        // Logika do zapisania ustawień
        console.log("Zapisano ustawienia:", selectedPermissions);
        // Tutaj można dodać kod do zapisania ustawień, np. wysłanie danych do API
    };

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
                        {testData.map((role) => (
                            <React.Fragment key={role.id}>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <IconButton onClick={() => handleToggleRow(role.id)}>
                                                {openRows.includes(role.id) ? <KeyboardArrowUpIcon/> :
                                                    <KeyboardArrowDownIcon/>}
                                            </IconButton>
                                            <Checkbox
                                                checked={role.permissions.every(permission => selectedPermissions[permission.id])}
                                                onChange={() => handleSelectAll(role.id, role.permissions)}
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
                                                {role.permissions.map(permission => (
                                                    <Box key={permission.id}
                                                         sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                                        <Checkbox
                                                            checked={!!selectedPermissions[permission.id]}
                                                            onChange={() => {
                                                                setSelectedPermissions(prev => ({
                                                                    ...prev,
                                                                    [permission.id]: !prev[permission.id]
                                                                }));
                                                            }}
                                                        />
                                                        <Typography variant="body2"
                                                                    sx={{fontSize: '1rem'}}>{permission.name}</Typography>
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

            {/* Przycisk do zapisu ustawień */}
            <Box sx={{mt: 4, display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained" onClick={handleSaveSettings}>
                    Zapisz Ustawienia
                </Button>
            </Box>
        </Container>
    );
}
