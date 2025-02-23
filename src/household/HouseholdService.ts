import {handleRequest, ResponseAPI} from "@/components/share/ResponseAPI";
import {CreateHouseholdMessage} from "@/household/HouseholdMessage";

export async function createHousehold(name: string): Promise<ResponseAPI<CreateHouseholdMessage>> {
    return handleRequest<typeof CreateHouseholdMessage>("/household/create", {name}, CreateHouseholdMessage);
}