import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDto } from './customer-dto';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {
  private apiUrl = 'http://localhost:1001/customers';

  constructor(private http: HttpClient) { }

  getCustomers(params: {
    pageSize?: number,
    pageNumber?: number,
    sortBy?: string,
    sortOrder?: string,
    nama?: string,
    alamat?: string,
    kota?: string
  }): Observable<CustomerDto[]> {
    const url = this.apiUrl;
    let query = '';
    for (const key in params) {
      if (
        params[key as keyof typeof params] !== undefined &&
        params[key as keyof typeof params] !== null
      ) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get<CustomerDto[]>(`${url}?${query}`);
  }

  addCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.apiUrl, customer);
  }

  editCustomer(customer: CustomerDto, id: number): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}