import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importaciones necesarias
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, // Vital para que funcione proveedoresForm
    TableModule, 
    ButtonModule, 
    TagModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {
  
  // 1. Definimos la propiedad que el HTML está buscando
  proveedoresForm!: FormGroup;
  displayModal: boolean = false;

  proveedores = [
    { ruc: '20123456789', nombre: 'Suministros Industriales S.A.', contacto: 'Carlos Ruiz', telf: '987654321', rubro: 'Electricidad' },
    { ruc: '20987654321', nombre: 'Ferretería Central', contacto: 'Ana López', telf: '912345678', rubro: 'Construcción' },
    { ruc: '20555666777', nombre: 'Global Tools', contacto: 'Marcos Peña', telf: '944555666', rubro: 'Herramientas' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 2. Inicializamos el formulario con los mismos nombres que pusiste en el HTML
    this.proveedoresForm = this.fb.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      telf: ['', Validators.required],
      rubro: ['', Validators.required]
    });
  }

  abrirModal() {
    this.displayModal = true;
  }

  cerrarModal() {
    this.displayModal = false;
    this.proveedoresForm.reset();
  }

  agregarEditarProveedor() {
    if (this.proveedoresForm.valid) {
      console.log('Datos del proveedor:', this.proveedoresForm.value);
      // Aquí iría la lógica para guardar en el backend
      this.cerrarModal();
    }
  }
}