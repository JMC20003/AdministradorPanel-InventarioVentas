import { DetalleVentaProductoResponseDTO } from './DetalleVentaProductoResponseDTO';

export interface VentaDetalleDTO {
  id: number;
  fechaVenta: string; // ISO string, luego lo conviertes a Date si quieres
  nombreUsuario: string;
  subTotal: number;
  productosVendidos: DetalleVentaProductoResponseDTO[];
}