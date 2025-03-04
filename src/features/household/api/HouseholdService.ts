import {API_URL, handleRequest, ResponseAPI} from "@/service/ResponseAPI";
import {
    CreateHouseholdMessage,
    InviteUserToHousehold,
    UndoInvitationMessage
} from "@/features/household/api/HouseholdMessage";
import axios from "axios";
import {HouseholdInvitedMember, HouseholdMember} from "@/features/household/api/HouseholdModel";

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

export async function undoInvitation(memberId: number): Promise<ResponseAPI<UndoInvitationMessage>> {
    return handleRequest<typeof UndoInvitationMessage>("/household/invitations/undo", {memberId}, UndoInvitationMessage);
}

export async function inviteMember(email: string): Promise<ResponseAPI<InviteUserToHousehold>> {
    return handleRequest<typeof InviteUserToHousehold>("/household/invitations/invite", {email}, InviteUserToHousehold);
}