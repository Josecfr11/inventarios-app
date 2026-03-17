import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { estatusList, tiposPagoList, EstatusVenta, TiposPago } from '../../../../mocks/ventas';
import { ClientesService } from '../../../services/clientes.service';
import { HerramientasService } from '../../../services/herramientas.service';
@Component({
  selector: 'app-ventas-modal',
  standalone: true,
  imports: [
    CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule,
    FormsModule, SelectModule, DropdownModule, TableModule
  ],
  templateUrl: './ventas-modal.component.html'
})
export class VentasModalComponent implements OnInit {
  public estados: EstatusVenta[] = estatusList;
  public tiposPagos: TiposPago[] = tiposPagoList;

  public clientes: any[] = [];
  public herramientas: any[] = [];

  public ventasForm: FormGroup;
  public esEdicion: boolean = false;
  public idVentaEditada: any = null;

  public herramientaSeleccionada: any = null;
  public cantidadSeleccionada: number = 1;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private clientesService: ClientesService,
    private herramientasService: HerramientasService
  ) {
    this.ventasForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      estado: ['', Validators.required],
      tipoPago: ['', Validators.required],
      clienteId: [null, Validators.required],
      total: [{ value: 0, disabled: true }],
      detalles: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarDatosDesplegables();

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

      if (v.detalles && v.detalles.length > 0) {
        v.detalles.forEach((d: any) => {
          const detalle = this.fb.group({
            herramientaId: [d.herramienta.id],
            nombreHerramienta: [d.herramienta.nombre],
            cantidad: [d.cantidad, Validators.required],
            precioUnitario: [d.precioUnitario],
            subtotal: [d.subtotal]
          });
          this.detallesFormArray.push(detalle);
        });
      }
    }
  }

  cargarDatosDesplegables() {
    this.clientesService.getAll().subscribe(data => this.clientes = data);
    this.herramientasService.getAll().subscribe(data => {
      this.herramientas = data.filter(h => h.stockActual > 0 && h.activo);
    });
  }

  get detallesFormArray() {
    return this.ventasForm.get('detalles') as FormArray;
  }

  agregarDetalle() {
    if (!this.herramientaSeleccionada || this.cantidadSeleccionada < 1) return;

    if (this.cantidadSeleccionada > this.herramientaSeleccionada.stockActual) {
      alert(`Stock insuficiente. Solo hay ${this.herramientaSeleccionada.stockActual} disponibles.`);
      return;
    }

    const subtotal = this.herramientaSeleccionada.valor * this.cantidadSeleccionada;
    const detalle = this.fb.group({
      herramientaId: [this.herramientaSeleccionada.id],
      nombreHerramienta: [this.herramientaSeleccionada.nombre],
      cantidad: [this.cantidadSeleccionada, Validators.required],
      precioUnitario: [this.herramientaSeleccionada.valor],
      subtotal: [subtotal]
    });

    this.detallesFormArray.push(detalle);
    this.calcularTotalGeneral();

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

  agregarEditarVenta() {
    if (this.ventasForm.invalid || this.detallesFormArray.length === 0) {
      this.ventasForm.markAllAsTouched();
      return;
    }

    const payload = {
      id: this.idVentaEditada,
      ...this.ventasForm.getRawValue()
    };

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
