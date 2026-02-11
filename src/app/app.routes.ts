import { Routes } from '@angular/router';
import { ButtonDemoComponent } from './features/demo/button-demo/button-demo.component';
import { InventarioListComponent } from './features/inventario/inventario-list/inventario-list.component';

export const routes: Routes = [
  { 
    path: 'button', 
    component: ButtonDemoComponent 
  },
  { 
    path: 'inventario', 
    component: InventarioListComponent 
  },
  // Si quieres que al abrir la app te mande directo al inventario, añade esta línea:
  { path: '', redirectTo: 'inventario', pathMatch: 'full' }
];