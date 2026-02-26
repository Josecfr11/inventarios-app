import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras = [
    { id: 'OC-001', proveedor: 'Suministros Industriales', fecha: '2024-05-10', total: 1500.50, estado: 'COMPLETADO' },
    { id: 'OC-002', proveedor: 'Ferretería Central', fecha: '2024-05-12', total: 450.00, estado: 'PENDIENTE' },
    { id: 'OC-003', proveedor: 'Global Tools', fecha: '2024-05-15', total: 2100.00, estado: 'EN_CAMINO' }
  ];

  getSeverity(estado: string) {
    switch (estado) {
      case 'COMPLETADO': return 'success';
      case 'PENDIENTE': return 'warn';
      case 'EN_CAMINO': return 'info';
      default: return 'secondary';
    }
  }
}