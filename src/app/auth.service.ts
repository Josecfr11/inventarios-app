import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // <-- NUEVO
import { tap, catchError, map } from 'rxjs/operators'; // <-- NUEVO
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginChanged = new EventEmitter<void>();
  private apiUrl = `${environment.apiUrl}/usuarios/login`;

  constructor(private router: Router, private http: HttpClient) {}

  // Ahora devuelve un Observable<boolean>
  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<any>(this.apiUrl, payload).pipe(
      tap(response => {
        // Si el backend responde 200 OK, guardamos los datos reales de la BD
        localStorage.setItem('userRole', response.rol);
        localStorage.setItem('userName', response.nombreCompleto);

        this.loginChanged.emit();
        this.router.navigate(['/inventario']); // Ajusta si tu ruta principal es otra
      }),
      map(() => true), // Si todo sale bien, retornamos true al componente
      catchError((error) => {
        console.error('Error de login:', error.error); // Mensaje del backend (ej. "Usuario inactivo")
        return of(false); // Si hay error 401, retornamos false al componente
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }

  getRole() {
    return localStorage.getItem('userRole');
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  register(usuario: any): Observable<any> {
    const urlRegistro = `${environment.apiUrl}/usuarios`;
    return this.http.post<any>(urlRegistro, usuario);
  }

  logout() {
    localStorage.clear();
    this.loginChanged.emit();
    this.router.navigate(['/login']);
  }
}
