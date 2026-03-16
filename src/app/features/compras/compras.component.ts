import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ComprasService } from '../../services/compras.service';
import { ComprasModalComponent } from './compras-modal/compras-modal.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, ToastModule],
  providers: [DialogService, MessageService],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit, OnDestroy {
  compras: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private comprasService: ComprasService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasService.getAll().subscribe({
      next: (data) => this.compras = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las compras' })
    });
  }

  abrirModal() {
    this.ref = this.dialogService.open(ComprasModalComponent, {
      header: 'Registrar Nueva Orden de Compra',
      width: '65vw',
      modal: true,
      closable: true,
      breakpoints: { '960px': '85vw', '640px': '95vw' }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data && data.compra) {
        this.comprasService.create(data.compra).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Compra registrada, inventario y Kardex actualizados.' });
            this.cargarCompras();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar la compra.' })
        });
      }
    });
  }

  getSeverity(estado: string): "success" | "warn" | "danger" | "info" | "secondary" | undefined {
    if (!estado) return 'info';
    switch (estado.toUpperCase()) {
      case 'COMPLETADO': return 'success';
      case 'PENDIENTE': return 'warn';
      case 'CANCELADO': return 'danger';
      default: return 'info';
    }
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }
}
