import { PrescriptionItemDto } from "./AddPrescriptionItemDto";

export interface AddPrescriptionDto {
  appointmentId: number;
  items: PrescriptionItemDto[];
}
