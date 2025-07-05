import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products-register/products';
import { Sales } from './components/sales-register/sales';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Header } from './components/header/header';
import { authGuardGuard } from './guard/auth-guard-guard';
import { ModificarProducto } from './components/product-update/modificar-producto';
import { SalesView } from './components/sales-view/sales-view';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '', // Ruta vacía para contener la estructura con layout
    component: Header,
    canActivate: [authGuardGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'productos', component: Products },
      { path: 'modificar-producto/:id', component: ModificarProducto },
      { path: 'ventas', component: Sales },
      { path: 'visualizar-ventas', component: SalesView }
    ]
  },

  { path: '**', redirectTo: 'login' } // Ruta comodín
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }