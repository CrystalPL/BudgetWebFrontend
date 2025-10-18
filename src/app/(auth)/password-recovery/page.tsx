import {getValidators} from "../../../validator/ValidationService";
import {SignInValidationConstraints} from "../../../validator/ValidationModel";
import PasswordRecovery from "./PasswordRecovery";

export default async function page() {
    const validators = await getValidators<SignInValidationConstraints>(['EMAIL']);
    return <PasswordRecovery {...validators}/>
}