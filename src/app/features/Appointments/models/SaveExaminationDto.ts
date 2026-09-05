import { AddPrescriptionDto } from './AddPrescriptionDto';
import { AddDiagnosisDto } from './AddDiagnosisDto';

export interface SaveExaminationDto {
  diagnosisDto: AddDiagnosisDto;
  prescriptionDto: AddPrescriptionDto;
}
