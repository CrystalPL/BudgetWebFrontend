import {UserWhoPaid} from "@/features/receipts/api/ReceiptModel";

export interface BillType {
    id: number;
    name: string;
    icon?: string;
    unit?: string;
    description?: string;
}

export interface CreateBillDetails {
    billTypes: BillType[]
    whoPaidList: UserWhoPaid[]
}

export type BillAttachmentType = 'image' | 'pdf'

export interface BillAttachment {
    id: number;
    fileName: string;
    fileType: BillAttachmentType;
    uploadedAt: Date;
}

export interface Bill {
    id: number;
    billType: BillType;
    amount: number;
    dueDate: Date | null;
    paymentDate: Date | null;
    period: BillingPeriod
    description: string;
    whoPaid: UserWhoPaid;
    isPaid: boolean;
    attachments: BillAttachment[];
    usage: number;
}

export interface BillingPeriod {
    from: Date
    to: Date
}

export const exampleBills: Bill[] = [
    {
        id: 1,
        billType: {
            id: 101,
            name: "Prąd",
            icon: "electricity.png",
            unit: "kWh",
            description: "Rachunek za energię elektryczną"
        },
        amount: 250.75,
        dueDate: new Date("2025-09-15"),
        paymentDate: null,
        period: {
            from: new Date("2025-08-01"),
            to: new Date("2025-08-31")
        },
        description: "Rachunek za sierpień 2025",
        whoPaid: {userId: 1, userName: "Jan Kowalski"},
        isPaid: false,
        attachments: [
            {id: 1, fileName: "bill_august.pdf", fileType: "pdf", uploadedAt: new Date("2025-09-01")}
        ],
        usage: 150
    },
    {
        id: 2,
        billType: {
            id: 102,
            name: "Woda",
            icon: "water.png",
            unit: "m3",
            description: "Rachunek za wodę"
        },
        amount: 120.50,
        dueDate: new Date("2025-09-20"),
        paymentDate: new Date("2025-09-18"),
        period: {
            from: new Date("2025-08-01"),
            to: new Date("2025-08-31")
        },
        description: "Rachunek za sierpień 2025",
        whoPaid: {userId: 2, userName: "Anna Nowak"},
        isPaid: true,
        attachments: [
            {id: 2, fileName: "bill_august_image.png", fileType: "image", uploadedAt: new Date("2025-09-02")}
        ],
        usage: 25
    },
    {
        id: 3,
        billType: {
            id: 103,
            name: "Internet",
            icon: "internet.png",
            description: "Opłata za Internet domowy"
        },
        amount: 80.0,
        dueDate: new Date("2025-09-10"),
        paymentDate: null,
        period: {
            from: new Date("2025-08-01"),
            to: new Date("2025-08-31")
        },
        description: "Opłata za sierpień 2025",
        whoPaid: {userId: 1, userName: "Jan Kowalski"},
        isPaid: false,
        attachments: [],
        usage: 0
    }
];