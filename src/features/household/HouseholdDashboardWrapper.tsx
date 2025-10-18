'use client'

import {useEffect, useState} from "react"
import {HouseholdInvitedMember, HouseholdMember} from "./api/HouseholdModel";
import HouseholdDashboard from "./HouseholdDashboard";
import HouseholdNotExists from "./components/HouseholdCreatingComponent";
import {getInvitedMembers, getMembers} from "./api/HouseholdService";
import {CreateHouseholdValidationConstraints} from "../../validator/ValidationModel";

interface Props {
    initialMembers: HouseholdMember[]
    initialInvitedMembers: HouseholdInvitedMember[]
    householdValidationConstraints: CreateHouseholdValidationConstraints
}

export default function HouseholdDashboardWrapper(props: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [members, setMembers] = useState(props.initialMembers)
    const [invitedMembers, setInvitedMembers] = useState(props.initialInvitedMembers)

    const reloadTable = () => {
        setReloadKey(prev => prev + 1)
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

    if (members.length === 0) {
        return (
            <HouseholdNotExists
                householdValidationConstraints={props.householdValidationConstraints}
                reloadTable={reloadTable}
            />
        )
    }

    return (
        <HouseholdDashboard
            householdMembers={members}
            householdInviteMembers={invitedMembers}
            reloadTable={reloadTable}
            householdValidationConstraints={props.householdValidationConstraints}
        />
    )
}
