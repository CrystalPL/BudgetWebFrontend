'use client'
import {useEffect, useState} from "react";
import BillMainDashboard from "./BillMainDashboard";
import {Bill} from "../api/BillModel";
import {getBills} from "../api/BillService";

interface BillMainDashboardLoaderProps {
    bills: Bill[]
}

export default function BillMainDashboardLoader(props: BillMainDashboardLoaderProps) {
    const [reloadKey, setReloadKey] = useState(0)
    const [bills, setBills] = useState(props.bills)

    const reloadTable = () => {
        setReloadKey(prev => prev + 1)
    }

    useEffect(() => {
        async function fetchData() {
            setBills(await getBills())
        }

        if (reloadKey != 0) {
            fetchData()
        }

    }, [reloadKey])

    return <BillMainDashboard bills={bills} reloadTable={reloadTable}/>
}
