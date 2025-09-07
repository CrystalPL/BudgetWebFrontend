'use client'
import {useEffect, useState} from "react";
import BillMainDashboard from "./BillMainDashboard";
import {getBills} from "../api/BillService";
import {Bill} from "../../bills2/api/BillModel";

interface BillMainDashboardLoaderProps {
    bills: Bill[]
}

export default function BillDashboardLoader(props: BillMainDashboardLoaderProps) {
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
