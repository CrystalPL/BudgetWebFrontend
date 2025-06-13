'use client'
import {useEffect, useState} from "react";
import ReceiptDashboard from "./ReceiptDashboard";
import {Receipt} from "./api/ReceiptModel";

interface Props {
    receipts: Receipt[]
}

export default function ReceiptDashboardWrapper(props: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [receipts, setReceipts] = useState(props.receipts)

    const reloadTable = () => {
        setReloadKey(prev => prev + 1)
    }

    useEffect(() => {
        async function fetchData() {
            setReceipts([])
        }

        if (reloadKey != 0) {
            fetchData()
        }

    }, [reloadKey])

    return <ReceiptDashboard receipts={receipts} reloadTable={reloadTable}/>
}