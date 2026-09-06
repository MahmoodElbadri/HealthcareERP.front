import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientDto } from './models/patient-dto';
import { ApiResponse } from '../../core/ApiResponse';
import { AppointmentDTO } from '../Appointments/models/appointment-dto';
import { PatientHistoryDto } from './models/patient-history-dto';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  //vars
  private apiUrl = environment.apiUrl + '/patients';
  //injections
  private http = inject(HttpClient);

  //methods
  getAllPatients(): Observable<ApiResponse<PatientDto[]>> {
    return this.http.get<ApiResponse<PatientDto[]>>(`${this.apiUrl}/GetAllPatients`);
  }

  addPatient(patient: PatientDto): Observable<ApiResponse<PatientDto>> {
    return this.http.post<ApiResponse<PatientDto>>(`${this.apiUrl}/AddPatient`, patient);
  }

  getPatientById(id: number): Observable<ApiResponse<PatientDto>> {
    return this.http.get<ApiResponse<PatientDto>>(`${this.apiUrl}/GetPatientById/${id}`);
  }

  updatePatient(id: number, patient: PatientDto): Observable<ApiResponse<PatientDto>> {
    return this.http.put<ApiResponse<PatientDto>>(`${this.apiUrl}/UpdatePatient/${id}`, patient);
  }

  deletePatient(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/DeletePatient/${id}`);
  }

  // [HttpGet("get-patient-history/{patientId}")]
  getPatientHistory(patientId: number): Observable<ApiResponse<PatientHistoryDto[]>> {
    return this.http.get<ApiResponse<PatientHistoryDto[]>>(`${this.apiUrl}/get-patient-history/${patientId}`);
  }
}
