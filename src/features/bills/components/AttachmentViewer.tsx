'use client'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {Close, Download} from "@mui/icons-material";
import {useState} from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    attachment: {
        url: string;
        name: string;
        type: string;
    } | null;
}

export default function AttachmentViewer(props: Props) {
    const [imageError, setImageError] = useState(false);

    if (!props.attachment) {
        return null;
    }

    const {url, name, type} = props.attachment;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderContent = () => {
        if (type === 'image' && !imageError) {
            return (
                <Box
                    component="img"
                    src={url}
                    alt={name}
                    sx={{
                        maxWidth: '100%',
                        maxHeight: '70vh',
                        objectFit: 'contain'
                    }}
                    onError={() => setImageError(true)}
                />
            );
        }

        if (type === 'pdf') {
            return (
                <Box sx={{width: '100%', height: '70vh'}}>
                    <iframe
                        src={url}
                        width="100%"
                        height="100%"
                        style={{border: 'none'}}
                        title={name}
                    />
                </Box>
            );
        }

        // Fallback dla innych typów plików lub błędów
        return (
            <Box sx={{textAlign: 'center', py: 4}}>
                <Typography variant="h6" gutterBottom>
                    Podgląd niedostępny
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Typ pliku: {type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Kliknij "Pobierz" aby otworzyć plik
                </Typography>
            </Box>
        );
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {minHeight: '60vh'}
            }}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" component="div" noWrap>
                    {name}
                </Typography>
                <IconButton onClick={props.onClose} size="small">
                    <Close/>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {renderContent()}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleDownload}
                    startIcon={<Download/>}
                    variant="outlined"
                >
                    Pobierz
                </Button>
                <Button onClick={props.onClose} variant="contained">
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
}
