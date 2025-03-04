'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Stack from "@mui/material/Stack";
import {AdminPanelSettings} from "@mui/icons-material";

interface HouseholdMember {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'zaakceptowane' | 'oczekujące';
    inviteTimestamp: number; // Użyj timestampu
}

const initialMembers: HouseholdMember[] = [
    {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        role: 'Właściciel',
        status: 'zaakceptowane',
        inviteTimestamp: 0
    },
    {
        id: 2,
        name: 'Anna Nowak',
        email: 'anna@example.com',
        role: 'Domownik',
        status: 'oczekujące',
        inviteTimestamp: 66666 // Użyj bieżącego timestampu
    },
    {
        id: 3,
        name: 'Marek Wiśniewski',
        email: 'marek@example.com',
        role: 'Domownik',
        status: 'zaakceptowane',
        inviteTimestamp: 0
    },
    {
        id: 4,
        name: 'Marek Wiśniewski',
        email: 'darek@example.com',
        role: 'Domownik',
        status: 'oczekujące',
        inviteTimestamp: 666667
    },
    {
        id: 5,
        name: 'carek Wiśniewski',
        email: 'marek@example.com',
        role: 'Domownik',
        status: 'oczekujące',
        inviteTimestamp: 999999
    },
    {
        id: 6,
        name: 'jopekarek Wiśniewski',
        email: 'joptwojamaćmarek@example.com',
        role: 'Domownik',
        status: 'oczekujące',
        inviteTimestamp: 999999999
    }
];

