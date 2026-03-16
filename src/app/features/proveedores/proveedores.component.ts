import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, TableModule, ButtonModule,
    TagModule, DialogModule, InputTextModule, ToastModule, ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  proveedoresForm!: FormGroup;
  displayModal: boolean = false;
  proveedores: any[] = [];
  esEdicion: boolean = false;
  idProveedorEditado: number | null = null;

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();

    this.proveedoresForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      tipoProducto: ['', Validators.required]
    });
  }

  cargarProveedores() {
    this.proveedoresService.getAll().subscribe({
      next: (data) => this.proveedores = data,
      error: () => this.mostrarToast('error', 'Error', 'No se pudo cargar la lista')
    });
  }

  abrirModalNuevo() {
    this.esEdicion = false;
    this.idProveedorEditado = null;
    this.proveedoresForm.reset();
    this.displayModal = true;
  }

  abrirModalEditar(proveedor: any) {
    this.esEdicion = true;
    this.idProveedorEditado = proveedor.id;
    this.proveedoresForm.patchValue(proveedor);
    this.displayModal = true;
  }

  cerrarModal() {
    this.displayModal = false;
    this.proveedoresForm.reset();
  }

  agregarEditarProveedor() {
    if (this.proveedoresForm.invalid) {
      this.proveedoresForm.markAllAsTouched();
      return;
    }

    const payload = this.proveedoresForm.value;

    if (this.esEdicion && this.idProveedorEditado) {
      this.proveedoresService.update(this.idProveedorEditado, payload).subscribe({
        next: () => {
          this.mostrarToast('success', 'Actualizado', 'Proveedor editado con éxito');
          this.cargarProveedores();
          this.cerrarModal();
        },
        error: () => this.mostrarToast('error', 'Error', 'No se pudo editar')
      });
    } else {
      this.proveedoresService.create(payload).subscribe({
        next: () => {
          this.mostrarToast('success', 'Guardado', 'Proveedor registrado con éxito');
          this.cargarProveedores();
          this.cerrarModal();
        },
        error: () => this.mostrarToast('error', 'Error', 'No se pudo guardar')
      });
    }
  }

  eliminar(proveedor: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar a ${proveedor.nombre}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proveedoresService.delete(proveedor.id).subscribe({
          next: () => {
            this.mostrarToast('success', 'Eliminado', 'Proveedor eliminado con éxito');
            this.cargarProveedores();
          },
          error: () => this.mostrarToast('error', 'Error', 'No se pudo eliminar')
        });
      }
    });
  }

  mostrarToast(severidad: string, resumen: string, detalle: string) {
    this.messageService.add({ severity: severidad, summary: resumen, detail: detalle, life: 3000 });
  }
}
