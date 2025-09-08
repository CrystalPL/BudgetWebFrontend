import {API_URL, handleDeleteRequest, handlePostRequest, ResponseAPI} from "@/service/ResponseAPI";
import {
    ChangeHouseholdNameMessage,
    ChangeUserRoleMessage,
    CreateHouseholdMessage,
    DeleteHouseholdMessage,
    DeleteUserMessage,
    InviteUserToHousehold,
    LeaveHouseholdMessage,
    TransferOwnerMessage,
    UndoInvitationMessage
} from "@/features/household/api/HouseholdMessage";
import axios from "axios";
import {ChangeUserRole, HouseholdInvitedMember, HouseholdMember} from "@/features/household/api/HouseholdModel";

export async function createHousehold(name: string): Promise<ResponseAPI<CreateHouseholdMessage>> {
    return handlePostRequest<typeof CreateHouseholdMessage>("/household/create", {name}, CreateHouseholdMessage);
}

export async function getMembers(cookie?: string): Promise<HouseholdMember[]> {
    const response = await axios.get<HouseholdMember[]>(API_URL + "/household/getMembers", {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    })

    return response.data
}

export async function getInvitedMembers(cookie?: string): Promise<HouseholdInvitedMember[]> {
    const response = await axios.get(API_URL + "/household/invitations/getInvitedUsers", {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    })

    return response.data.map((member: any) => ({
        userId: member.userId,
        email: member.email,
        invitedTime: new Date(member.invitedTime),
    }));
}

export async function undoInvitation(memberId: number | undefined): Promise<ResponseAPI<UndoInvitationMessage>> {
    return handlePostRequest<typeof UndoInvitationMessage>("/household/invitations/undo", {memberId}, UndoInvitationMessage);
}

export async function inviteMember(email: string): Promise<ResponseAPI<InviteUserToHousehold>> {
    return handlePostRequest<typeof InviteUserToHousehold>("/household/invitations/invite", {email}, InviteUserToHousehold);
}

export async function getRoles() {
    const response = await axios.get<ChangeUserRole[]>(API_URL + "/household/roles/changeRole", {withCredentials: true,})

    return response.data.map((member: any) => ({
        roleId: member.id,
        roleName: member.name,
    }));
}

export async function changeRole(memberId: number | undefined, roleId: number) {
    return handlePostRequest<typeof ChangeUserRoleMessage>("/household/roles/changeRole", {
        memberId,
        roleId
    }, ChangeUserRoleMessage);
}

export async function deleteUser(memberId: number | undefined) {
    return handleDeleteRequest<typeof DeleteUserMessage>(`/household/deleteMember/${memberId}`, {}, DeleteUserMessage);
}

export async function changeHouseholdName(householdName: string) {
    return handlePostRequest<typeof ChangeHouseholdNameMessage>("/household/changeName", {householdName}, ChangeHouseholdNameMessage);
}

export async function deleteHouseholdRequest(): Promise<ResponseAPI<DeleteHouseholdMessage>> {
    return handleDeleteRequest<typeof DeleteHouseholdMessage>("/household/delete", {}, DeleteHouseholdMessage);
}

export async function leaveHousehold() {
    return handlePostRequest<typeof LeaveHouseholdMessage>("/household/leave", {}, LeaveHouseholdMessage);
}

export async function transferHouseholdOwner(memberId: number | undefined) {
    return handlePostRequest<typeof TransferOwnerMessage>("/household/transferOwner", {memberId}, TransferOwnerMessage);
}