import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Herramienta } from '../herramienta.model';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent {
  nuevoCodigo: string = '';
  nuevoNombre: string = '';
  nuevoEstado: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO' = 'DISPONIBLE';

  listaHerramientas: Herramienta[] = [
    { codigo: 'HER-001', nombre: 'Taladro Percutor', categoria: 'Eléctricos', estado: 'DISPONIBLE', stockActual: 10, stockMinimo: 2, valorUnitario: 85, descripcion: '' },
    { codigo: 'HER-002', nombre: 'Sierra Circular', categoria: 'Corte', estado: 'EN_USO', stockActual: 5, stockMinimo: 1, valorUnitario: 120, descripcion: '' }
  ];

  // Funciones de Mejora
  agregarHerramienta() {
    if (this.nuevoCodigo && this.nuevoNombre) {
      this.listaHerramientas.push({
        codigo: this.nuevoCodigo,
        nombre: this.nuevoNombre,
        categoria: 'General',
        estado: this.nuevoEstado,
        stockActual: 1, stockMinimo: 1, valorUnitario: 0, descripcion: ''
      });
      this.nuevoCodigo = ''; this.nuevoNombre = '';
    }
  }

  cambiarEstado(index: number, nuevoEstado: any) {
    this.listaHerramientas[index].estado = nuevoEstado;
  }

  eliminar(index: number) {
    if(confirm('¿Seguro que deseas eliminar esta herramienta?')) {
      this.listaHerramientas.splice(index, 1);
    }
  }

  // Cálculos para las tarjetas
  get totalEquipos() { return this.listaHerramientas.length; }
  get enUso() { return this.listaHerramientas.filter(h => h.estado === 'EN_USO').length; }
  get valorTotal() { return this.listaHerramientas.reduce((acc, h) => acc + (h.valorUnitario * h.stockActual), 0); }
}