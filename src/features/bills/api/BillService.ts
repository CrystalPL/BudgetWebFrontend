import {API_URL} from "@/service/ResponseAPI";
import axios from "axios";
import {CreateBillDetails, CreateBillRequest, DEFAULT_BILL_TYPES, UpdateBillRequest} from "./BillModel";
import {Bill} from "@/features/bills2/api/BillModel";

export async function getBills(cookie?: string): Promise<Bill[]> {
    try {
        const response = await axios.get<Bill[]>(API_URL + "/bills", {
            withCredentials: true,
            headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
        });

        return response.data.map((bill: any) => ({
            id: bill.id,
            billType: bill.billType,
            amount: bill.amount,
            dueDate: new Date(bill.dueDate),
            paymentDate: bill.paymentDate ? new Date(bill.paymentDate) : null,
            period: bill.period,
            description: bill.description,
            whoPaid: {
                userId: bill.whoPaid.userId,
                userName: bill.whoPaid.userName
            },
            isPaid: bill.isPaid,
            attachments: bill.attachments?.map((attachment: any) => ({
                id: attachment.id,
                fileName: attachment.fileName,
                fileUrl: attachment.fileUrl,
                fileType: attachment.fileType,
                uploadedAt: new Date(attachment.uploadedAt)
            })) || []
        }));
    } catch (error) {
        // Fallback - zwróć przykładowe dane jeśli API nie działa
        console.warn("API not available, using mock data");
        return getMockBills();
    }
}

export async function getCreateBillDetails(): Promise<CreateBillDetails> {
    try {
        const response = await axios.get<CreateBillDetails>(API_URL + "/bills/getCreateDetails", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        // Fallback - zwróć domyślne dane
        return {
            billTypes: DEFAULT_BILL_TYPES,
            whoPaidLists: [
                {userId: 1, userName: "Użytkownik 1"},
                {userId: 2, userName: "Użytkownik 2"}
            ]
        };
    }
}

export async function createBill(billData: CreateBillRequest): Promise<Bill> {
    const response = await axios.post<Bill>(API_URL + "/bills", billData, {
        withCredentials: true,
    });
    return response.data;
}

export async function updateBill(billData: UpdateBillRequest): Promise<Bill> {
    const response = await axios.put<Bill>(API_URL + "/bills/" + billData.id, billData, {
        withCredentials: true,
    });
    return response.data;
}

export async function deleteBill(billId: number): Promise<void> {
    await axios.delete(API_URL + "/bills/" + billId, {
        withCredentials: true,
    });
}

export async function uploadBillAttachment(billId: number, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<{ url: string }>(
        API_URL + "/bills/" + billId + "/attachment",
        formData,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data.url;
}

// Mock data dla testów
function getMockBills(): Bill[] {
    const now = new Date();
    const currentMonth = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0');

    return [
        {
            id: 1,
            billType: DEFAULT_BILL_TYPES[0], // Prąd
            amount: 150.50,
            usage: 280, // 280 kWh
            dueDate: new Date(now.getFullYear(), now.getMonth(), 15),
            paymentDate: new Date(now.getFullYear(), now.getMonth(), 10),
            period: currentMonth,
            description: "Rachunek za energię elektryczną",
            whoPaid: {userId: 1, userName: "Jan Kowalski"},
            isPaid: true,
            attachments: [
                {
                    id: 1,
                    fileName: "prad-faktura.pdf",
                    fileUrl: "/mock/prad-faktura.pdf",
                    fileType: "pdf",
                    uploadedAt: new Date()
                },
                {
                    id: 2,
                    fileName: "licznik-zdjecie.jpg",
                    fileUrl: "/mock/licznik-zdjecie.jpg",
                    fileType: "image",
                    uploadedAt: new Date()
                }
            ]
        },
        {
            id: 2,
            billType: DEFAULT_BILL_TYPES[1], // Gaz
            amount: 89.30,
            usage: 45, // 45 m³
            dueDate: new Date(now.getFullYear(), now.getMonth(), 20),
            paymentDate: null,
            period: currentMonth,
            description: "Rachunek za gaz ziemny",
            whoPaid: {userId: 2, userName: "Anna Nowak"},
            isPaid: false
        },
        {
            id: 3,
            billType: DEFAULT_BILL_TYPES[2], // Woda
            amount: 45.80,
            usage: 8, // 8 m³
            dueDate: new Date(now.getFullYear(), now.getMonth(), 25),
            paymentDate: new Date(now.getFullYear(), now.getMonth(), 22),
            period: currentMonth,
            description: "Rachunek za wodę i ścieki",
            whoPaid: {userId: 1, userName: "Jan Kowalski"},
            isPaid: true,
            attachments: [
                {
                    id: 3,
                    fileName: "woda-faktura.jpg",
                    fileUrl: "/mock/woda-faktura.jpg",
                    fileType: "image",
                    uploadedAt: new Date()
                }
            ]
        }
    ];
}
