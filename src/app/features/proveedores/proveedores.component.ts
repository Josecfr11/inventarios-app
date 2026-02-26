import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; 

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule 
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  proveedores = [
    { ruc: '20123456789', nombre: 'Suministros Industriales S.A.', contacto: 'Carlos Ruiz', telf: '987654321', rubro: 'Electricidad' },
    { ruc: '20987654321', nombre: 'Ferretería Central', contacto: 'Ana López', telf: '912345678', rubro: 'Construcción' },
    { ruc: '20555666777', nombre: 'Global Tools', contacto: 'Marcos Peña', telf: '944555666', rubro: 'Herramientas' }
  ];
}