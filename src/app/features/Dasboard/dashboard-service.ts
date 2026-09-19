import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DashboardStatsDto } from './models/dashboard-stats-dto';
import { ApiResponse } from '../../core/ApiResponse';@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  //vars
  private baseUrl = environment.apiUrl + '/dashboard';

  //injections 
  private http = inject(HttpClient);

  //methods
  //DashboardController/        [HttpGet("get-all-stats")]
  public getDashboard(): Observable<ApiResponse<DashboardStatsDto>> {
    return this.http.get<ApiResponse<DashboardStatsDto>>(`${this.baseUrl}/get-all-stats`);
  }

}
