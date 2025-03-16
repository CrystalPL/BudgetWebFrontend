export interface HouseholdMember {
    userId: number,
    username: String,
    role: HouseholdMemberRole
}

export interface HouseholdMemberRole {
    name: String
    color: string
}

export interface HouseholdInvitedMember {
    userId: number
    email: String
    invitedTime: Date
}

export interface HouseholdReloadKeyProps {
    reloadTable: () => void;
}

export interface EditUserRole {
    roleId: number
    roleName: string
}