import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

// --- IMPORTACIONES DE PRIMENG ---
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog'; // <--- 1. Importar aquí
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    InputTextModule, 
    ButtonModule, 
    CheckboxModule, 
    ToastModule, 
    DialogModule // <--- 2. Agregar aquí para que reconozca <p-dialog>
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';
  showSoporte: boolean = false; // Controla la visibilidad del modal

  constructor(private authService: AuthService, private messageService: MessageService) {}

  handleLogin() {
    if (!this.usuario || !this.clave) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Ingresa tus credenciales' });
      return;
    }

    const success = this.authService.login(this.usuario, this.clave);
    if (!success) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Usuario o clave incorrectos' 
      });
    }
  }
}