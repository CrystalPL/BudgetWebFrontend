import BillDashboardLoader from "../../../../features/bills2/dashboard/BillDashboardLoader";
import {exampleBills} from "../../../../features/bills2/api/BillModel";

export default async function page() {
    // const bills = await getBills(await getCookie())
    return <BillDashboardLoader bills={exampleBills}/>
}
