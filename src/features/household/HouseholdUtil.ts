import {CreateHouseholdMessage} from "@/features/household/api/HouseholdMessage";
import {validateLength} from "@/features/auth/util/DataValidator";

export function validateHouseholdName(name: string) {
    if (!name || name.trim() === '') {
        return CreateHouseholdMessage.NAME_NOT_EXISTS
    }

    if (!validateLength(name, 65)) {
        return CreateHouseholdMessage.NAME_TOO_LONG
    }

    if (validateLength(name, 1)) {
        return CreateHouseholdMessage.NAME_TOO_SHORT
    }

    return ""
}