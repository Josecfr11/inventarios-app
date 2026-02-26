import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Evento para avisar al Menú que debe reconstruirse
  loginChanged = new EventEmitter<void>();

  constructor(private router: Router) {}

  login(usuario: string, clave: string): boolean {
    let success = false;

    if (usuario === 'admin' && clave === '1234') {
      localStorage.setItem('userRole', 'ADMIN');
      localStorage.setItem('userName', 'Administrador Central');
      success = true;
    } else if (usuario === 'empleado' && clave === '1234') {
      localStorage.setItem('userRole', 'EMPLEADO');
      localStorage.setItem('userName', 'Operador de Almacén');
      success = true;
    }

    if (success) {
      // Emitimos el evento para que AppComponent recargue los módulos
      this.loginChanged.emit();
      this.router.navigate(['/inventario']);
      return true;
    }
    
    return false;
  }

  // Verifica si hay una sesión activa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }

  getRole() {
    return localStorage.getItem('userRole');
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  // Limpia la sesión y avisa al sistema
  logout() {
    localStorage.clear();
    this.loginChanged.emit();
    this.router.navigate(['/login']);
  }
}