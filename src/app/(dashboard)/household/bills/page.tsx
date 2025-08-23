import BillDashboardLoader from "../../../../features/bills/dashboard/BillDashboardLoader";
import {getBills} from "../../../../features/bills/api/BillService";
import {getCookie} from "../../../../util/CookieUtil";

export default async function page() {
    const bills = await getBills(await getCookie())
    return <BillDashboardLoader bills={bills}/>
}
