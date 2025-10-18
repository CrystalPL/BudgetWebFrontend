import {CreateHouseholdMessage} from "@/features/household/api/HouseholdMessage";
import {HouseholdValidationConstraints} from "@/validator/ValidationModel";

export function validateHouseholdName(constraints: HouseholdValidationConstraints, name: string) {
    if (!name || name.trim() === '') {
        return CreateHouseholdMessage.NAME_NOT_EXISTS
    }

    if (name.length > constraints.householdNameMaxLength) {
        return CreateHouseholdMessage.NAME_TOO_LONG
    }

    if (name.length < constraints.householdNameMinLength) {
        return CreateHouseholdMessage.NAME_TOO_SHORT
    }

    return ""
}