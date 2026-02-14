import { Routes } from '@angular/router';
import { ButtonDemoComponent } from './features/demo/button-demo/button-demo.component';
import { InventarioListComponent } from './features/inventario/inventario-list/inventario-list.component';
import { ComprasComponent } from './features/compras/compras.component';
import { MovimientosComponent } from './features/movimientos/movimientos.component';
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { VentasComponent } from './features/ventas/ventas.component';

export const routes: Routes = [
    {
        path: 'button',
        component: ButtonDemoComponent
    },
    {
        path: 'compras',
        component: ComprasComponent
    },
    {
        path: 'movimientos',
        component: MovimientosComponent
    },
    {
        path: 'proveedores',
        component: ProveedoresComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'ventas',
        component: VentasComponent
    },
    {
        path: 'inventario',
        component: InventarioListComponent
    },
    // Si quieres que al abrir la app te mande directo al inventario, añade esta línea:
    { path: '', redirectTo: 'inventario', pathMatch: 'full' }
];
