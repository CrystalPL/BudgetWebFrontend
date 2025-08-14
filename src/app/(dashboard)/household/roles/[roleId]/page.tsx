import {getPermissions, Permissions} from "../../../../../features/roles/api/RoleService";
import {getCookie} from "../../../../../util/CookieUtil";
import RolePermissionTable from "../../../../../features/roles/RolePermissionTable";
import {ResponseAPI} from "../../../../../service/ResponseAPI";
import {GetRolePermissionMessages} from "../../../../../features/roles/api/RoleMessages";
import PermissionRoleView from "../../../../../features/roles/components/PermissionRoleView";

type PageProps = {
    params: { roleId: string };
};

export default async function Page({params}: any) {
    const roleId = parseInt(params.roleId, 10);
    if (isNaN(roleId)) {
        throw new Error('Invalid role ID');
    }

    const response: ResponseAPI<GetRolePermissionMessages, Permissions> = await getPermissions(roleId, await getCookie())
    console.log(response)
    if (!response.success) {
        return <PermissionRoleView content={response.message}></PermissionRoleView>
    }

    console.log(response.additionalData.permissions)

    return <RolePermissionTable roleId={roleId}
                                rolePermission={response.additionalData.permissions}></RolePermissionTable>
}