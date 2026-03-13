import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importaciones de PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Necesario para [formGroup]
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    DatePickerModule
  ],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {

  // Declaramos la propiedad que el HTML busca
  comprasForm!: FormGroup;
  displayModal: boolean = false;

  compras = [
    { id: 'OC-001', proveedor: 'Suministros Industriales S.A.', fecha: '12/03/2026', total: 1500.50, estado: 'Completado' },
    { id: 'OC-002', proveedor: 'Ferretería Central', fecha: '13/03/2026', total: 850.00, estado: 'Pendiente' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con los controles que definimos en el HTML
    this.comprasForm = this.fb.group({
      proveedor: ['', Validators.required],
      fecha: [null, Validators.required],
      total: ['', [Validators.required, Validators.min(0)]],
      observaciones: ['']
    });
  }

  abrirModal() {
    this.displayModal = true;
  }

  getSeverity(estado: string): any {
    switch (estado) {
      case 'Completado': return 'success';
      case 'Pendiente': return 'warn';
      case 'Cancelado': return 'danger';
      default: return 'info';
    }
  }

  agregarEditarCompra() {
    if (this.comprasForm.valid) {
      console.log('Datos de la compra:', this.comprasForm.value);
      // Aquí puedes llamar a tu servicio para guardar en la base de datos
      this.displayModal = false;
      this.comprasForm.reset();
    }
  }
}