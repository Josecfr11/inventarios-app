import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';      // <--- IMPORTANTE
import { TooltipModule } from 'primeng/tooltip'; // <--- IMPORTANTE
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    ButtonModule,
    CommonModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.actualizarMenu();
    this.authService.loginChanged.subscribe(() => {
      this.actualizarMenu();
    });
  }

  actualizarMenu() {
    const role = this.authService.getRole();
    if (!role) {
      this.items = [];
      return;
    }

    this.items = [
      { label: 'Inventario', icon: 'pi pi-warehouse', command: () => this.router.navigate(['/inventario']) },
      { label: 'Ventas', icon: 'pi pi-dollar', command: () => this.router.navigate(['/ventas']) },
      { label: 'Movimientos', icon: 'pi pi-arrow-right-arrow-left', command: () => this.router.navigate(['/movimientos']) }
    ];

    if (role === 'ADMIN') {
      this.items.push(
        { label: 'Compras', icon: 'pi pi-receipt', command: () => this.router.navigate(['/compras']) },
        { label: 'Proveedores', icon: 'pi pi-users', command: () => this.router.navigate(['/proveedores']) },
        { label: 'Clientes', icon: 'pi pi-users', command: () => this.router.navigate(['/clientes']) },
        { label: 'Gestión de Usuarios', icon: 'pi pi-user', command: () => this.router.navigate(['/usuarios']) }
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
