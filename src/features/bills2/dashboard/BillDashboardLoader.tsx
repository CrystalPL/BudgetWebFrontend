'use client'
import {useEffect, useState} from "react";
import {Bill} from "../../bills/api/BillModel";
import {getBills} from "../../bills/api/BillService";
import BillDashboard from "./BillDashboard";

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

    return <BillDashboard/>
}
