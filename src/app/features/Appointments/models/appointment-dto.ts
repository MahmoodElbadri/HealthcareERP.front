import { AppointmentStatus } from "./AppointmentStatus";


export interface AppointmentDTO {
    id: number;
    appointmentDate: string;
    status: AppointmentStatus;
    patientName: string;
    doctorName: string;
    notes: string;
    queueNumber: number;
}