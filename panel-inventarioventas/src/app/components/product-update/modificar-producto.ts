import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto-service';
import { ProductoRegistroDTO } from '../../models/ProductoRegistroDTO';
import { ProductoDTO } from '../../models/ProductoDTO';
import { TallaStockDTO } from '../../models/TallaStockDTO';

@Component({
  selector: 'app-modificar-producto',
  standalone: false,
  templateUrl: './modificar-producto.html',
  styleUrl: './modificar-producto.css'
})
export class ModificarProducto {
  
  producto: ProductoRegistroDTO = {
    nombre: '',
    precio: 0,
    categoria: '',
    descripcion: '',
    imagen: '',
    tallas: []
  };

  talla: string = '';
  stock: number = 0;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargamos los datos del producto
    this.productoService.obtenerProductoPorId(this.id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (err) => {
        console.error('Error al obtener el producto', err);
        alert('No se pudo cargar el producto');
        this.router.navigate(['/productos']);
      }
    });
  }
  agregarTalla(): void {
    if (this.talla.trim() && this.stock > 0) {
      const nuevaTalla: TallaStockDTO = {
        talla: this.talla,
        stock: this.stock
      };
      this.producto.tallas.push(nuevaTalla);
      this.talla = '';
      this.stock = 0;
    } else {
      alert('Debe ingresar una talla válida y un stock mayor que 0');
    }
  }

eliminarTalla(index: number): void {
  this.producto.tallas.splice(index, 1);
}
  ActualizarProducto(): void {
    this.productoService.modificarProducto(this.id, this.producto).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        alert('No se pudo actualizar el producto');
      }
    });
  }
}
