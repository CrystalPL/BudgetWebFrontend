'use client'
import {useEffect, useState} from "react";
import BillDashboard from "./BillDashboard";
import {Bill} from "../api/BillModel";
import {getBills} from "../api/BillService";

interface Props {
    bills: Bill[]
}

export default function BillDashboardLoader(props: Props) {
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

    return <BillDashboard bills={bills} reloadTable={reloadTable}/>
}
