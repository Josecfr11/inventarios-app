import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HerramientaFormComponent } from '../herramienta-form/herramienta-form.component';
import { HerramientasService } from '../../../services/herramientas.service';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, ButtonModule,
    InputTextModule, TagModule, TooltipModule, ConfirmDialogModule,
    ToastModule // <-- NUEVO
  ],
  providers: [ConfirmationService, MessageService, DialogService], // <-- DialogService AÑADIDO
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent implements OnInit {
  listaHerramientas: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private herramientasService: HerramientasService
  ) { }

  ngOnInit() {
    this.cargarHerramientas();
  }

  cargarHerramientas() {
    this.herramientasService.getAll().subscribe({
      next: (data) => this.listaHerramientas = data,
      error: (err) => this.mostrarToast('error', 'Error', 'No se pudieron cargar los datos')
    });
  }

  get totalEquipos() { return this.listaHerramientas.length; }
  get enUso() { return this.listaHerramientas.filter(h => h.estado === 'EN_USO').length; }
  get valorTotal() { return this.listaHerramientas.reduce((acc, h) => acc + ((h.precioVenta || 0) * (h.stockActual || 0)), 0); }

  getSeverity(estado: string): any {
    switch (estado) {
      case 'DISPONIBLE': return 'success';
      case 'EN_USO': return 'warning';
      default: return 'info';
    }
  }

  abrirModal(herramienta?: any) {
    this.ref = this.dialogService.open(HerramientaFormComponent, {
      header: herramienta ? 'Editar Equipo' : 'Añadir Nuevo Equipo',
      width: '50vw',
      breakpoints: { '960px': '75vw', '640px': '90vw' },
      data: { herramienta: herramienta }
    });

    this.ref.onClose.subscribe((resultado: any) => {
      if (resultado) {
        if (resultado.esEdicion) {

          this.herramientasService.update(resultado.herramienta.id, resultado.herramienta, resultado.file)
            .subscribe({
              next: () => {
                this.mostrarToast('success', 'Actualizado', 'Los datos se guardaron correctamente');
                this.cargarHerramientas();
              },
              error: (err) => {
                console.error(err);
                this.mostrarToast('error', 'Error', 'No se pudo actualizar la herramienta');
              }
            });

        } else {
          this.guardarNuevaHerramienta(resultado.herramienta, resultado.file);
        }
      }
    });
  }

  guardarNuevaHerramienta(herramienta: any, file: File) {
    if (!file) {
      this.mostrarToast('warn', 'Atención', 'Debe seleccionar una imagen');
      return;
    }

    this.herramientasService.create(herramienta, file).subscribe({
      next: () => {
        this.mostrarToast('success', '¡Éxito!', 'Herramienta guardada correctamente');
        this.cargarHerramientas();
      },
      error: (err) => this.mostrarToast('error', 'Error', 'No se pudo guardar la herramienta')
    });
  }

  eliminar(herramienta: any) {
    this.confirmationService.confirm({
      message: `¿Seguro que desea dar de baja ${herramienta.nombre}?`,
      header: 'Confirmación de Baja',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.herramientasService.delete(herramienta.id).subscribe({
          next: () => {
            this.mostrarToast('success', 'Eliminado', 'Registro dado de baja correctamente');
            this.cargarHerramientas();
          },
          error: (err) => this.mostrarToast('error', 'Error', 'No se pudo eliminar el registro')
        });
      }
    });
  }

  mostrarToast(severidad: string, resumen: string, detalle: string) {
    this.messageService.add({ severity: severidad, summary: resumen, detail: detalle, life: 3000 });
  }
}
