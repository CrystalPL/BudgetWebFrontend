import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {Add, Cancel, Save} from '@mui/icons-material';
import {BillType} from '../api/BillModel';
import Grid from "@mui/material/Grid";

interface BillTypeFormProps {
    editingType: BillType | null;
    onSave: (data: {
        name: string;
        icon: string;
        unit?: string;
        description?: string;
    }) => void;
    onCancel: () => void;
    isLoading?: boolean;
    isModal?: boolean;
    formRef?: (ref: HTMLFormElement | null) => void;
}

const AVAILABLE_ICONS = [
    {value: '⚡', label: 'Prąd'},
    {value: '🔥', label: 'Gaz'},
    {value: '💧', label: 'Woda'},
    {value: '🌐', label: 'Internet'},
    {value: '📱', label: 'Telefon'},
    {value: '🏠', label: 'Czynsz'},
    {value: '🚗', label: 'Ubezpieczenie'},
    {value: '📺', label: 'Telewizja'},
    {value: '🎵', label: 'Streaming'},
    {value: '🏥', label: 'Zdrowie'},
    {value: '🎓', label: 'Edukacja'},
    {value: '💳', label: 'Karta'},
    {value: '🏦', label: 'Bank'},
    {value: '📄', label: 'Dokument'},
    {value: '💰', label: 'Pieniądze'},
    {value: '🔧', label: 'Serwis'}
];

const AVAILABLE_UNITS = [
    {value: 'kWh', label: 'kWh (kilowatogodziny)'},
    {value: 'm³', label: 'm³ (metry sześcienne)'},
    {value: 'GB', label: 'GB (gigabajty)'},
    {value: 'min', label: 'min (minuty)'},
    {value: 'szt', label: 'szt (sztuki)'},
    {value: 'miesiąc', label: 'miesiąc'},
    {value: 'rok', label: 'rok'}
];

export const BillTypeForm: React.FC<BillTypeFormProps> = ({
                                                              editingType,
                                                              onSave,
                                                              onCancel,
                                                              isLoading = false,
                                                              isModal = false,
                                                              formRef
                                                          }) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('📄');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (editingType) {
            setName(editingType.name);
            setIcon(editingType.icon || '📄');
            setUnit(editingType.unit || '');
            setDescription(editingType.description || '');
        } else {
            setName('');
            setIcon('📄');
            setUnit('');
            setDescription('');
        }
        setErrors({});
    }, [editingType]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Nazwa jest wymagana';
        }

        if (!icon) {
            newErrors.icon = 'Ikona jest wymagana';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSave({
            name: name.trim(),
            icon,
            unit: unit || undefined,
            description: description.trim() || undefined
        });
    };

    if (isModal) {
        // Tryb modalny - tylko formularz bez Card
        return (
            <form
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nazwa typu rachunku"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            placeholder="np. Prąd, Gaz, Internet"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors.icon}>
                            <InputLabel>Ikona</InputLabel>
                            <Select
                                value={icon}
                                label="Ikona"
                                onChange={(e) => setIcon(e.target.value)}
                            >
                                {AVAILABLE_ICONS.map((iconOption) => (
                                    <MenuItem key={iconOption.value} value={iconOption.value}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <Avatar sx={{width: 24, height: 24, fontSize: '1rem'}}>
                                                {iconOption.value}
                                            </Avatar>
                                            {iconOption.label}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Jednostka (opcjonalnie)</InputLabel>
                            <Select
                                value={unit}
                                label="Jednostka (opcjonalnie)"
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Brak jednostki</em>
                                </MenuItem>
                                {AVAILABLE_UNITS.map((unitOption) => (
                                    <MenuItem key={unitOption.value} value={unitOption.value}>
                                        {unitOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Opis (opcjonalnie)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Krótki opis typu rachunku"
                            multiline
                            maxRows={2}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{p: 2, backgroundColor: '#f8f9fa'}}>
                            <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 600}}>
                                Podgląd:
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                <Avatar sx={{width: 40, height: 40, fontSize: '1.2rem'}}>
                                    {icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                        {name || 'Nazwa typu rachunku'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {unit && `Jednostka: ${unit}`}
                                        {description && ` • ${description}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        );
    }

    // Tryb zwykły - z Card i przyciskami
    return (
        <Card>
            <Box sx={{p: 3}}>
                <Typography variant="h6" sx={{mb: 3, fontWeight: 600}}>
                    {editingType ? 'Edytuj typ rachunku' : 'Dodaj nowy typ rachunku'}
                </Typography>

                <form
                    onSubmit={handleSubmit}
                    ref={formRef}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nazwa typu rachunku"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="np. Prąd, Gaz, Internet"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.icon}>
                                <InputLabel>Ikona</InputLabel>
                                <Select
                                    value={icon}
                                    label="Ikona"
                                    onChange={(e) => setIcon(e.target.value)}
                                >
                                    {AVAILABLE_ICONS.map((iconOption) => (
                                        <MenuItem key={iconOption.value} value={iconOption.value}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Avatar sx={{width: 24, height: 24, fontSize: '1rem'}}>
                                                    {iconOption.value}
                                                </Avatar>
                                                {iconOption.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Jednostka (opcjonalnie)</InputLabel>
                                <Select
                                    value={unit}
                                    label="Jednostka (opcjonalnie)"
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Brak jednostki</em>
                                    </MenuItem>
                                    {AVAILABLE_UNITS.map((unitOption) => (
                                        <MenuItem key={unitOption.value} value={unitOption.value}>
                                            {unitOption.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Opis (opcjonalnie)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Krótki opis typu rachunku"
                                multiline
                                maxRows={2}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Paper sx={{p: 2, backgroundColor: '#f8f9fa'}}>
                                <Typography variant="subtitle2" sx={{mb: 1, fontWeight: 600}}>
                                    Podgląd:
                                </Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    <Avatar sx={{width: 40, height: 40, fontSize: '1.2rem'}}>
                                        {icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight="medium">
                                            {name || 'Nazwa typu rachunku'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {unit && `Jednostka: ${unit}`}
                                            {description && ` • ${description}`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box sx={{display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            startIcon={<Cancel/>}
                            disabled={isLoading}
                        >
                            Anuluj
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={editingType ? <Save/> : <Add/>}
                            disabled={isLoading}
                            sx={{
                                backgroundColor: '#007bff',
                                '&:hover': {backgroundColor: '#0056b3'}
                            }}
                        >
                            {editingType ? 'Zapisz zmiany' : 'Dodaj typ'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Card>
    );
};
