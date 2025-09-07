'use client'
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {pl} from "date-fns/locale";
import {useEffect, useState} from "react";
import {CreateBillDetails} from "../api/BillModel";
import {DialogShowingController} from "../../../controllers/DialogShowingController";
import {createBill, getCreateBillDetails, updateBill, uploadBillAttachment} from "../api/BillService";
import {
    AttachFile,
    CalendarToday,
    CheckCircle,
    Close,
    CloudUpload,
    Description,
    Euro,
    Person,
    Receipt
} from "@mui/icons-material";
import {Bill, BillAttachment} from "../../bills2/api/BillModel";

interface Props {
    creatingController: DialogShowingController;
    editedBill: Bill | null;
    setEditedBill: (bill: Bill | null) => void;
    createBillDetails: CreateBillDetails | null;
    setCreateBillDetails: (details: CreateBillDetails | null) => void;
    reloadTable: () => void;
}

export default function CreateBillDialog(props: Props) {
    const [formData, setFormData] = useState({
        billTypeId: 0,
        amount: '',
        usage: '', // dodaję pole zużycia
        dueDate: new Date(),
        paymentDate: null as Date | null,
        period: '',
        description: '',
        whoPaidId: 0,
        isPaid: false
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // zmiana na tablicę plików
    const [existingAttachments, setExistingAttachments] = useState<BillAttachment[]>([]); // istniejące załączniki
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (props.creatingController.openDialogStatus) {
            loadCreateDetails();
            if (props.editedBill) {
                // Wypełnij formularz danymi edytowanego rachunku
                setFormData({
                    billTypeId: props.editedBill.billType.id,
                    amount: props.editedBill.amount.toString(),
                    usage: props.editedBill.usage?.toString() || '', // dodaję obsługę usage
                    dueDate: props.editedBill.dueDate,
                    paymentDate: props.editedBill.paymentDate,
                    period: props.editedBill.period,
                    description: props.editedBill.description || '',
                    whoPaidId: props.editedBill.whoPaid.userId,
                    isPaid: props.editedBill.isPaid
                });
                setExistingAttachments(props.editedBill.attachments || []);
            } else {
                // Reset formularza dla nowego rachunku
                const currentDate = new Date();
                const currentMonth = currentDate.getFullYear() + "-" + String(currentDate.getMonth() + 1).padStart(2, '0');

                setFormData({
                    billTypeId: 0,
                    amount: '',
                    usage: '', // resetuj usage
                    dueDate: new Date(),
                    paymentDate: null,
                    period: currentMonth,
                    description: '',
                    whoPaidId: 0,
                    isPaid: false
                });
                setExistingAttachments([]);
            }
            setSelectedFiles([]);
            setError(null);
        }
    }, [props.creatingController.openDialogStatus, props.editedBill]);

    const loadCreateDetails = async () => {
        try {
            const details = await getCreateBillDetails();
            props.setCreateBillDetails(details);

            // Ustaw domyślnego płacącego jeśli nie jest wybrany
            if (formData.whoPaidId === 0 && details.whoPaidLists.length > 0) {
                setFormData(prev => ({...prev, whoPaidId: details.whoPaidLists[0].userId}));
            }
        } catch (error) {
            console.error('Błąd podczas ładowania danych:', error);
        }
    };

    const handleClose = () => {
        props.creatingController.closeDialog();
        props.setEditedBill(null);
        setError(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const removeSelectedFile = (indexToRemove: number) => {
        setSelectedFiles(files => files.filter((_, index) => index !== indexToRemove));
    };

    const removeExistingAttachment = (attachmentId: number) => {
        setExistingAttachments(attachments =>
            attachments.filter(attachment => attachment.id !== attachmentId)
        );
    };

    const validateForm = () => {
        if (!formData.billTypeId) {
            setError('Wybierz typ rachunku');
            return false;
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('Podaj prawidłową kwotę');
            return false;
        }
        if (!formData.whoPaidId) {
            setError('Wybierz płacącego');
            return false;
        }
        if (!formData.period.trim()) {
            setError('Podaj okres rozliczeniowy');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setUploading(true);
        setError(null);

        try {
            // Wyraźnie konwertuj typy dla API
            const paymentDateForAPI: Date | undefined = formData.paymentDate === null ? undefined : formData.paymentDate;

            const billData = {
                billTypeId: formData.billTypeId,
                amount: parseFloat(formData.amount),
                usage: formData.usage ? parseFloat(formData.usage) : undefined, // dodaję usage
                dueDate: formData.dueDate,
                paymentDate: paymentDateForAPI,
                period: formData.period,
                description: formData.description || undefined,
                whoPaidId: formData.whoPaidId,
                isPaid: formData.isPaid
            };

            let savedBill: Bill;

            if (props.editedBill) {
                // Aktualizacja istniejącego rachunku
                savedBill = await updateBill({
                    ...billData,
                    id: props.editedBill.id
                });
            } else {
                // Tworzenie nowego rachunku
                savedBill = await createBill(billData);
            }

            // Upload załącznika jeśli został wybrany
            if (selectedFiles.length > 0) {
                for (const file of selectedFiles) {
                    await uploadBillAttachment(savedBill.id, file);
                }
            }

            props.reloadTable();
            handleClose();
        } catch (error) {
            console.error('Błąd podczas zapisywania rachunku:', error);
            setError('Wystąpił błąd podczas zapisywania rachunku');
        } finally {
            setUploading(false);
        }
    };

    const getBillTypeIcon = (billType: any) => {
        return billType.icon || '📄';
    };

    // Funkcja do pobierania jednostki dla wybranego typu rachunku
    const getSelectedBillTypeUnit = () => {
        const selectedType = props.createBillDetails?.billTypes.find(type => type.id === formData.billTypeId);
        return selectedType?.unit || '';
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Dialog
                open={props.creatingController.openDialogStatus}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        overflow: 'hidden'
                    }
                }}
            >
                {/* Niestandardowy nagłówek z gradientem */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        position: 'relative'
                    }}
                >
                    <DialogTitle sx={{
                        pb: 3,
                        pt: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        fontSize: '1.5rem',
                        fontWeight: 600
                    }}>
                        <Receipt sx={{fontSize: 32}}/>
                        {props.editedBill ? 'Edytuj rachunek' : 'Dodaj nowy rachunek'}
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 16,
                                top: 16,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <Close/>
                        </IconButton>
                    </DialogTitle>

                    {uploading && (
                        <LinearProgress
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 3
                            }}
                        />
                    )}
                </Box>

                <DialogContent sx={{p: 3, backgroundColor: '#f8fafc'}}>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                                '& .MuiAlert-icon': {
                                    fontSize: 24
                                }
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Stack spacing={3}>
                        {/* Sekcja: Podstawowe informacje */}
                        <Card sx={{borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                            <CardContent sx={{p: 3}}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Receipt color="primary"/>
                                    <Typography variant="h6" fontWeight={600}>
                                        Podstawowe informacje
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Typ rachunku</InputLabel>
                                            <Select
                                                value={formData.billTypeId}
                                                label="Typ rachunku"
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    billTypeId: e.target.value as number
                                                })}
                                                sx={{
                                                    borderRadius: 2,
                                                    '& .MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        minHeight: '40px !important'
                                                    }
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            '& .MuiMenuItem-root': {
                                                                minHeight: 56,
                                                                maxHeight: 56,
                                                                height: 56
                                                            }
                                                        }
                                                    }
                                                }}
                                            >
                                                {props.createBillDetails?.billTypes.map((type) => (
                                                    <MenuItem
                                                        key={type.id}
                                                        value={type.id}
                                                        sx={{
                                                            height: 56,
                                                            minHeight: 56,
                                                            maxHeight: 56,
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            gap={2}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                overflow: 'hidden'
                                                            }}
                                                        >
                                                            <Avatar sx={{
                                                                width: 32,
                                                                height: 32,
                                                                fontSize: 16,
                                                                bgcolor: 'primary.light',
                                                                color: 'primary.contrastText',
                                                                flexShrink: 0
                                                            }}>
                                                                {getBillTypeIcon(type)}
                                                            </Avatar>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    flexGrow: 1,
                                                                    textOverflow: 'ellipsis',
                                                                    overflow: 'hidden',
                                                                    whiteSpace: 'nowrap'
                                                                }}
                                                            >
                                                                {type.name}
                                                            </Typography>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Kwota"
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                            InputProps={{
                                                startAdornment: <Euro sx={{color: 'action.active', mr: 1}}/>,
                                                endAdornment: <Typography variant="body2"
                                                                          color="text.secondary">PLN</Typography>
                                            }}
                                            fullWidth
                                            sx={{'& .MuiOutlinedInput-root': {borderRadius: 2}}}
                                        />
                                    </Grid>

                                    {/* Zużycie - zawsze widoczne, ale disabled gdy brak typu lub jednostki */}
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Zużycie"
                                            type="number"
                                            value={formData.usage}
                                            onChange={(e) => setFormData({...formData, usage: e.target.value})}
                                            disabled={!formData.billTypeId || !getSelectedBillTypeUnit()}
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {getSelectedBillTypeUnit() || 'jednostka'}
                                                    </Typography>
                                                )
                                            }}
                                            placeholder={getSelectedBillTypeUnit() ? `np. 280 ${getSelectedBillTypeUnit()}` : 'Wybierz typ rachunku'}
                                            fullWidth
                                            sx={{'& .MuiOutlinedInput-root': {borderRadius: 2}}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Okres rozliczeniowy"
                                            value={formData.period}
                                            onChange={(e) => setFormData({...formData, period: e.target.value})}
                                            placeholder="np. 2025-01, Q1 2025"
                                            InputProps={{
                                                startAdornment: <CalendarToday sx={{color: 'action.active', mr: 1}}/>
                                            }}
                                            fullWidth
                                            sx={{'& .MuiOutlinedInput-root': {borderRadius: 2}}}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Sekcja: Terminy i płatności */}
                        <Card sx={{borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                            <CardContent sx={{p: 3}}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <CalendarToday color="primary"/>
                                    <Typography variant="h6" fontWeight={600}>
                                        Terminy i płatności
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="Termin płatności"
                                            value={formData.dueDate}
                                            onChange={(date) => setFormData({...formData, dueDate: date || new Date()})}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    sx: {'& .MuiOutlinedInput-root': {borderRadius: 2}}
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="Data płatności (opcjonalnie)"
                                            value={formData.paymentDate}
                                            onChange={(date) => setFormData({...formData, paymentDate: date})}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    sx: {'& .MuiOutlinedInput-root': {borderRadius: 2}}
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Kto płaci</InputLabel>
                                            <Select
                                                value={formData.whoPaidId}
                                                label="Kto płaci"
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    whoPaidId: e.target.value as number
                                                })}
                                                sx={{borderRadius: 2}}
                                            >
                                                {props.createBillDetails?.whoPaidLists.map((user) => (
                                                    <MenuItem key={user.userId} value={user.userId}>
                                                        <Box display="flex" alignItems="center" gap={2}>
                                                            <Person color="action"/>
                                                            {user.userName}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                border: formData.isPaid ? '2px solid #4caf50' : '1px solid #e0e0e0',
                                                backgroundColor: formData.isPaid ? '#f1f8e9' : 'transparent',
                                                transition: 'all 0.3s ease',
                                                userSelect: 'none' // Wyłączenie zaznaczania tekstu
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formData.isPaid}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            isPaid: e.target.checked
                                                        })}
                                                        icon={<CheckCircle sx={{opacity: 0.3}}/>}
                                                        checkedIcon={<CheckCircle color="success"/>}
                                                    />
                                                }
                                                label={
                                                    <Box display="flex" alignItems="center" gap={1}
                                                         sx={{userSelect: 'none'}}>
                                                        <Typography variant="body1"
                                                                    fontWeight={formData.isPaid ? 600 : 400}
                                                                    sx={{userSelect: 'none'}}>
                                                            Rachunek opłacony
                                                        </Typography>
                                                        {formData.isPaid && (
                                                            <Chip
                                                                label="OPŁACONY"
                                                                color="success"
                                                                size="small"
                                                                sx={{fontWeight: 600, userSelect: 'none'}}
                                                            />
                                                        )}
                                                    </Box>
                                                }
                                                sx={{userSelect: 'none'}}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Sekcja: Dodatkowe informacje */}
                        <Card sx={{borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                            <CardContent sx={{p: 3}}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Description color="primary"/>
                                    <Typography variant="h6" fontWeight={600}>
                                        Dodatkowe informacje
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Opis rachunku"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            placeholder="Np. dodatkowe uwagi, numer faktury..."
                                            multiline
                                            rows={3}
                                            fullWidth
                                            sx={{'& .MuiOutlinedInput-root': {borderRadius: 2}}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper
                                            sx={{
                                                p: 3,
                                                borderRadius: 2,
                                                border: '2px dashed #ccc',
                                                textAlign: 'center',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    backgroundColor: 'action.hover'
                                                }
                                            }}
                                        >
                                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                                Załącznik rachunku
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mb={2}>
                                                Dodaj zdjęcie lub PDF rachunku
                                            </Typography>

                                            {selectedFiles.length > 0 ? (
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                                        Wybrane pliki do uploadu:
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                                        {selectedFiles.map((file, index) => (
                                                            <Chip
                                                                key={index}
                                                                icon={<AttachFile/>}
                                                                label={file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
                                                                color="primary"
                                                                variant="outlined"
                                                                onDelete={() => removeSelectedFile(index)}
                                                                deleteIcon={<Close/>}
                                                                sx={{mb: 1}}
                                                            />
                                                        ))}
                                                    </Stack>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        startIcon={<CloudUpload/>}
                                                        sx={{borderRadius: 2, mr: 1}}
                                                    >
                                                        Dodaj więcej plików
                                                        <input
                                                            type="file"
                                                            hidden
                                                            multiple
                                                            accept="image/*,.pdf"
                                                            onChange={handleFileChange}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        color="error"
                                                        onClick={() => setSelectedFiles([])}
                                                        sx={{borderRadius: 2}}
                                                    >
                                                        Usuń wszystkie
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    startIcon={<CloudUpload/>}
                                                    size="large"
                                                    sx={{borderRadius: 2}}
                                                >
                                                    Wybierz pliki
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="image/*,.pdf"
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                            )}

                                            {/* Wyświetlanie istniejących załączników */}
                                            {existingAttachments.length > 0 && (
                                                <Box mt={3}>
                                                    <Divider sx={{mb: 2}}/>
                                                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                                        Istniejące załączniki:
                                                    </Typography>
                                                    <Stack spacing={1}>
                                                        {existingAttachments.map((attachment) => (
                                                            <Paper
                                                                key={attachment.id}
                                                                sx={{
                                                                    p: 2,
                                                                    borderRadius: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    border: '1px solid #e0e0e0',
                                                                    backgroundColor: 'background.paper',
                                                                    transition: 'all 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: 'action.hover'
                                                                    }
                                                                }}
                                                            >
                                                                <Box display="flex" alignItems="center" gap={2}>
                                                                    <Avatar sx={{
                                                                        width: 32,
                                                                        height: 32,
                                                                        bgcolor: attachment.fileType === 'pdf' ? 'error.light' : 'info.light'
                                                                    }}>
                                                                        <AttachFile sx={{fontSize: 16}}/>
                                                                    </Avatar>
                                                                    <Box>
                                                                        <Typography variant="body2" color="text.primary"
                                                                                    fontWeight={500}>
                                                                            {attachment.fileName}
                                                                        </Typography>
                                                                        <Typography variant="caption"
                                                                                    color="text.secondary">
                                                                            {attachment.fileType.toUpperCase()}
                                                                            {attachment.uploadedAt && ` • ${attachment.uploadedAt.toLocaleDateString('pl-PL')}`}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box display="flex" gap={1}>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => {
                                                                            // Otwórz załącznik w nowej karcie
                                                                            window.open(attachment.fileUrl, '_blank');
                                                                        }}
                                                                        sx={{
                                                                            color: 'primary.main',
                                                                            '&:hover': {
                                                                                backgroundColor: 'primary.light',
                                                                                color: 'primary.contrastText'
                                                                            }
                                                                        }}
                                                                    >
                                                                        <AttachFile sx={{fontSize: 16}}/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => {
                                                                            if (attachment.id && window.confirm(`Czy na pewno chcesz usunąć załącznik "${attachment.fileName}"?`)) {
                                                                                removeExistingAttachment(attachment.id);
                                                                            }
                                                                        }}
                                                                        sx={{
                                                                            color: 'error.main',
                                                                            '&:hover': {
                                                                                backgroundColor: 'error.light',
                                                                                color: 'error.contrastText'
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Close sx={{fontSize: 16}}/>
                                                                    </IconButton>
                                                                </Box>
                                                            </Paper>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            )}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Stack>
                </DialogContent>

                <Divider/>

                <DialogActions sx={{p: 3, gap: 2}}>
                    <Button
                        onClick={handleClose}
                        disabled={uploading}
                        variant="outlined"
                        size="large"
                        sx={{borderRadius: 2, minWidth: 120}}
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={uploading}
                        size="large"
                        sx={{
                            borderRadius: 2,
                            minWidth: 120,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            }
                        }}
                    >
                        {uploading ? 'Zapisywanie...' : (props.editedBill ? 'Zapisz zmiany' : 'Dodaj rachunek')}
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}
