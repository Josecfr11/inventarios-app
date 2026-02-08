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
