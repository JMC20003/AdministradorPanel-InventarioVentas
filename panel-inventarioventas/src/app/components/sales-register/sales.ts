import { Component } from '@angular/core';
import { ProductoDTO } from '../../models/ProductoDTO';
import { RegistroVentaDTO } from '../../models/RegistroVentaDTO';
import { ProductoService } from '../../services/producto-service';
import { VentaService } from '../../services/venta-service';
import { DetalleVentaProductoDTO } from '../../models/DetalleVentaProductoDTO';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sales',
  standalone: false,
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales {

  listaProductos: ProductoDTO[] = [];
  productoSeleccionado!: ProductoDTO;
  tallaSeleccionada: string = '';
  cantidad: number = 1;

  venta: RegistroVentaDTO = {
    usuarioId: 0,
    productos: []
  };

  tallasDisponibles: any[] = [];

  constructor(private productoService: ProductoService, private ventaService: VentaService, private authService:Auth) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.obtenerUsuarioId();
  }

  obtenerUsuarioId(): void {
  const usuario = this.authService.obtenerUsuario();
  this.venta.usuarioId = usuario.id;
  }

  cargarProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: data => this.listaProductos = data,
      error: err => console.error(err)
    });
  }

  cargarTallas(): void {
    this.tallasDisponibles = this.productoSeleccionado?.tallas || [];
  }

  agregarProducto(): void {
    if (!this.productoSeleccionado || !this.tallaSeleccionada || this.cantidad < 1) {
      alert('Completa los campos para agregar el producto a la venta.');
      return;
    }

    // Buscar la talla seleccionada en el producto
  const tallaEncontrada = this.tallasDisponibles.find(t => t.talla === this.tallaSeleccionada);

  if (!tallaEncontrada) {
    alert('Talla no válida.');
    return;
  }

  // Validar stock disponible
  if (this.cantidad > tallaEncontrada.stock) {
    alert(`Stock insuficiente. Solo hay ${tallaEncontrada.stock} unidades disponibles para la talla ${this.tallaSeleccionada}.`);
    return;
  }

  // Si ya existe un item con ese producto y talla, se puede acumular o bloquear
  const itemExistente = this.venta.productos.find(p =>
    p.productoId === this.productoSeleccionado.id &&
    p.talla === this.tallaSeleccionada
  );

  if (itemExistente) {
    const cantidadTotal = itemExistente.cantidad + this.cantidad;
    if (cantidadTotal > tallaEncontrada.stock + 1) {
      alert(`Ya agregaste ${itemExistente.cantidad}. No puedes superar el stock disponible (${tallaEncontrada.stock}).`);
      return;
    }

    itemExistente.cantidad += this.cantidad;
  } else {
    const nuevoItem: DetalleVentaProductoDTO = {
      productoId: this.productoSeleccionado.id,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidad
    };

    this.venta.productos.push(nuevoItem);
  }

  // Restar stock localmente
  tallaEncontrada.stock -= this.cantidad;
  this.tallaSeleccionada = '';
  this.cantidad = 1;
  }

  eliminarProducto(index: number): void {
    const item = this.venta.productos[index];

    //  Devolver stock localmente
    const tallaARecuperar = this.tallasDisponibles.find(t => 
      t.talla === item.talla
    );
    if (tallaARecuperar) {
      tallaARecuperar.stock += item.cantidad;
    }

    this.venta.productos.splice(index, 1);
  }

  registrarVenta(): void {
    if (this.venta.productos.length === 0) {
      alert('Agrega al menos un producto a la venta.');
      return;
    }

    this.ventaService.registrarVenta(this.venta).subscribe({
      next: () => {
        alert('Venta registrada correctamente');
        this.venta.productos = [];
        this.limpiarFormulario();
        this.cargarProductos();
      },
      error: err => {
        console.error(err);
        alert('Error al registrar la venta');
      }
    });
  }

  limpiarFormulario(): void {
  this.productoSeleccionado = null!;
  this.tallaSeleccionada = '';
  this.cantidad = 1;
  this.tallasDisponibles = [];
  this.venta.productos = [];

  // Si también quieres resetear el usuarioId (solo si no lo tienes permanente)
  // this.venta.usuarioId = 0;

  // Opcional: si usas un <form #ventaForm="ngForm">, puedes hacer:
  // this.ventaForm.resetForm(); (con ViewChild)

  console.log('Formulario limpiado');
  }

  obtenerNombreProducto(id: number): string {
  const producto = this.listaProductos.find(p => p.id === id);
  return producto ? producto.nombre : 'Producto desconocido';
}
}
