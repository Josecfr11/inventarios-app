import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';

// Servicios reales para llenar los selectores
import { ProveedoresService } from '../../../services/proveedores.service';
import { HerramientasService } from '../../../services/herramientas.service';

@Component({
  selector: 'app-compras-modal',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ButtonModule,
    InputTextModule, DropdownModule, TableModule, SelectModule
  ],
  templateUrl: './compras-modal.component.html'
})
export class ComprasModalComponent implements OnInit {
  public comprasForm: FormGroup;
  public proveedores: any[] = [];
  public herramientas: any[] = [];
  public estados = ['PENDIENTE', 'COMPLETADO'];

  // Variables para agregar detalles temporalmente
  public herramientaSeleccionada: any = null;
  public cantidadSeleccionada: number = 1;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private proveedoresService: ProveedoresService,
    private herramientasService: HerramientasService
  ) {
    this.comprasForm = this.fb.group({
      proveedorId: [null, Validators.required],
      numeroOrden: ['', Validators.required],
      estado: ['COMPLETADO', Validators.required],
      observaciones: [''],
      total: [{ value: 0, disabled: true }], // Calculado automáticamente
      detalles: this.fb.array([])
    });
  }

  ngOnInit() {
    // Llenamos los catálogos desde el backend
    this.proveedoresService.getAll().subscribe(data => this.proveedores = data);
    this.herramientasService.getAll().subscribe(data => this.herramientas = data);
  }

  get detallesFormArray() {
    return this.comprasForm.get('detalles') as FormArray;
  }

  agregarDetalle() {
    if (!this.herramientaSeleccionada || this.cantidadSeleccionada < 1) return;

    // Asumimos que el precio de compra es el valor actual, podrías agregar un input para modificarlo
    const subtotal = this.herramientaSeleccionada.valor * this.cantidadSeleccionada;

    const detalle = this.fb.group({
      herramientaId: [this.herramientaSeleccionada.id],
      nombreHerramienta: [this.herramientaSeleccionada.nombre],
      cantidad: [this.cantidadSeleccionada, Validators.required],
      precioUnitarioCompra: [this.herramientaSeleccionada.valor, Validators.required],
      subtotal: [subtotal],
      numSerie: [null] // Opcional, si controlas números de serie
    });

    this.detallesFormArray.push(detalle);
    this.calcularTotalGeneral();

    // Limpiar selectores
    this.herramientaSeleccionada = null;
    this.cantidadSeleccionada = 1;
  }

  eliminarDetalle(index: number) {
    this.detallesFormArray.removeAt(index);
    this.calcularTotalGeneral();
  }

  calcularTotalGeneral() {
    let total = 0;
    this.detallesFormArray.controls.forEach(control => {
      total += control.get('subtotal')?.value || 0;
    });
    this.comprasForm.patchValue({ total: total });
  }

  guardar() {
    if (this.comprasForm.invalid || this.detallesFormArray.length === 0) {
      this.comprasForm.markAllAsTouched();
      alert("Por favor, completa los datos y agrega al menos una herramienta.");
      return;
    }

    const payload = this.comprasForm.getRawValue(); // Incluye el total que está disabled

    // Formateamos los detalles para que coincidan con CompraRequestDTO del backend
    payload.detalles = payload.detalles.map((d: any) => ({
      herramientaId: d.herramientaId,
      cantidad: d.cantidad,
      precioUnitarioCompra: d.precioUnitarioCompra,
      subtotal: d.subtotal,
      numSerie: d.numSerie
    }));

    this.ref.close({ compra: payload });
  }
}
