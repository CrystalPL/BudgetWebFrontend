import {getRoles} from "../../../../features/roles/api/RoleService";
import RolesDashboardWrapper from "../../../../features/roles/RolesDashboardWrapper";
import {getCookie} from "../../../../util/CookieUtil";

export default async function Page() {
    const roles = await getRoles(await getCookie());
    return <RolesDashboardWrapper roles={roles}></RolesDashboardWrapper>
}