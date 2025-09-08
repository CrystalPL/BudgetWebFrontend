import ReceiptDashboardLoader from "../../../../features/receipts/dashboard/ReceiptDashboardLoader";
import {getReceipts} from "../../../../features/receipts/api/ReceiptService";
import {getCookie} from "../../../../util/CookieUtil";

export default async function page() {
    const receipts = await getReceipts(await getCookie())
    return <ReceiptDashboardLoader receipts={receipts}/>
}