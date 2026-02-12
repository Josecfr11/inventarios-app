import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Herramienta } from '../herramienta.model';

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
  nuevoEstado: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO' | 'BAJA' = 'DISPONIBLE';

  // Datos iniciales de prueba
  listaHerramientas: Herramienta[] = [
    { codigo: 'HER-001', nombre: 'Taladro Percutor', categoria: 'Eléctricos', estado: 'DISPONIBLE', stockActual: 10, stockMinimo: 2, valorUnitario: 85, descripcion: '' },
    { codigo: 'HER-002', nombre: 'Sierra Circular', categoria: 'Corte', estado: 'EN_USO', stockActual: 5, stockMinimo: 1, valorUnitario: 120, descripcion: '' }
  ];

  constructor(private confirmationService: ConfirmationService) {}

  // Define el color del tag según el estado
  getSeverity(estado: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (estado) {
      case 'DISPONIBLE': return 'success';
      case 'EN_USO': return 'warning';
      case 'MANTENIMIENTO': return 'danger';
      case 'BAJA': return 'secondary';
      default: return 'info';
    }
  }

  agregarHerramienta() {
    if (this.nuevoCodigo.trim() && this.nuevoNombre.trim()) {
      this.listaHerramientas.push({
        codigo: this.nuevoCodigo,
        nombre: this.nuevoNombre,
        categoria: 'General',
        estado: this.nuevoEstado,
        stockActual: 1, 
        stockMinimo: 1, 
        valorUnitario: 0, 
        descripcion: ''
      });
      // Limpiar campos
      this.nuevoCodigo = ''; 
      this.nuevoNombre = '';
    }
  }

  cambiarEstado(index: number, nuevoEstado: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO' | 'BAJA') {
    if (this.listaHerramientas[index]) {
      this.listaHerramientas[index].estado = nuevoEstado;
    }
  }

  // Muestra modal de confirmación antes de borrar
  eliminar(index: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.listaHerramientas.splice(index, 1);
      }
    });
  }

  // Propiedades calculadas para el dashboard
  get totalEquipos() { 
    return this.listaHerramientas.length; 
  }

  get enUso() { 
    return this.listaHerramientas.filter(h => h.estado === 'EN_USO').length; 
  }

  get valorTotal() { 
    return this.listaHerramientas.reduce((acc, h) => acc + (h.valorUnitario * h.stockActual), 0); 
  }
}