import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, InputTextModule,
    ButtonModule, CheckboxModule, ToastModule, DialogModule
    // Eliminada la duplicación de ReactiveFormsModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  clave: string = '';
  cargando: boolean = false;
  recordar: boolean = false; // <-- Nueva variable para el checkbox

  showSoporte: boolean = false;
  displayRegistro: boolean = false;
  cargandoRegistro: boolean = false;
  registroForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['EMPLEADO']
    });
  }

  handleLogin() {
    if (!this.usuario || !this.clave) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Ingresa tus credenciales' });
      return;
    }

    this.cargando = true;

    this.authService.login(this.usuario, this.clave).subscribe({
      next: (success) => {
        this.cargando = false;

        // Evaluamos el booleano que devuelve nuestro AuthService
        if (success) {
           this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'Acceso concedido' });
           setTimeout(() => {
             // Asegúrate de que esta sea tu ruta principal
             this.router.navigate(['/inventario']);
           }, 1000);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'Usuario, clave incorrectos o inactivo' });
        }
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servidor no disponible' });
      }
    });
  }

  // --- LÓGICA DE REGISTRO ---
  abrirModalRegistro() {
    this.registroForm.reset({ rol: 'EMPLEADO' });
    this.displayRegistro = true;
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargandoRegistro = true;

    this.authService.register(this.registroForm.value).subscribe({
      next: () => {
        this.cargandoRegistro = false;
        this.displayRegistro = false;
        this.messageService.add({ severity: 'success', summary: '¡Bienvenido!', detail: 'Tu cuenta ha sido creada. Ya puedes iniciar sesión.' });

        // Autocompletamos el input de usuario
        this.usuario = this.registroForm.get('username')?.value;
        this.clave = ''; // Limpiamos la clave por seguridad
      },
      error: () => {
        this.cargandoRegistro = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la cuenta. Verifica tus datos.' });
      }
    });
  }
}
