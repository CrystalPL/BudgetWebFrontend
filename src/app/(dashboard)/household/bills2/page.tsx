import BillDashboardLoader from "../../../../features/bills2/dashboard/BillDashboardLoader";

export default async function page() {
    // const bills = await getBills(await getCookie())
    return <BillDashboardLoader bills={[]}/>
}
