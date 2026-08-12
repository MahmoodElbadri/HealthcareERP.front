import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DoctorDto } from '../Doctors/models/DoctorDto';
import { PatientDto } from '../Patients/models/patient-dto';
import { CreateAppointmentDTO } from './models/create-appointment-dto';
import { ApiResponse } from '../../core/ApiResponse';
import { AppointmentDTO } from './models/appointment-dto';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  
  //vars
  private apiUrl = environment.apiUrl;
  //injections
  private http = inject(HttpClient);

  //methods
  getDoctors(): Observable<ApiResponse<DoctorDto[]>> {
    return this.http.get<ApiResponse<DoctorDto[]>>(this.apiUrl + '/doctors/GetAllDoctors');
  }

  getPatients(): Observable<ApiResponse<PatientDto[]>> {
    return this.http.get<ApiResponse<PatientDto[]>>(this.apiUrl + '/patients/GetAllPatients');
  }

  createAppointment(appointment: CreateAppointmentDTO): Observable<ApiResponse<AppointmentDTO>> {
    return this.http.post<ApiResponse<AppointmentDTO>>(this.apiUrl + '/Appointments/Add-Appointment', appointment);
  }

  getAllAppointments(): Observable<ApiResponse<AppointmentDTO[]>> {
    return this.http.get<ApiResponse<AppointmentDTO[]>>(this.apiUrl + '/Appointments/GetAllAppointments');
  }

  getDoctorAppointments(doctorId: number):Observable<ApiResponse<AppointmentDTO[]>>{
    return this.http.get<ApiResponse<AppointmentDTO[]>>(`${this.apiUrl}/Appointments/Doctor/${doctorId}`);
  }
}
