import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getAccountInfo} from "../features/account/api/AccountService";

import {AccountInfoResponse} from "../features/account/api/AccountModel";

export function AvatarProvider({children}: { children: ReactNode }) {
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [accountInfo, setAccountInfo] = useState<AccountInfoResponse | null>(null);

    const incrementReloadKey = () => {
        setReloadKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data: AccountInfoResponse = await getAccountInfo();
            setAccountInfo(data);
        };

        fetchUserInfo();
    }, []);

    return (
        <AvatarContext.Provider value={{reloadKey, accountInfo, incrementReloadKey, setAccountInfo}}>
            {children}
        </AvatarContext.Provider>
    );
}

export interface AvatarContextType {
    reloadKey: number;
    accountInfo: AccountInfoResponse | null
    incrementReloadKey: () => void;
    setAccountInfo: (accountInfo: AccountInfoResponse) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function useAvatarContext() {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error('useAvatarContext must be used within an AvatarProvider');
    }
    return context;
}

