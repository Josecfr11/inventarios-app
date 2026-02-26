import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    TagModule, 
    ButtonModule, 
    DialogModule, 
    InputTextModule, 
    TooltipModule, 
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  displayClaveModal: boolean = false;
  usuarioSeleccionado: any = null;
  nuevaClave: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Datos de prueba iniciales
    this.usuarios = [
      { id: 1, usuario: 'admin', email: 'admin@inventcontrol.com', rol: 'ADMIN', estado: 'ACTIVO' },
      { id: 2, usuario: 'empleado', email: 'operador@inventcontrol.com', rol: 'EMPLEADO', estado: 'ACTIVO' },
      { id: 3, usuario: 'auditor', email: 'auditor@externo.com', rol: 'AUDITOR', estado: 'INACTIVO' }
    ];
  }

  // Solución al error de ButtonSeverity
  getBtnSeverity(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | "help" | "contrast" | undefined {
    return estado === 'ACTIVO' ? 'warning' : 'success';
  }

  getBadgeSeverity(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | undefined {
    return estado === 'ACTIVO' ? 'success' : 'danger';
  }

  toggleEstado(user: any) {
    user.estado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    this.messageService.add({
      severity: 'info',
      summary: 'Actualizado',
      detail: `Usuario ${user.usuario} está ahora ${user.estado}`
    });
  }

  abrirModalClave(user: any) {
    this.usuarioSeleccionado = user;
    this.nuevaClave = '';
    this.displayClaveModal = true;
  }

  guardarClaveTemporal() {
    if (this.nuevaClave.length < 4) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Clave demasiado corta' });
      return;
    }
    
    // Aquí simulas la actualización en BD
    this.messageService.add({
      severity: 'success',
      summary: 'Clave Cambiada',
      detail: `Nueva clave asignada a ${this.usuarioSeleccionado.usuario}`
    });
    this.displayClaveModal = false;
  }
}