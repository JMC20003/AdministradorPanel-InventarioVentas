import { DetalleVentaProductoDTO } from "./DetalleVentaProductoDTO";

export interface RegistroVentaDTO {
  usuarioId: number;
  productos: DetalleVentaProductoDTO[];
}