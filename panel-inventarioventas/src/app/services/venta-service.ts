import { Injectable } from '@angular/core';
import { VentaDetalleDTO } from '../models/VentaDetalleDTO';
import { RegistroVentaDTO } from '../models/RegistroVentaDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private baseUrl = 'https://api.tiendarjsc.site/api/ventas';
  //private baseUrl = 'http://localhost:8080/api/ventas';

  constructor(private clientHTTP: HttpClient) {}

  // Listar todas las ventas
  obtenerTodasLasVentas() {
    return this.clientHTTP.get<VentaDetalleDTO[]>(this.baseUrl + "/listar");
  }

  // Obtener una venta por ID
  obtenerVentaPorId(id: number) {
    return this.clientHTTP.get<VentaDetalleDTO>(`${this.baseUrl}/${id}`);
  }

  // Registrar una nueva venta
  registrarVenta(venta: RegistroVentaDTO) {
    return this.clientHTTP.post<VentaDetalleDTO>(this.baseUrl + "/registrar", venta);
  }

  // Modificar una venta
  modificarVenta(id: number, venta: RegistroVentaDTO) {
    return this.clientHTTP.put<VentaDetalleDTO>(`${this.baseUrl}/modificar/${id}`, venta);
  }

  // Eliminar una venta
  eliminarVenta(id: number) {
    return this.clientHTTP.delete(`${this.baseUrl}/eliminar/${id}`);
  }

  // Eliminar por devolución (distinto endpoint)
  eliminarVentaPorDevolucion(id: number) {
    return this.clientHTTP.delete(`${this.baseUrl}/devolucion/${id}`);
  }

  //------------------REPORTES ------------------------
  // Reporte: ventas por mes
  obtenerVentasPorMes() {
    return this.clientHTTP.get<any[]>(`${this.baseUrl}/ventas-mensuales`);
  }

  // Reporte: productos más vendidos
  obtenerProductosMasVendidos() {
    return this.clientHTTP.get<any[]>(`${this.baseUrl}/productos-mas-vendidos`);
  }

  // Reporte: mes con más ventas
  obtenerMesConMasVentas() {
    return this.clientHTTP.get<any>(`${this.baseUrl}/mes-con-mas-ventas`);
  }
}
