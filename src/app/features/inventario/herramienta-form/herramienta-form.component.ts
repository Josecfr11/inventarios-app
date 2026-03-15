import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-herramienta-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  template: `
    <div class="row g-3 p-2">
      <div class="col-md-6">
        <label class="fw-bold mb-1">Código</label>
        <input type="text" pInputText class="w-100" [(ngModel)]="datos.codigo" placeholder="Ej. HER-001">
      </div>
      <div class="col-md-6">
        <label class="fw-bold mb-1">Nombre</label>
        <input type="text" pInputText class="w-100" [(ngModel)]="datos.nombre" placeholder="Nombre del equipo">
      </div>
      <div class="col-md-6">
        <label class="fw-bold mb-1">Precio de Venta ($)</label>
        <input type="number" pInputText class="w-100" [(ngModel)]="datos.valor" placeholder="0.00">
      </div>
      <div class="col-md-6">
        <label class="fw-bold mb-1">Stock Actual</label>
        <input type="number" pInputText class="w-100" [(ngModel)]="datos.stockActual" placeholder="Cantidad">
      </div>

      <div class="col-12" *ngIf="!esEdicion">
        <label class="fw-bold mb-1">Fotografía</label>
        <input type="file" class="form-control" (change)="onFileSelected($event)" accept="image/*">
      </div>

      <div class="col-12 d-flex justify-content-end gap-2 mt-4">
        <p-button label="Cancelar" styleClass="p-button-secondary p-button-text" (click)="cerrar()"></p-button>
        <p-button label="Guardar" styleClass="p-button-primary" (click)="guardar()"></p-button>
      </div>
    </div>
  `
})
export class HerramientaFormComponent implements OnInit {
  datos: any = { codigo: '', nombre: '', valor: 0, stockActual: 1, estado: 'DISPONIBLE' }; archivoSeleccionado: File | null = null;
  esEdicion: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    if (this.config.data?.herramienta) {
      this.esEdicion = true;
      this.datos = { ...this.config.data.herramienta };
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];
    }
  }

  guardar() {
    if (!this.datos.codigo || !this.datos.nombre) {
      return;
    }
    this.ref.close({
      herramienta: this.datos,
      file: this.archivoSeleccionado,
      esEdicion: this.esEdicion
    });
  }

  cerrar() {
    this.ref.close();
  }
}
