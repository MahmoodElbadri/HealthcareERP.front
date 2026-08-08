import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/ApiResponse';
import { SpecialityDto } from '../models/speciality-dto';
@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  //vars
  private apiUrl = environment.apiUrl + '/specialities';
  //injections
  private http = inject(HttpClient);

  getSpecialities(): Observable<ApiResponse<SpecialityDto[]>> {
    return this.http.get<ApiResponse<SpecialityDto[]>>(`${this.apiUrl}/GetAllSpecialities`);
  }
}
