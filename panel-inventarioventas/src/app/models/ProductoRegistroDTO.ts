import { TallaStockDTO } from "./TallaStockDTO";


export interface ProductoRegistroDTO {
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  tallas: TallaStockDTO[];
}