'use client'
import {useEffect, useState} from "react";
import ReceiptDashboard from "./ReceiptDashboard";
import {Receipt} from "../api/ReceiptModel";
import {getReceipts} from "../api/ReceiptService";

interface Props {
    receipts: Receipt[]
}

export default function ReceiptDashboardLoader(props: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [receipts, setReceipts] = useState(props.receipts)

    const reloadTable = () => {
        setReloadKey(prev => prev + 1)
    }

    useEffect(() => {
        async function fetchData() {
            setReceipts(await getReceipts())
        }

        if (reloadKey != 0) {
            fetchData()
        }

    }, [reloadKey])

    return <ReceiptDashboard receipts={receipts} reloadTable={reloadTable}/>
}