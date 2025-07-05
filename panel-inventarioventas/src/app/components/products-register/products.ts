import { Component, OnInit } from '@angular/core';
import { ProductoRegistroDTO} from '../../models/ProductoRegistroDTO';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../services/producto-service';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../../models/ProductoDTO';
import { Router } from '@angular/router';
import { TallaStockDTO } from '../../models/TallaStockDTO';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{

  producto: ProductoRegistroDTO = {
    nombre: '',
    precio: 0,
    categoria: '',
    descripcion: '',
    imagen: '',
    tallas: []
  };

  // Campos para agregar talla temporal
  talla: string = '';
  stock: number = 0;

  // Tabla
  dsLista = new MatTableDataSource<ProductoDTO>();
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'tallas', 'stock', 'categoria', 'imagen', 'acciones'];

  constructor(
    private servicioProducto: ProductoService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CargarDatos();
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

  AgregarProducto(): void {
    const camposVacios = !this.producto.nombre || !this.producto.precio || !this.producto.categoria || !this.producto.descripcion || !this.producto.imagen;
    if (camposVacios || this.producto.tallas.length === 0) {
      alert('Debe completar todos los campos y agregar al menos una talla');
      return;
    }

    this.servicioProducto.agregrarProducto(this.producto).subscribe({
      next: () => {
        alert('Producto registrado correctamente');
        this.limpiarFormulario();
        this.CargarDatos();
      },
      error: err => {
        console.error('Error al registrar producto', err);
        alert('Error al registrar producto');
      }
    });
  }

  limpiarFormulario(): void {
    this.producto = {
      nombre: '',
      precio: 0,
      categoria: '',
      descripcion: '',
      imagen: '',
      tallas: []
    };
    this.talla = '';
    this.stock = 0;
  }

  CargarDatos(): void {
    this.servicioProducto.obtenerTodosLosProductos().subscribe({
      next: (data: ProductoDTO[]) => {
        this.dsLista.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  EliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.servicioProducto.desactivarProducto(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.CargarDatos();
        },
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }

  applyFilter(event: Event): void {
    const busqueda = (event.target as HTMLInputElement).value;
    this.dsLista.filter = busqueda.trim().toLowerCase();
  }

  calcularStockTotal(tallas: TallaStockDTO[]): number {
    return tallas.reduce((total, t) => total + t.stock, 0);
  }

  formatearTallas(tallas: TallaStockDTO[] | undefined): string {
  if (!tallas || tallas.length === 0) return '-';
  return tallas.map(t => `${t.talla} (${t.stock})`).join(', ');
}
}
