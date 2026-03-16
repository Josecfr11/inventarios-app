import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './features/login/login.component';
import { InventarioListComponent } from './features/inventario/inventario-list/inventario-list.component';
import { ComprasComponent } from './features/compras/compras.component';
import { MovimientosComponent } from './features/movimientos/movimientos.component';
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { VentasComponent } from './features/ventas/ventas.component';
import { ClientesComponent } from './features/clientes/clientes.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'inventario', component: InventarioListComponent },
            { path: 'compras', component: ComprasComponent },
            { path: 'movimientos', component: MovimientosComponent },
            { path: 'proveedores', component: ProveedoresComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'ventas', component: VentasComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: '', redirectTo: 'inventario', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
