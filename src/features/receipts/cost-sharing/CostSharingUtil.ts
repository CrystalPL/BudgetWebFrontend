import {UserDebt} from "@/features/receipts/cost-sharing/CostSharingModel";
import {ReceiptItem, UserWhoPaid} from "@/features/receipts/api/ReceiptModel";

export function calculateCostSharing(whoPaid: UserWhoPaid, productList: ReceiptItem[], householdUsers: UserWhoPaid[]): UserDebt[] {
    const userDebts = new Map<number, UserDebt>();

    householdUsers.forEach(user => {
        if (user.userId !== whoPaid.userId) {
            userDebts.set(user.userId, {
                user,
                totalDebt: 0,
                items: []
            });
        }
    });

    productList.forEach(item => {
        if (item.userToReturnMoney && item.moneyDividing && typeof item.moneyDividing === 'number') {
            const userDebt = userDebts.get(item.userToReturnMoney.userId);
            if (userDebt) {
                userDebt.totalDebt = (userDebt.totalDebt || 0) + item.moneyDividing;
                userDebt.items.push(item);
            }
        }
    });

    return Array.from(userDebts.values()).filter(debt => debt.totalDebt > 0);
}