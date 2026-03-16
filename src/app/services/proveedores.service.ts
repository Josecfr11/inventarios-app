import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class ProveedoresService {
  private apiUrl = `${environment.apiUrl}/proveedores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> { return this.http.get<any[]>(this.apiUrl); }
  create(proveedor: any): Observable<any> { return this.http.post<any>(this.apiUrl, proveedor); }
  update(id: number, proveedor: any): Observable<any> { return this.http.put<any>(`${this.apiUrl}/${id}`, proveedor); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
