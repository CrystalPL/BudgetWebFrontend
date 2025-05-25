import React, {useState} from "react";
import {UserWhoPaid} from "../../api/ReceiptModel";

export interface FirstStepFormState {
    shopName: string;
    setShopName: React.Dispatch<React.SetStateAction<string>>;
    shopNameError: string;
    setShopNameError: React.Dispatch<React.SetStateAction<string>>;
    whoPaid: UserWhoPaid | null;
    setWhoPaid: React.Dispatch<React.SetStateAction<UserWhoPaid | null>>;
    whoPaidError: string;
    setWhoPaidError: React.Dispatch<React.SetStateAction<string>>;
    date: Date | null;
    setDate: React.Dispatch<React.SetStateAction<Date | null>>;
    dateError: string;
    setDateError: React.Dispatch<React.SetStateAction<string>>;
    isSettled: boolean;
    setIsSettled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFirstStepFormState(): FirstStepFormState {
    const [shopName, setShopName] = useState<string>('');
    const [shopNameError, setShopNameError] = useState<string>('');
    const [whoPaid, setWhoPaid] = useState<UserWhoPaid | null>(null);
    const [whoPaidError, setWhoPaidError] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [dateError, setDateError] = useState<string>('');
    const [isSettled, setIsSettled] = useState<boolean>(false);

    return {
        shopName,
        setShopName,
        shopNameError,
        setShopNameError,
        whoPaid,
        setWhoPaid,
        whoPaidError,
        setWhoPaidError,
        date,
        setDate,
        dateError,
        setDateError,
        isSettled,
        setIsSettled,
    };
}