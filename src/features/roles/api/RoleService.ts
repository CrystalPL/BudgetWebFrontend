import axios from "axios";
import {
    API_URL,
    handleDeleteRequest,
    handleGetRequest,
    handlePatchRequest,
    handlePostRequest
} from "@/service/ResponseAPI";
import {
    CreateRoleMessages,
    DeleteRoleMessage,
    EditRoleMessage,
    GetRolePermissionMessages,
    MakeRoleDefaultMessage
} from "@/features/roles/api/RoleMessages";

import {EditRoleRequest, Role} from "@/features/roles/api/RoleModel";
import {PermissionKey} from "@/features/roles/api/RolePermissions";

export async function getRoles(cookie?: string) {
    const response = await axios.get<Role[]>(API_URL + "/household/roles/roleList", {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    })

    return response.data
}

// export async function getRolePermissions(roleId: number, cookie?: string) {
//     const response = await axios.get<PermissionKey[]>(API_URL + `/household/roles/permissions/${roleId}`, {
//         withCredentials: true,
//         headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
//     })
//
//     return response.data
// }

export interface Permissions {
    permissions: PermissionKey[];
}

export async function getPermissions(roleId: number, cookie?: string) {
    return handleGetRequest<typeof GetRolePermissionMessages, Permissions>(`/household/roles/permissions/${roleId}`, GetRolePermissionMessages, {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    });
}

export async function savePermissions(roleId: number, permissions: PermissionKey[]) {
    return handlePatchRequest<typeof EditRoleMessage>("/household/roles/permissions/save", {
        roleId,
        permissions
    }, EditRoleMessage);
}

export async function makeRoleDefault(roleId: number) {
    return handlePostRequest<typeof MakeRoleDefaultMessage>("/household/roles/makeDefault", {roleId}, MakeRoleDefaultMessage);
}

export async function createRole(name: string, color: string) {
    return handlePostRequest<typeof CreateRoleMessages>("/household/roles/create", {name, color}, CreateRoleMessages);
}

export async function deleteRole(roleId: number | undefined) {
    return handleDeleteRequest<typeof DeleteRoleMessage>(`/household/roles/delete`, {roleId}, DeleteRoleMessage);
}

export async function editRole(request: EditRoleRequest) {
    return handlePatchRequest<typeof EditRoleMessage>("/household/roles/edit", request, EditRoleMessage);
}