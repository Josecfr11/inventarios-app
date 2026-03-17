import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule, Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VentasModalComponent } from './ventas-modal/ventas-modal.component';
import { VentasService } from '../../services/ventas.service';
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    TableModule, DialogModule, ButtonModule, RippleModule,
    ToastModule, ToolbarModule, ConfirmDialogModule, CommonModule
  ],
  providers: [DialogService, MessageService, ConfirmationService],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit, OnDestroy {
  public ventas: any[] = [];
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt') dt!: Table;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ventasService: VentasService
  ) { }

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventasService.getAll().subscribe({
      next: (data) => this.ventas = data,
      error: (err) => console.error("Error al cargar ventas", err)
    });
  }

  show(ventaSeleccionada?: any) {
    this.ref = this.dialogService.open(VentasModalComponent, {
      header: ventaSeleccionada ? 'Editar Venta' : 'Agregar Venta',
      width: '60vw',
      modal: true,
      closable: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: { venta: ventaSeleccionada }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        if (!data.esEdicion) {
          this.ventasService.create(data.venta).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Venta registrada correctamente', life: 3000 });
              this.cargarVentas();
            },
            error: (err) => {
              console.error(err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la venta', life: 3000 });
            }
          });
        }
      }
    });
  }

  eliminar(venta: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas cancelar la factura ${venta.numeroFactura}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ventasService.delete(venta.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Venta cancelada', life: 3000 });
            this.cargarVentas();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cancelar', life: 3000 })
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
