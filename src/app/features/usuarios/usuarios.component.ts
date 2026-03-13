import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    TableModule, 
    TagModule, 
    ButtonModule, 
    DialogModule, 
    InputTextModule, 
    TooltipModule, 
    ToastModule,
    SelectModule
  ],
  providers: [MessageService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  displayClaveModal: boolean = false;
  displayNuevoModal: boolean = false;
  usuarioSeleccionado: any = null;
  nuevaClave: string = '';
  
  usuariosForm!: FormGroup;
  roles = ['ADMIN', 'EMPLEADO', 'AUDITOR'];

  constructor(private messageService: MessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    // Simulación de carga de datos
    this.usuarios = [
      { id: 1, usuario: 'admin', email: 'admin@inventcontrol.com', rol: 'ADMIN', estado: 'ACTIVO' },
      { id: 2, usuario: 'empleado', email: 'operador@inventcontrol.com', rol: 'EMPLEADO', estado: 'ACTIVO' },
      { id: 3, usuario: 'auditor', email: 'auditor@externo.com', rol: 'AUDITOR', estado: 'INACTIVO' }
    ];
  }

  initForm() {
    this.usuariosForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  abrirModalNuevo() {
    this.usuariosForm.reset();
    this.displayNuevoModal = true;
  }

  agregarUsuario() {
    if (this.usuariosForm.valid) {
      const nuevoUser = {
        id: this.usuarios.length + 1,
        ...this.usuariosForm.value,
        estado: 'ACTIVO'
      };
      this.usuarios.push(nuevoUser);
      this.messageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El registro se guardó correctamente' });
      this.displayNuevoModal = false;
    }
  }

  getBtnSeverity(estado: string): string {
    return estado === 'ACTIVO' ? 'warning' : 'success';
  }

  getBadgeSeverity(estado: string): "success" | "danger" | "secondary" | "info" | "warning" | undefined {
    return estado === 'ACTIVO' ? 'success' : 'danger';
  }

  toggleEstado(user: any) {
    user.estado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    this.messageService.add({
      severity: 'info',
      summary: 'Estado Actualizado',
      detail: `${user.usuario} está ahora ${user.estado}`
    });
  }

  abrirModalClave(user: any) {
    this.usuarioSeleccionado = user;
    this.nuevaClave = '';
    this.displayClaveModal = true;
  }

  guardarClaveTemporal() {
    if (this.nuevaClave.length < 4) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La clave debe tener al menos 4 caracteres' });
      return;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Seguridad',
      detail: `Contraseña actualizada para ${this.usuarioSeleccionado.usuario}`
    });
    this.displayClaveModal = false;
  }
}