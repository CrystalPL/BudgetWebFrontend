import {getInvitedMembers, getMembers} from "../../../features/household/api/HouseholdService";
import {HouseholdInvitedMember} from "../../../features/household/api/HouseholdModel";
import HouseholdDashboardWrapper from "../../../features/household/HouseholdDashboardWrapper";
import {getCookie} from "../../../util/CookieUtil";
import {getValidators} from "../../../validator/ValidationService";
import {CreateHouseholdValidationConstraints} from "../../../validator/ValidationModel";

export default async function page() {
    const cookie = await getCookie()
    const members = await getMembers(cookie)
    const invitedMembers: HouseholdInvitedMember[] = await getInvitedMembers(cookie)
    const validators = await getValidators<CreateHouseholdValidationConstraints>(['HOUSEHOLD']);

    return (
        <HouseholdDashboardWrapper
            initialMembers={members}
            initialInvitedMembers={invitedMembers}
            householdValidationConstraints={validators}
        />
    );
}