import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-clientes-modal',
  standalone: true,
  imports: [
    CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule,
    SelectModule, DropdownModule
  ],
  templateUrl: './clientes-modal.component.html'
})
export class ClientesModalComponent implements OnInit {
  public clientesForm: FormGroup;
  public esEdicion: boolean = false;
  public idClienteEditado: any = null;

  public tiposCliente = [
    { label: 'Persona Física', value: 'Física' },
    { label: 'Empresa', value: 'Empresa' },
    { label: 'Mayorista', value: 'Mayorista' },
    { label: 'Gobierno', value: 'Gobierno' }
  ];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.clientesForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.email]],
      tipo: ['Física', Validators.required],
      direccion: [''],
      activo: [true]
    });
  }

  ngOnInit() {
    if (this.config.data?.cliente) {
      this.esEdicion = true;
      const c = this.config.data.cliente;
      this.idClienteEditado = c.id;

      this.clientesForm.patchValue({
        nombre: c.nombre,
        contacto: c.contacto,
        telefono: c.telefono,
        email: c.email,
        tipo: c.tipo,
        direccion: c.direccion,
        activo: c.activo !== undefined ? c.activo : true
      });
    }
  }

  guardar() {
    if (this.clientesForm.invalid) {
      this.clientesForm.markAllAsTouched();
      return;
    }

    const payload = this.clientesForm.getRawValue();
    if (this.esEdicion) {
      payload.id = this.idClienteEditado;
    }

    this.ref.close({
      cliente: payload,
      esEdicion: this.esEdicion
    });
  }
}
