import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'modificar-producto/:id',
    renderMode: RenderMode.Server // 🔧 Esto evita el prerender en esta ruta dinámica
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
