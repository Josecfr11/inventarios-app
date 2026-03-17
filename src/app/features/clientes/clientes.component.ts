import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientesModalComponent } from './clientes-modal/clientes-modal.component';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, ToastModule,
    ToolbarModule, ConfirmDialogModule, TagModule, TooltipModule
  ],
  providers: [DialogService, MessageService, ConfirmationService],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit, OnDestroy {
  public clientes: any[] = [];
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt') dt!: Table;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.getAll().subscribe({
      next: (data) => {
        this.clientes = data.filter(c => c.activo !== false);
      },
      error: (err) => this.mostrarToast('error', 'Error', 'No se pudieron cargar los clientes')
    });
  }

  show(clienteSeleccionado?: any) {
    this.ref = this.dialogService.open(ClientesModalComponent, {
      header: clienteSeleccionado ? 'Editar Cliente' : 'Agregar Cliente',
      width: '50vw',
      modal: true,
      closable: true,
      breakpoints: { '960px': '75vw', '640px': '90vw' },
      data: { cliente: clienteSeleccionado }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        if (data.esEdicion) {
          this.clientesService.update(data.cliente.id, data.cliente).subscribe({
            next: () => {
              this.mostrarToast('success', 'Actualizado', 'Cliente actualizado correctamente');
              this.cargarClientes();
            },
            error: () => this.mostrarToast('error', 'Error', 'No se pudo actualizar el cliente')
          });
        } else {
          this.clientesService.create(data.cliente).subscribe({
            next: () => {
              this.mostrarToast('success', 'Registrado', 'Cliente guardado correctamente');
              this.cargarClientes();
            },
            error: () => this.mostrarToast('error', 'Error', 'No se pudo registrar el cliente')
          });
        }
      }
    });
  }

  eliminar(cliente: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas dar de baja a ${cliente.nombre}?`,
      header: 'Confirmar Baja',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientesService.delete(cliente.id).subscribe({
          next: () => {
            this.mostrarToast('success', 'Eliminado', 'Cliente dado de baja');
            this.cargarClientes();
          },
          error: () => this.mostrarToast('error', 'Error', 'No se pudo eliminar el cliente')
        });
      }
    });
  }

  mostrarToast(severidad: string, resumen: string, detalle: string) {
    this.messageService.add({ severity: severidad, summary: resumen, detail: detalle, life: 3000 });
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }
}
