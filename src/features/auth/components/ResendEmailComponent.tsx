'use client';
import Button from '@mui/material/Button';
import {Alert} from "@mui/material";
import React, {useEffect, useState} from "react";
import {resendEmail} from "../api/AuthenticationService";

interface ResendEmailButtonProps {
    children: React.ReactNode;
}

export const ResendEmailButton: React.FC<ResendEmailButtonProps> = ({ children }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState<'success' | 'error'>();
    const [statusMessage, setStatusMessage] = useState<string>("");

    useEffect(() => {
        const storedTimeString = localStorage.getItem('resendEmailTime');
        if (storedTimeString === null) {
            return
        }

        const storedTime = parseInt(storedTimeString, 10);
        if (isNaN(storedTime)) {
            localStorage.removeItem('resendEmailTime');
            return
        }

        const currentTime = Date.now();
        if (storedTime > currentTime) {
            setTimeLeft((storedTime - currentTime) / 1000);
            setIsDisabled(true);
            return
        }

        localStorage.removeItem('resendEmailTime');
    }, []);

    const handleResendConfirmationEmail = async () => {
        const resendEmailResponse = await resendEmail();
        setStatus(resendEmailResponse.success ? 'success' : 'error')
        setStatusMessage(resendEmailResponse.message)

        setIsDisabled(true);
        setTimeLeft(60);
        localStorage.setItem('resendEmailTime', String(Date.now() + 60 * 1000));
    };

    useEffect(() => {
        if (!isDisabled) {
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setIsDisabled(false);
                    localStorage.removeItem('resendEmailTime');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isDisabled]);

    return (
        <>
            {statusMessage && (
                <Alert sx={{mt: 2}} severity={status}>{statusMessage}</Alert>
            )}
            {children}
            <Button
                fullWidth
                onClick={handleResendConfirmationEmail}
                variant="contained"
                sx={{mt: 2, mb: 2}}
                disabled={isDisabled}
            >
                {isDisabled
                    ? `Poczekaj ${Math.floor(timeLeft)} sekund przed ponownym wysłaniem`
                    : 'Wyślij ponownie e-maila'}
            </Button>
        </>
    );
};
