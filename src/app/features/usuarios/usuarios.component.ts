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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { UsuariosService } from '../../services/usuarios.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, TableModule, TagModule,
    ButtonModule, DialogModule, InputTextModule, TooltipModule, ToastModule,
    SelectModule, ConfirmDialogModule, DropdownModule
  ],
  providers: [MessageService, ConfirmationService],
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

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.initForm();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getAll().subscribe({
      next: (data) => this.usuarios = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios' })
    });
  }

  initForm() {
    this.usuariosForm = this.fb.group({
      username: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
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
    if (this.usuariosForm.invalid) {
      this.usuariosForm.markAllAsTouched();
      return;
    }

    this.usuariosService.create(this.usuariosForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado correctamente' });
        this.cargarUsuarios();
        this.displayNuevoModal = false;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el usuario' })
    });
  }

  toggleEstado(user: any) {
    this.usuariosService.toggleStatus(user.id).subscribe({
      next: () => {
        const nuevoEstado = user.activo ? 'INACTIVO' : 'ACTIVO';
        this.messageService.add({ severity: 'info', summary: 'Estado Actualizado', detail: `${user.username} está ahora ${nuevoEstado}` });
        this.cargarUsuarios();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado' })
    });
  }

  abrirModalClave(user: any) {
    this.usuarioSeleccionado = user;
    this.nuevaClave = '';
    this.displayClaveModal = true;
  }

  guardarClaveTemporal() {
    if (this.nuevaClave.length < 6) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La clave debe tener al menos 6 caracteres' });
      return;
    }

    this.usuariosService.changePassword(this.usuarioSeleccionado.id, this.nuevaClave).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Seguridad', detail: `Contraseña actualizada para ${this.usuarioSeleccionado.username}` });
        this.displayClaveModal = false;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la contraseña' })
    });
  }

  eliminar(user: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar al usuario ${user.username}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuariosService.delete(user.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Usuario dado de baja' });
            this.cargarUsuarios();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario' })
        });
      }
    });
  }
}
