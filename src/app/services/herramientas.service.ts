import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {
  private apiUrl = 'http://localhost:8080/api/herramientas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(herramienta: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('herramienta', JSON.stringify(herramienta));
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: number, herramienta: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('herramienta', JSON.stringify(herramienta));
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }
}
