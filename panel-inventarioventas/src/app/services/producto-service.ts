import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoRegistroDTO } from '../models/ProductoRegistroDTO';
import { ProductoDTO } from '../models/ProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'https://api.tiendarjsc.site/api/productos';
  //private baseUrl = 'http://localhost:8080/api/productos';
  constructor(private clientHTTP: HttpClient ) { }
  obtenerTodosLosProductos(){
    return this.clientHTTP.get<ProductoDTO[]>(this.baseUrl + "/listar")
  }
  agregrarProducto(producto: ProductoRegistroDTO){
    return this.clientHTTP.post<ProductoDTO>(this.baseUrl +"/registrar",producto)
  }
  modificarProducto(id:number, producto:ProductoRegistroDTO){
    return this.clientHTTP.put<ProductoDTO>(this.baseUrl +"/modificar/"+ id, producto)
  }
  getCard(){
    return this.clientHTTP.get<ProductoDTO[]>(this.baseUrl + "/cards" )
  }
  desactivarProducto(id: number) {
    return this.clientHTTP.put(this.baseUrl +"/eliminar/"+ id.toString(),null);
  }
  obtenerProductoPorId(id: number) {
  return this.clientHTTP.get<ProductoDTO>(this.baseUrl +"/" + id.toString());
  }
}
