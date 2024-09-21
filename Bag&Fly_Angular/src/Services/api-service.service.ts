import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }
  postData(endpoint: string, obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, obj);
  }
  putData(endpoint: string, arg: string, obj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}/${arg}`, obj);
  }
  deleteData(endpoint: string, arg: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${arg}`);
  }
}
