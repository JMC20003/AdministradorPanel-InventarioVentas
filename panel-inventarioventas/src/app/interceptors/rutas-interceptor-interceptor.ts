import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const rutasInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
 // Usa inject() para obtener una instancia del servicio Auth
  const authService = inject(Auth);

  // 1. Obtén el token del localStorage usando tu servicio Auth
  const token = authService.obtenerToken(); // Usa la instancia obtenida con inject

  // 2. Si hay un token, clona la solicitud y añade el encabezado Authorization
  if (token) {
    // Importante: No modifiques la solicitud original. Clónala.
    const clonedRequest = req.clone({ // 'req' es el objeto HttpRequest en los interceptores funcionales
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedRequest); // Envía la solicitud clonada
  }

  // 3. Si no hay token, envía la solicitud original sin modificar
  return next(req); // Envía la solicitud original
};
