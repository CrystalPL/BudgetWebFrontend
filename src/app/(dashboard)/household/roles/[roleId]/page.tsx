import {getPermissions, Permissions} from "../../../../../features/roles/api/RoleService";
import {getCookie} from "../../../../../util/CookieUtil";
import RolePermissionTable from "../../../../../features/roles/RolePermissionTable";
import {ResponseAPI} from "../../../../../service/ResponseAPI";
import {GetRolePermissionMessages} from "../../../../../features/roles/api/RoleMessages";
import PermissionRoleView from "../../../../../features/roles/components/PermissionRoleView";

type PageProps = {
    params: { roleId: number };
};

export default async function page(params: PageProps) {
    const roleId = params.params.roleId;
    const response: ResponseAPI<GetRolePermissionMessages, Permissions> = await getPermissions(roleId, getCookie())
    console.log(response)
    if (!response.success) {
        return <PermissionRoleView content={response.message}></PermissionRoleView>
    }

    console.log(response.additionalData.permissions)

    return <RolePermissionTable roleId={roleId}
                                rolePermission={response.additionalData.permissions}></RolePermissionTable>
}