import BillMainDashboardLoader from "../../../../features/bills/dashboard/BillMainDashboardLoader";
import {getBills} from "../../../../features/bills/api/BillService";
import {getCookie} from "../../../../util/CookieUtil";

export default async function page() {
    const bills = await getBills(await getCookie())
    return <BillMainDashboardLoader bills={bills}/>
}
