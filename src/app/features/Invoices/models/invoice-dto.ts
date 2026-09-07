export interface InvoiceDto {
    id: number;
    appointmentId: number;
    totalAmount: number;
    status: string;
    issueDate: Date;
    paymentDate: Date;
}


