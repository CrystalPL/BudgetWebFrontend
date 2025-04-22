import {getInvitedMembers, getMembers} from "../../../features/household/api/HouseholdService";
import {HouseholdInvitedMember} from "../../../features/household/api/HouseholdModel";
import HouseholdDashboardWrapper from "../../../features/household/HouseholdDashboardWrapper";
import {getCookie} from "../../../util/CookieUtil";

export default async function page() {
    const members = await getMembers(getCookie())
    const invitedMembers: HouseholdInvitedMember[] = await getInvitedMembers(getCookie())

    return (
        <HouseholdDashboardWrapper
            initialMembers={members}
            initialInvitedMembers={invitedMembers}
        />
    );
}