import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: MenuItem[] | undefined;
  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      // {
      //   label: 'Router',
      //   icon: 'pi pi-palette',
      //   items: [
      //     {
      //       label: 'Installation',
      //       routerLink: '/installation'
      //     },
      //     {
      //       label: 'Configuration',
      //       routerLink: '/configuration'
      //     }
      //   ]
      // },
      {
        label: 'Button',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/button']);
        }
      },
      {
        label: 'Ventas',
        icon: 'pi pi-dollar',
        command: () => {
          this.router.navigate(['/ventas']);
        }
      },
      {
        label: 'Compras',
        icon: 'pi pi-receipt',
        command: () => {
          this.router.navigate(['/compras']);
        }
      },
      {
        label: 'Inventario',
        icon: 'pi pi-warehouse',
        command: () => {
          this.router.navigate(['/inventario']);
        }
      },
      {
        label: 'Movimientos',
        icon: 'pi pi-arrow-right-arrow-left',
        command: () => {
          this.router.navigate(['/movimientos']);
        }
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-users',
        command: () => {
          this.router.navigate(['/proveedores']);
        }
      },
      {
        label: 'Gestión de usuarios',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/usuarios']);
        }
      },
      // {
      //   label: 'External',
      //   icon: 'pi pi-home',
      //   items: [
      //     {
      //       label: 'Angular',
      //       url: 'https://angular.io/'
      //     },
      //     {
      //       label: 'Vite.js',
      //       url: 'https://vitejs.dev/'
      //     }
      //   ]
      // }
    ];
  }

}
