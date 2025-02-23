import {VerifyAccessAxios} from "../../../auth/AuthorizationService";
import HouseholdTable from "../../../household/HouseholdDashboard";
import HouseholdNotExists from "../../../household/HouseholdNotExistsComponent";

export default async function householdDashboard() {
    const access = await VerifyAccessAxios()
    if (!access) {
        return <HouseholdTable></HouseholdTable>;
    } else {
        return <HouseholdNotExists></HouseholdNotExists>
    }
}