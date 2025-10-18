import {SignUpValidationConstraints} from "../../../validator/ValidationModel";
import {getValidators} from "../../../validator/ValidationService";
import SignUp from "./SignUp";

export default async function page() {
    const validators = await getValidators<SignUpValidationConstraints>(['EMAIL', 'PASSWORD', 'USERNAME']);
    return <SignUp {...validators}/>
}