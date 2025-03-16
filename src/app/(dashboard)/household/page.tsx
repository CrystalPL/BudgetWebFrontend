'use client'
import HouseholdNotExists from "../../../features/household/components/HouseholdCreatingComponent";
import {useEffect, useState} from "react";
import {getInvitedMembers, getMembers} from "../../../features/household/api/HouseholdService";
import TableSkeleton from "../../../features/household/components/base/HouseholdTableSkeleton";
import HouseholdDashboard from "../../../features/household/HouseholdDashboard";
import {HouseholdInvitedMember, HouseholdMember} from "../../../features/household/api/HouseholdModel";

export default function HouseholdDashboardPage() {
    const [reloadKey, setReloadKey] = useState(0)
    const [members, setMembers] = useState<HouseholdMember[]>()
    const [invitedMembers, setInvitedMembers] = useState<HouseholdInvitedMember[]>()

    const reloadTable = () => {
        setReloadKey(reloadKey + 1);
    }

    useEffect(() => {
        async function fetchMembers() {
            setMembers(await getMembers());
            setInvitedMembers(await getInvitedMembers());
        }

        fetchMembers();
    }, [reloadKey]);

    if (!members || !invitedMembers) {
        return <TableSkeleton></TableSkeleton>
    }

    if (members.length !== 0) {
        return <HouseholdDashboard householdMembers={members}
                                   householdInviteMembers={invitedMembers}
                                   reloadTable={reloadTable}></HouseholdDashboard>;
    } else {
        return <HouseholdNotExists reloadTable={reloadTable}></HouseholdNotExists>
    }
}