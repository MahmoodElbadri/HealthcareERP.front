import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorDto } from './models/DoctorDto';
import { ApiResponse } from '../../core/ApiResponse';
import { SpecialityDto } from '../../shared/models/speciality-dto';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  //vars
  private apiUrl = environment.apiUrl + '/doctors';
  //injections
  private http = inject(HttpClient);

  //methods
  getAllDoctors(): Observable<ApiResponse<DoctorDto[]>> {
    return this.http.get<ApiResponse<DoctorDto[]>>(`${this.apiUrl}/GetAllDoctors`);
  }

  addDoctor(doctor: DoctorDto): Observable<ApiResponse<DoctorDto>> {
    return this.http.post<ApiResponse<DoctorDto>>(`${this.apiUrl}/AddDoctor`, doctor);
  }
}
