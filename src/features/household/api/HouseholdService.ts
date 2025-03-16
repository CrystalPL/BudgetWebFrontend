import {API_URL, handleDeleteRequest, handleRequest, ResponseAPI} from "@/service/ResponseAPI";
import {
    ChangeHouseholdNameMessage,
    CreateHouseholdMessage,
    DeleteHouseholdMessage,
    DeleteUserMessage,
    EditUserRoleMessage,
    InviteUserToHousehold,
    LeaveHouseholdMessage,
    TransferOwnerMessage,
    UndoInvitationMessage
} from "@/features/household/api/HouseholdMessage";
import axios from "axios";
import {EditUserRole, HouseholdInvitedMember, HouseholdMember} from "@/features/household/api/HouseholdModel";

export async function createHousehold(name: string): Promise<ResponseAPI<CreateHouseholdMessage>> {
    return handleRequest<typeof CreateHouseholdMessage>("/household/create", {name}, CreateHouseholdMessage);
}

export async function getMembers(): Promise<HouseholdMember[]> {
    const response = await axios.get<HouseholdMember[]>(API_URL + "/household/getMembers", {withCredentials: true,})

    return response.data
}

export async function getInvitedMembers(): Promise<HouseholdInvitedMember[]> {
    const response = await axios.get(API_URL + "/household/invitations/getInvitedUsers", {withCredentials: true,})

    return response.data.map((member: any) => ({
        userId: member.userId,
        email: member.email,
        invitedTime: new Date(member.invitedTime),
    }));
}

export async function undoInvitation(memberId: number | undefined): Promise<ResponseAPI<UndoInvitationMessage>> {
    return handleRequest<typeof UndoInvitationMessage>("/household/invitations/undo", {memberId}, UndoInvitationMessage);
}

export async function inviteMember(email: string): Promise<ResponseAPI<InviteUserToHousehold>> {
    return handleRequest<typeof InviteUserToHousehold>("/household/invitations/invite", {email}, InviteUserToHousehold);
}

export async function getRoles() {
    const response = await axios.get<EditUserRole[]>(API_URL + "/household/roles", {withCredentials: true,})

    return response.data
}

export async function editRole(memberId: number | undefined, roleId: number) {
    return handleRequest<typeof EditUserRoleMessage>("/household/roles/editRole", {
        memberId,
        roleId
    }, EditUserRoleMessage);
}

export async function deleteUser(memberId: number | undefined) {
    return handleDeleteRequest<typeof DeleteUserMessage>(`/household/deleteMember/${memberId}`, DeleteUserMessage);
}

export async function changeHouseholdName(householdName: string) {
    return handleRequest<typeof ChangeHouseholdNameMessage>("/household/changeName", {householdName}, ChangeHouseholdNameMessage);
}

export async function deleteHouseholdRequest(): Promise<ResponseAPI<DeleteHouseholdMessage>> {
    return handleDeleteRequest<typeof DeleteHouseholdMessage>("/household/delete", DeleteHouseholdMessage);
}

export async function leaveHousehold() {
    return handleRequest<typeof LeaveHouseholdMessage>("/household/leave", {}, LeaveHouseholdMessage);
}

export async function transferHouseholdOwner(memberId: number | undefined) {
    return handleRequest<typeof TransferOwnerMessage>("/household/transferOwner", {memberId}, TransferOwnerMessage);
}