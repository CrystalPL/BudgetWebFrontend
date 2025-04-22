export const Permission = {
    HOUSEHOLD_DELETE: "Usuwanie gospodarstwa domowego",
    HOUSEHOLD_CHANGE_NAME: "Zmiana nazwy gospodarstwa",
    HOUSEHOLD_LOGS: "Podgląd logów",

    HOUSEHOLD_MEMBER_INVITE: "Zapraszanie członków",
    HOUSEHOLD_MEMBER_CANCEL_INVITATION: "Anulowanie zaproszenia",
    HOUSEHOLD_MEMBER_DELETE: "Usuwanie członków",

    ROLE_CHANGE: "Zmiana roli użytkownika",
    ROLE_CREATE: "Tworzenie ról",
    ROLE_DELETE: "Usuwanie ról",
    ROLE_EDIT: "Edycja ról",
    ROLE_MAKE_DEFAULT: "Ustawianie roli jako domyślnej",

    ROLE_PERMISSIONS_VIEW: "Podgląd uprawnień ról",
    ROLE_PERMISSIONS_EDIT: "Edycja uprawnień ról"
} as const;

export type PermissionKey = keyof typeof Permission;

export interface GroupPermission {
    id: number;
    name: string;
    permissions: PermissionKey[];
}

export const roles: GroupPermission[] = [
    {
        id: 1,
        name: "Gospodarstwo domowe",
        permissions: [
            "HOUSEHOLD_DELETE",
            "HOUSEHOLD_CHANGE_NAME",
            "HOUSEHOLD_LOGS",
        ]
    },
    {
        id: 2,
        name: "Członkowie gospodarstwa",
        permissions: [
            "HOUSEHOLD_MEMBER_INVITE",
            "HOUSEHOLD_MEMBER_CANCEL_INVITATION",
            "HOUSEHOLD_MEMBER_DELETE"
        ]
    },
    {
        id: 3,
        name: "Role",
        permissions: [
            "ROLE_CREATE",
            "ROLE_EDIT",
            "ROLE_DELETE",
            "ROLE_CHANGE",
            "ROLE_MAKE_DEFAULT"
        ]
    },
    {
        id: 4,
        name: "Uprawnienia ról",
        permissions: [
            "ROLE_PERMISSIONS_VIEW",
            "ROLE_PERMISSIONS_EDIT"
        ]
    }
];