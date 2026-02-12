import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// --- CONFIGURACIÓN DE PRIMENG 18 ---
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimiza la detección de cambios en Angular
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Configura las rutas de la aplicación
    provideRouter(routes),
    
    // Habilita animaciones asíncronas para que PrimeNG no bloquee el inicio
    provideAnimationsAsync(),
    
    // Configuración global del tema visual
    providePrimeNG({
      theme: {
        preset: Aura, // Usamos el tema moderno "Aura"
        options: {
          prefix: 'p',           // Prefijo estándar para clases CSS
          darkModeSelector: 'none', // Forzamos modo claro para evitar conflictos de color
          cssLayer: false        // Control de prioridad de estilos CSS
        }
      }
    })
  ]
};