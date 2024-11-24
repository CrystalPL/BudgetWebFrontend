'use client'
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useState} from "react";
import {MuiColorInput} from "mui-color-input";
import {CustomFormControl, CustomFormControlProps} from "../../../../account/components/AccountDetails";
import MenuIcon from "@mui/icons-material/Menu";
import {useRouter} from "next/navigation";

interface Role {
    id: number;
    name: string;
    hexColor: string;
}

enum SortType {
    ASC = "Sortuj rosnąco",
    DESC = "Sortuj malejąco"
}

const roles: Role[] = [
    {
        id: 1,
        name: "Administrator",
        hexColor: "#FF5733" // Czerwony
    },
    {
        id: 2,
        name: "Użytkownik",
        hexColor: "#4CAF50" // Zielony
    },
    {
        id: 3,
        name: "Gość",
        hexColor: "#2196F3" // Niebieski
    },
    {
        id: 4,
        name: "Moderator",
        hexColor: "#FFC107" // Żółty
    },
    {
        id: 5,
        name: "Editor",
        hexColor: "#9C27B0" // Fioletowy
    }
];


function sort(roles: Role[], sortType: SortType): Role[] {
    return roles.sort((role1, role2) => {
        if (sortType === SortType.ASC) {
            return role1.name > role2.name ? 1 : -1
        }

        return role1.name > role2.name ? -1 : 1
    })
}

export default function Roles() {
    const [createRoleOpen, setCreateRoleOpen] = React.useState(false);
    const [sortType, setSortType] = React.useState<SortType>(SortType.ASC);
    const [colorPickerValue, setColorPickerValue] = React.useState('#ffffff')
    const [roleName, setRoleName] = useState<string>("")
    const [roleError, setRoleError] = useState<string>("")

    const router = useRouter()
    const handleSort = () => {
        setSortType(sortType === SortType.ASC ? SortType.DESC : SortType.ASC);
    }

    const handleEditRole = () => {

    }

    const handleDeleteRole = () => {

    }

    const handleEditRolePermissions = (roleId: number) => {
        router.push("/house-hold/roles/" + roleId)
    }

    const handleChooseColor = (newValue: React.SetStateAction<string>) => {
        setColorPickerValue(newValue)
    }

    const handleCreateRole = () => {

    }

    const handleCloseRoleCreating = () => {
        setCreateRoleOpen(false)
    }

    const validateRoleName = (): string => {
        if (!roleName || roleName.trim() === '') {
            return "Chuj źle"
        }
        return ""
    }

    const roleNameFieldProps: CustomFormControlProps = {
        valueState: [roleName, setRoleName],
        errorState: [roleError, setRoleError],
        label: 'Nazwa użytkownika',
        name: 'username',
        validateFunction: validateRoleName
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
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Typography variant="h5" sx={{fontWeight: 'medium'}}>
                    Zarządzanie rolami
                </Typography>

                <Stack direction="row" component="div" spacing={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        onClick={() => setCreateRoleOpen(true)}
                    >
                        Stwórz role
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DateRangeIcon/>}
                        href="/house-hold/roles/logs"
                    >
                        Wyświetl zdarzenia
                    </Button>
                </Stack>
            </Box>

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
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>
                                        Nazwa roli
                                    </Typography>

                                    <Tooltip title={sortType === SortType.ASC ? SortType.DESC : SortType.ASC} arrow>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '50%',
                                                width: '30px',
                                                height: '30px',
                                                marginLeft: '8px',
                                                '&:hover': {
                                                    backgroundColor: '#e0e0e0',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                            onClick={() => handleSort()}
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={sortType === SortType.ASC ? 'asc' : 'desc'}
                                                sx={{padding: 0}}
                                            >
                                            </TableSortLabel>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Kolor</TableCell>
                            <TableCell align="right"
                                       sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {sort(roles, sortType)
                            .map((role) => (
                                <TableRow key={role.id} sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell><Chip label={role.name} sx={{
                                        fontWeight: 'bold',
                                        bgcolor: `${role.hexColor}`
                                    }}/></TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edytuj rolę" arrow>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEditRole()}
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edytuj uprawnienia roli" arrow>
                                            <IconButton
                                                onClick={() => handleEditRolePermissions(role.id)}
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Usuń rolę" arrow>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteRole()}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={createRoleOpen} onClose={handleCloseRoleCreating} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Stwórz role</DialogTitle>
                <DialogContent>
                    <Stack spacing={1} mt={1}>
                        <CustomFormControl {...roleNameFieldProps}></CustomFormControl>
                        <MuiColorInput format="hex" value={colorPickerValue} onChange={handleChooseColor}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRoleCreating}
                        variant="text"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(169, 190, 119, 0.2)',
                            },
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button onClick={handleCreateRole} variant="contained">
                        Stwórz
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}