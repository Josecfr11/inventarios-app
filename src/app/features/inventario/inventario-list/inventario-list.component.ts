import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    ButtonModule, 
    InputTextModule, 
    TagModule, 
    TooltipModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent {
  nuevoCodigo: string = '';
  nuevoNombre: string = '';

  listaHerramientas = [
    { codigo: 'HER-001', nombre: 'Taladro Percutor', estado: 'DISPONIBLE', valorUnitario: 85, stockActual: 10 },
    { codigo: 'HER-002', nombre: 'Sierra Circular', estado: 'EN_USO', valorUnitario: 120, stockActual: 5 }
  ];

  constructor(private confirmationService: ConfirmationService) {}

  get totalEquipos() { return this.listaHerramientas.length; }
  get enUso() { return this.listaHerramientas.filter(h => h.estado === 'EN_USO').length; }
  get valorTotal() { return this.listaHerramientas.reduce((acc, h) => acc + (h.valorUnitario * h.stockActual), 0); }

  getSeverity(estado: string | null | undefined): "success" | "secondary" | "info" | "warning" | "danger" | undefined {
    switch (estado) {
      case 'DISPONIBLE': return 'success';
      case 'EN_USO': return 'warning';
      default: return 'info';
    }
  }

  agregarHerramienta() {
    if (this.nuevoCodigo.trim() && this.nuevoNombre.trim()) {
      this.listaHerramientas.push({
        codigo: this.nuevoCodigo,
        nombre: this.nuevoNombre,
        estado: 'DISPONIBLE',
        valorUnitario: 0,
        stockActual: 1
      });
      this.nuevoCodigo = ''; 
      this.nuevoNombre = '';
    }
  }

  cambiarEstado(index: number, nuevoEstado: string) {
    this.listaHerramientas[index].estado = nuevoEstado;
  }

  eliminar(index: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listaHerramientas.splice(index, 1);
      }
    });
  }
}