import {PasswordResetValidationConstraints} from "../../../validator/ValidationModel";
import {getValidators} from "../../../validator/ValidationService";
import ResetPasswordForm from "./PasswordReset";

export default async function page() {
    const validators = await getValidators<PasswordResetValidationConstraints>(['PASSWORD']);
    return <ResetPasswordForm {...validators}/>
}