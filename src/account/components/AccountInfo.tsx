'use client';

import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {getAccountInfo, uploadAvatar} from "../AccountService";
import {Alert, Skeleton, Snackbar} from "@mui/material";
import {API_URL} from "../../components/share/ResponseAPI";
import {AccountProps} from "../../app/(dashboard)/profile/page";

export default function AccountInfo({accountProps}: { accountProps: AccountProps }): React.JSX.Element {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const data = await getAccountInfo();
            accountProps.setAccountInfo(data);
            setLoading(false)
        };

        fetchAccountInfo();
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await uploadAvatar(formData);
        setStatus(response.success ? 'success' : 'error');
        setStatusMessage(response.message);
        setReloadKey((prevKey) => prevKey + 1);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={2} sx={{alignItems: 'center'}}>
                    <Box>
                        {loading ? (
                            <Skeleton variant="circular" width={80} height={80}/>
                        ) : (
                            <Avatar key={reloadKey} src={`${API_URL}/account/avatar`}
                                    sx={{height: '80px', width: '80px'}}/>
                        )}
                    </Box>
                    <Stack spacing={1} sx={{textAlign: 'center'}}>
                        {loading ? (
                            <>
                                <Skeleton variant="text" width={150} height={20}/>
                                <Skeleton variant="text" width={150} height={20}/>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5">{accountProps.accountInfo?.nickname}</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    {accountProps.accountInfo?.email}
                                </Typography>
                            </>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
            <Divider/>
            <CardActions>
                <Button onClick={() => inputFile.current?.click()} fullWidth variant="text">
                    <input type='file' id='file' accept=".jpeg,.jpg,.png" ref={inputFile} style={{display: 'none'}}
                           onChange={handleFileChange}/>
                    Wgraj zdjęcie
                </Button>
            </CardActions>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <Alert onClose={handleCloseSnackbar} severity={status} sx={{width: '100%'}}>
                    {statusMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
}
