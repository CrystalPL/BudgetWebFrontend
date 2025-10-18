import {getValidators} from "../../../validator/ValidationService";
import {SignInValidationConstraints} from "../../../validator/ValidationModel";
import SignIn from "./SignIn";

export default async function page() {
    const validators = await getValidators<SignInValidationConstraints>(['EMAIL']);
    return <SignIn {...validators}/>
}