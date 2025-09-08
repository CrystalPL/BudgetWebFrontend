import CategoryDashboardWrapper from "../../../../features/categories/CategoryDashboardWrapper";
import {getCookie} from "../../../../util/CookieUtil";
import {getCategories} from "../../../../features/categories/api/CategoryService";

export default async function Page() {
    const categories = await getCategories(await getCookie());

    return <CategoryDashboardWrapper categories={categories}></CategoryDashboardWrapper>
}