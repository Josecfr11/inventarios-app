import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ventas-modal',
  standalone: true,
  imports: [ButtonModule, TableModule, InputTextModule, DatePicker, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './ventas-modal.component.html',
  styleUrl: './ventas-modal.component.css'
})
export class VentasModalComponent {
  private readonly fb = inject(NonNullableFormBuilder);

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
