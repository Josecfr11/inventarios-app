import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

// Importa tus mocks reales
import { estatusList, tiposPagoList, EstatusVenta, TiposPago } from '../../../../mocks/ventas';

@Component({
  selector: 'app-ventas-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule, // <-- 2. ¡AGRÉGALO AQUÍ!
    SelectModule,
    DropdownModule,
    TableModule
  ],
  templateUrl: './ventas-modal.component.html'
})
export class VentasModalComponent implements OnInit {
  public estados: EstatusVenta[] = estatusList;
  public tiposPagos: TiposPago[] = tiposPagoList;

  // Mocks temporales para clientes y herramientas (reemplazar con servicios)
  public clientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Empresa Constructora S.A.' }
  ];
  public herramientas = [
    { id: 1, nombre: 'Taladro Bosch', valor: 150.00, stockActual: 10 },
    { id: 2, nombre: 'Set de Llaves', valor: 45.50, stockActual: 25 }
  ];

  public ventasForm: FormGroup;
  public esEdicion: boolean = false;
  public idVentaEditada: any = null;

  // Variables para el selector temporal de herramientas
  public herramientaSeleccionada: any = null;
  public cantidadSeleccionada: number = 1;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    // Definimos el formulario maestro
    this.ventasForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      estado: ['', Validators.required],
      tipoPago: ['', Validators.required],
      clienteId: [null, Validators.required],
      total: [{ value: 0, disabled: true }], // El total se calcula solo, por eso lo deshabilitamos
      detalles: this.fb.array([]) // Array vacío para guardar las herramientas
    });
  }

  ngOnInit() {
    if (this.config.data?.venta) {
      this.esEdicion = true;
      const v = this.config.data.venta;
      this.idVentaEditada = v.id;

      this.ventasForm.patchValue({
        numeroFactura: v.numeroFactura,
        estado: v.estado,
        tipoPago: v.tipoPago,
        clienteId: v.cliente?.id,
        total: v.total
      });

      // Si editaras detalles, harías un bucle aquí para llenar el FormArray
    }
  }

  // --- LÓGICA DEL DETALLE DE LA VENTA ---
  get detallesFormArray() {
    return this.ventasForm.get('detalles') as FormArray;
  }

  agregarDetalle() {
    if (!this.herramientaSeleccionada || this.cantidadSeleccionada < 1) return;

    const subtotal = this.herramientaSeleccionada.valor * this.cantidadSeleccionada;

    const detalle = this.fb.group({
      herramientaId: [this.herramientaSeleccionada.id],
      nombreHerramienta: [this.herramientaSeleccionada.nombre], // Solo para la vista
      cantidad: [this.cantidadSeleccionada, Validators.required],
      precioUnitario: [this.herramientaSeleccionada.valor],
      subtotal: [subtotal]
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
    this.ventasForm.patchValue({ total: total });
  }

  // --- GUARDADO ---
  agregarEditarVenta() {
    if (this.ventasForm.invalid || this.detallesFormArray.length === 0) {
      this.ventasForm.markAllAsTouched();
      alert("Faltan datos o no has agregado herramientas a la venta.");
      return;
    }

    // Usamos getRawValue() para incluir el 'total' que estaba disabled
    const payload = {
      id: this.idVentaEditada,
      ...this.ventasForm.getRawValue()
    };

    // Quitamos el nombreHerramienta que era solo visual para enviar el JSON limpio al backend
    payload.detalles = payload.detalles.map((d: any) => ({
      herramientaId: d.herramientaId,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal
    }));

    this.ref.close({
      venta: payload,
      esEdicion: this.esEdicion
    });
  }
}
