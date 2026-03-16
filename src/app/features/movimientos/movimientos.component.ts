import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MovimientosService } from '../../services/movimientos.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent implements OnInit {
  movimientos: any[] = [];
  cargando: boolean = true;

  constructor(private movimientosService: MovimientosService) { }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
    this.cargando = true;
    this.movimientosService.getAll().subscribe({
      next: (data) => {
        this.movimientos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar movimientos', err);
        this.cargando = false;
      }
    });
  }

  // Método para asignar el color del Tag dinámicamente
  getSeverity(tipo: string): "success" | "danger" | "warning" | "info" | "secondary" | undefined {
    if (!tipo) return 'info';
    const t = tipo.toUpperCase();
    if (t.includes('ENTRADA') || t.includes('COMPRA')) return 'success';
    if (t.includes('SALIDA') || t.includes('VENTA')) return 'danger';
    if (t.includes('AJUSTE')) return 'warning';
    return 'info';
  }
}
