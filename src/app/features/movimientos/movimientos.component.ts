import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent {
  movimientos = [
    { id: 'MOV-10', tipo: 'ENTRADA', producto: 'Taladro Percutor', cantidad: 5, fecha: '2024-05-18 10:30', usuario: 'admin_jose' },
    { id: 'MOV-11', tipo: 'SALIDA', producto: 'Esmeril Angular', cantidad: 1, fecha: '2024-05-18 11:45', usuario: 'operador_juan' },
    { id: 'MOV-12', tipo: 'AJUSTE', producto: 'Caja de Herramientas', cantidad: -2, fecha: '2024-05-19 09:00', usuario: 'admin_jose' }
  ];
}