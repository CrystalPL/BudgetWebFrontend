export interface Role {
    id: number;
    name: string;
    hexColor: string;
    isDefault: boolean;
    isOwnerRole: boolean
}

export interface EditRoleRequest {
    roleId: number;
    name: string;
    color: string;
}