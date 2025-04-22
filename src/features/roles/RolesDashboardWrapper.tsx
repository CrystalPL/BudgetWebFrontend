'use client'
import {useEffect, useState} from "react";
import RolesDashboard from "./RolesDashboard";
import {getRoles} from "./api/RoleService";
import {Role} from "./api/RoleModel";

interface Props {
    roles: Role[]
}

export default function RolesDashboardWrapper(props: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [roles, setRoles] = useState<Role[]>(props.roles)

    const reloadTable = () => {
        setReloadKey(reloadKey + 1);
    }

    useEffect(() => {
        async function fetchRoles() {
            setRoles(await getRoles())
        }

        if (reloadKey != 0) {
            fetchRoles()
        }
    }, [reloadKey]);

    return <RolesDashboard roles={roles} reloadTable={reloadTable}></RolesDashboard>
}
