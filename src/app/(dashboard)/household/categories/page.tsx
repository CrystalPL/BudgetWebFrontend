import CategoryDashboardWrapper from "../../../../features/categories/CategoryDashboardWrapper";
import {getCookie} from "../../../../util/CookieUtil";
import {getCategories} from "../../../../features/categories/api/CategoryService";
import {CreateCategoryValidationConstraints} from "../../../../validator/ValidationModel";
import {getValidators} from "../../../../validator/ValidationService";

export default async function Page() {
    const categories = await getCategories(await getCookie());
    const validators = await getValidators<CreateCategoryValidationConstraints>(['CATEGORY']);

    return <CategoryDashboardWrapper categoryConstraints={validators}
                                     categories={categories}></CategoryDashboardWrapper>
}