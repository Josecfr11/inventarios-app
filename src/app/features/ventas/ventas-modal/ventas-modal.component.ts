import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { estatusList, tiposPagoList, EstatusVenta, TiposPago} from '../../../../mocks/ventas';
@Component({
  selector: 'app-ventas-modal',
  standalone: true,
  imports: [ButtonModule, TableModule, InputTextModule, DatePicker, ReactiveFormsModule, Select],
  providers: [DatePipe],
  templateUrl: './ventas-modal.component.html',
  styleUrl: './ventas-modal.component.css'
})
export class VentasModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  public estados: EstatusVenta[] = estatusList;
  public tiposPagos: TiposPago[] = tiposPagoList;

  ventasForm = this.fb.group({
    numVenta: ['', Validators.required],
    fecha: ['', Validators.required],
    total: ['', [Validators.required]],
    estado: ['', Validators.required],
    tipoPago: ['', Validators.required],
  });
  constructor(public ref: DynamicDialogRef, private datePipe: DatePipe) { }
  closeDialog(data: any) {
    this.ref.close(data);
  }

  agregarEditarVenta() {

    const fecha = new Date(this.ventasForm.get('fecha')?.value||'');
    const fechaFormateada = this.datePipe.transform(fecha, "dd/MM/yy");
    console.log(fechaFormateada);
    const fechaFormateadaForm = {
      ...this.ventasForm.getRawValue(),
      fecha: fechaFormateada
    }
    console.log(fechaFormateadaForm);

  }
}
