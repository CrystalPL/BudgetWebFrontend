import * as React from "react";
import {useState} from "react";
import {AIReceipt} from "../api/ReceiptModel";
import {uploadFotoToAI} from "../api/ReceiptService";

export interface AILoaderProps {
    aiReceipt: AIReceipt | null;
    loadAiReceipts: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AILoader(): AILoaderProps {
    const [aiReceipt, setAiReceipt] = useState<AIReceipt | null>(null);

    const loadAIDataByPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            await uploadFotoToAI(formData)
            // setAiReceipt(null)
        }
    };

    return {
        aiReceipt,
        loadAiReceipts: loadAIDataByPhoto
    }
}