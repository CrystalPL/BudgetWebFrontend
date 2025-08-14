import {getInvitedMembers, getMembers} from "../../../features/household/api/HouseholdService";
import {HouseholdInvitedMember} from "../../../features/household/api/HouseholdModel";
import HouseholdDashboardWrapper from "../../../features/household/HouseholdDashboardWrapper";
import {getCookie} from "../../../util/CookieUtil";

export default async function page() {
    const cookie = await getCookie()
    const members = await getMembers(cookie)
    const invitedMembers: HouseholdInvitedMember[] = await getInvitedMembers(cookie)

    return (
        <HouseholdDashboardWrapper
            initialMembers={members}
            initialInvitedMembers={invitedMembers}
        />
    );
}