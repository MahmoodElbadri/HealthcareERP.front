import { AppointmentDTO } from '../../Appointments/models/appointment-dto';
import { DiagnosisDto } from './DiagnosisDto';
import { PrescriptionDto } from './PrescriptionDto';

export interface PatientHistoryDto {
  appointments: AppointmentDTO [],
  diagnoses: DiagnosisDto[];
  drescriptions: PrescriptionDto[];
}
