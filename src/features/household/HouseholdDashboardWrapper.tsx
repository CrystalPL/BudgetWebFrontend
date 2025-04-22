'use client'

import {useEffect, useState} from "react"
import {HouseholdInvitedMember, HouseholdMember} from "./api/HouseholdModel";
import HouseholdDashboard from "./HouseholdDashboard";
import HouseholdNotExists from "./components/HouseholdCreatingComponent";
import {getInvitedMembers, getMembers} from "./api/HouseholdService";

interface Props {
    initialMembers: HouseholdMember[]
    initialInvitedMembers: HouseholdInvitedMember[]
}

export default function HouseholdDashboardWrapper({
                                                      initialMembers,
                                                      initialInvitedMembers,
                                                  }: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [members, setMembers] = useState(initialMembers)
    const [invitedMembers, setInvitedMembers] = useState(initialInvitedMembers)

    const reloadTable = () => {
        setReloadKey(prev => {
            console.log("xd")
            return prev + 1
        })
    }

    useEffect(() => {
        async function fetchData() {
            setMembers(await getMembers())
            setInvitedMembers(await getInvitedMembers())
        }

        if (reloadKey != 0) {
            fetchData()
        }

    }, [reloadKey])

    return members.length !== 0 ? (
        <HouseholdDashboard
            householdMembers={members}
            householdInviteMembers={invitedMembers}
            reloadTable={reloadTable}
        />
    ) : (
        <HouseholdNotExists reloadTable={reloadTable}/>
    )
}