export default function HouseholdTable() {
    const [members, setMembers] = React.useState<HouseholdMember[]>(initialMembers);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [selectedMember, setSelectedMember] = React.useState<HouseholdMember | null>(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
    const [memberToDelete, setMemberToDelete] = React.useState<HouseholdMember | null>(null);
    const [editedRole, setEditedRole] = React.useState('');
    const [confirmUndoOpen, setConfirmUndoOpen] = React.useState(false);
    const [memberToUndo, setMemberToUndo] = React.useState<HouseholdMember | null>(null);

    // Dodaj stany do zarządzania sortowaniem
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof HouseholdMember>('name');

    // Stany do zarządzania sortowaniem drugiej tabeli - email
    const [orderPending, setOrderPending] = React.useState<'asc' | 'desc'>('asc');
    const [orderByPending, setOrderByPending] = React.useState<keyof HouseholdMember>('email');

    // Stany do zarządzania sortowaniem drugiej tabeli - email
    const [orderPendingInviteTimeStamp, setOrderPendingInviteTimeStamp] = React.useState<'asc' | 'desc'>('asc');
    const [orderByPendingInviteTimeStamp, setOrderByPendingInviteTimeStamp] = React.useState<keyof HouseholdMember>('inviteTimestamp');

    const handleDelete = (id: number) => {
        setMembers(members.filter((member) => member.id !== id));
        setConfirmDeleteOpen(false);
    };

    const handleEditRole = (member: HouseholdMember) => {
        setSelectedMember(member);
        setEditedRole(member.role);
        setEditOpen(true);
    };

    const handleSaveRoleEdit = () => {
        if (selectedMember) {
            setMembers(
                members.map((member) =>
                    member.id === selectedMember.id
                        ? {...member, role: editedRole}
                        : member
                )
            );
            setEditOpen(false);
        }
    };

    const handleInvite = () => {
        const currentTimestamp = Date.now(); // Użycie timestampu
        const newMember: HouseholdMember = {
            id: members.length + 1,
            name: 'Nowy użytkownik',
            email: email,
            role: 'Domownik',
            status: 'oczekujące',
            inviteTimestamp: currentTimestamp // Ustawienie timestampu
        };
        setMembers([...members, newMember]);
        setEmail('');
        setOpen(false);
    };

    const getRoleChip = (role: string) => {
        switch (role) {
            case 'Właściciel':
                return <Chip label={role} color="success" sx={{fontWeight: 'bold'}}/>;
            case 'Domownik':
                return <Chip label={role} color="primary" sx={{fontWeight: 'bold'}}/>;
            default:
                return <Chip label={role} color="default" sx={{fontWeight: 'bold'}}/>;
        }
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'zaakceptowane':
                return <Chip label="Zaakceptowane" color="success" sx={{fontWeight: 'bold'}}/>;
            case 'oczekujące':
                return <Chip label="Oczekujące" color="warning" sx={{fontWeight: 'bold'}}/>;
            default:
                return <Chip label={status} color="default" sx={{fontWeight: 'bold'}}/>;
        }
    };

    const handleDeleteClick = (member: HouseholdMember) => {
        setMemberToDelete(member);
        setConfirmDeleteOpen(true);
    };

    const confirmDeleteMember = () => {
        if (memberToDelete) {
            handleDelete(memberToDelete.id);
        }
    };

    const handleUndoInvite = (member: HouseholdMember) => {
        setMemberToUndo(member);
        setConfirmUndoOpen(true);
    };

    const confirmUndoInvite = () => {
        if (memberToUndo) {
            setMembers(members.filter((m) => m.id !== memberToUndo.id));
            setConfirmUndoOpen(false);
        }
    };

    // Funkcja do formatowania timestampu na datę i godzinę
    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0].slice(0, 5)}`;
    };

    // Funkcja do sortowania
    const handleRequestSort = (property: keyof HouseholdMember) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [stanPola1, ustawStanPola1] = React.useState<'asc' | 'desc'>('asc');
    const [stanPola2, ustawStanPola2] = React.useState<'asc' | 'desc'>('asc');

    const [stanDlaMetody, ustawStanDlaMetody] = React.useState<'asc' | 'desc'>('asc');
    const [nazwaPolaDlaMetody, ustawNazwePolaDlaMetody] = React.useState<keyof HouseholdMember>("email");

    const handleRequestSortPending = (property: keyof HouseholdMember) => {
        const nowyStanPola1 = stanPola1 === 'asc' ? 'desc' : 'asc';
        ustawStanPola1(nowyStanPola1);
        ustawStanDlaMetody(nowyStanPola1);
        ustawNazwePolaDlaMetody(property);
    };

    const handleRequestSortPending2 = (property: keyof HouseholdMember) => {
        const nowyStanPola2 = stanPola2 === 'asc' ? 'desc' : 'asc';
        ustawStanPola2(nowyStanPola2);
        ustawStanDlaMetody(nowyStanPola2);
        ustawNazwePolaDlaMetody(property);
    };

    const sortedMembers = [...members].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });

    const sortedPendingMembers = [...members]
        .filter((member) => member.status === 'oczekujące')
        .sort((a, b) => {
            const aValue = nazwaPolaDlaMetody === 'inviteTimestamp' ? a.inviteTimestamp : a[nazwaPolaDlaMetody];
            const bValue = nazwaPolaDlaMetody === 'inviteTimestamp' ? b.inviteTimestamp : b[nazwaPolaDlaMetody];

            // Upewnij się, że aValue i bValue są porównywalne
            if (aValue < bValue) return stanDlaMetody === 'asc' ? -1 : 1;
            if (aValue > bValue) return stanDlaMetody === 'asc' ? 1 : -1;
            return 0;
        });

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
                    Zarządzanie domownikami
                </Typography>

                <Stack direction="row" component="div" spacing={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        onClick={() => setOpen(true)}
                    >
                        Zaproś użytkownika
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DateRangeIcon/>}
                        href="/household/logs"
                    >
                        Wyświetl zdarzenia
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AdminPanelSettings/>}
                        href="/household/roles"
                    >
                        Zarządzanie rolami
                    </Button>
                </Stack>
            </Box>

            {/* Tabela zaakceptowanych użytkowników */}
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
                                        Nazwa użytkownika
                                    </Typography>

                                    <Tooltip title={order === 'asc' ? 'Sortuj malejąco' : 'Sortuj rosnąco'} arrow>
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
                                            onClick={() => handleRequestSort('name')} // zmiana sortowania
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={orderBy === 'name' ? order : 'asc'}
                                                sx={{padding: 0}} // usunięcie domyślnego paddingu
                                            >
                                                {/* Ikona strzałki sortowania */}
                                            </TableSortLabel>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Rola</TableCell>
                            <TableCell align="right"
                                       sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {sortedMembers
                            .filter((member) => member.status === 'zaakceptowane')
                            .map((member) => (
                                <TableRow key={member.id} sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{getRoleChip(member.role)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEditRole(member)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteClick(member)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Tabela oczekujących użytkowników */}
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
                                        Adres e-mail
                                    </Typography>
                                    <Tooltip title={stanPola1 === 'asc' ? 'Sortuj malejąco' : 'Sortuj rosnąco'}
                                             arrow>
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
                                            onClick={() => handleRequestSortPending('email')} // zmiana sortowania
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={stanPola1}
                                                sx={{padding: 0}} // usunięcie domyślnego paddingu
                                            >
                                                {/* Ikona strzałki sortowania */}
                                            </TableSortLabel>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>
                                        Data zaproszenia
                                    </Typography>
                                    <Tooltip title={stanPola2 === 'asc' ? 'Sortuj malejąco' : 'Sortuj rosnąco'}
                                             arrow>
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
                                            onClick={() => handleRequestSortPending2('inviteTimestamp')} // Zmiana sortowania dla daty zaproszenia
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={stanPola2}
                                                sx={{padding: 0}} // Usunięcie domyślnego paddingu
                                            >
                                                {/* Ikona strzałki sortowania */}
                                            </TableSortLabel>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                borderBottom: '1px solid #ddd'
                            }}>Status</TableCell> {/* Dodaj kolumnę Status */}
                            <TableCell align="right"
                                       sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPendingMembers
                            .filter((member) => member.status === 'oczekujące')
                            .map((member) => (
                                <TableRow key={member.id} sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{formatTimestamp(member.inviteTimestamp)}</TableCell>
                                    <TableCell>{getStatusChip(member.status)}</TableCell> {/* Dodaj status */}
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

            {/* Dialog do zapraszania użytkownika */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Zaproś użytkownika</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Adres e-mail"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="text"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(169, 190, 119, 0.2)',
                            },
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button onClick={handleInvite} variant="contained">
                        Zaproś
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog do edytowania roli */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Edytuj rolę użytkownika</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="role-select-label">Rola</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={editedRole}
                            label="Rola"
                            onChange={(e) => setEditedRole(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value="Właściciel">Właściciel</MenuItem>
                            <MenuItem value="Domownik">Domownik</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} variant="text" sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(169, 190, 119, 0.2)',
                        },
                    }}>
                        Anuluj
                    </Button>
                    <Button onClick={handleSaveRoleEdit} variant="contained">
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog do potwierdzenia usunięcia użytkownika */}
            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Potwierdzenie usunięcia</DialogTitle>
                <DialogContent>
                    <Typography>
                        Czy na pewno chcesz usunąć użytkownika <strong>{memberToDelete?.name}</strong> z gospodarstwa?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} variant="text" sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(169, 190, 119, 0.2)',
                        },
                    }}>
                        Anuluj
                    </Button>
                    <Button onClick={confirmDeleteMember} variant="contained" color="error">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog do potwierdzenia cofnięcia zaproszenia */}
            <Dialog open={confirmUndoOpen} onClose={() => setConfirmUndoOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{fontWeight: 'medium'}}>Potwierdzenie cofnięcia zaproszenia</DialogTitle>
                <DialogContent>
                    <Typography>
                        Czy na pewno chcesz cofnąć zaproszenie dla użytkownika <strong>{memberToUndo?.email}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmUndoOpen(false)} variant="text" sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(169, 190, 119, 0.2)',
                        },
                    }}>
                        Anuluj
                    </Button>
                    <Button onClick={confirmUndoInvite} variant="contained" color="error">
                        Cofnij
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
