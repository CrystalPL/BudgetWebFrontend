import {API_URL} from "@/service/ResponseAPI";
import axios, {AxiosResponse} from "axios";
import {ValidationEntityType} from "@/validator/ValidationModel";

export async function getValidators<T>(validationEntityTypes: ValidationEntityType[]): Promise<T> {
    const queryParamValue = validationEntityTypes.map(String).join(",");
    const urlSearchParams = new URLSearchParams({validationEntityTypes: queryParamValue});
    const url = `${API_URL}/validation?${urlSearchParams.toString()}`;
    const axiosResponse: AxiosResponse<T> = await axios.get<T>(url);
    return axiosResponse.data;
}