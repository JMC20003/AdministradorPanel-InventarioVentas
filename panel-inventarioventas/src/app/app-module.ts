import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products-register/products';
import { Sales } from './components/sales-register/sales';
import { MaterialModule } from './modules/material/material-module';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Header } from './components/header/header'; // <-- Asegúrate de tenerlo
import { rutasInterceptorInterceptor } from './interceptors/rutas-interceptor-interceptor';
import { ModificarProducto } from './components/product-update/modificar-producto';
import { SalesView } from './components/sales-view/sales-view';
import { SalesUpdate } from './components/sales-update/sales-update';
@NgModule({
  declarations: [
    App,
    Dashboard,
    Products,
    Sales,
    Login,
    Register,
    Header,
    ModificarProducto,
    SalesView,
    SalesUpdate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([rutasInterceptorInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
