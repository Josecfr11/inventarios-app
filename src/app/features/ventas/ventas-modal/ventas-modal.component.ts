import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ventas-modal',
  standalone: true,
  imports: [ButtonModule, TableModule, InputTextModule, DatePicker],
  templateUrl: './ventas-modal.component.html',
  styleUrl: './ventas-modal.component.css'
})
export class VentasModalComponent {
  constructor(public ref: DynamicDialogRef) { }
  closeDialog(data: any) {
    this.ref.close(data);
  }
}
