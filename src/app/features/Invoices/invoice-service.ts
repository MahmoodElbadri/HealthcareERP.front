import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/ApiResponse';
import { InvoiceDto } from './models/invoice-dto';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  //vars
  private apiUrl = environment.apiUrl;
  //injections
  private http = inject(HttpClient);

  //methods
  getAllInvoices(): Observable<ApiResponse<InvoiceDto[]>> {
    return this.http.get<ApiResponse<InvoiceDto[]>>(this.apiUrl + '/Invoices/get-all-invoices');
  }

  payInvoice(invoiceId: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.apiUrl + '/Invoices/Pay/' + invoiceId, null);
  }
  
}
