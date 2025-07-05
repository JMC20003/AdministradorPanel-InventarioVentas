import { Component } from '@angular/core';
import { VentaDetalleDTO } from '../../models/VentaDetalleDTO';
import { VentaService } from '../../services/venta-service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-sales-view',
  standalone: false,
  templateUrl: './sales-view.html',
  styleUrl: './sales-view.css'
})
export class SalesView {

  routerSub!: Subscription;
  listaVentas: VentaDetalleDTO[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'usuario', 'subtotal', 'productos', 'acciones'];

  constructor(private ventaService: VentaService, private router: Router,  private cdRef: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.obtenerVentas();

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url.includes('listar-ventas')) {
        this.obtenerVentas();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  obtenerVentas(): void {
  this.ventaService.obtenerTodasLasVentas().subscribe({
    next: (res) => {
      this.ngZone.run(() => {
        this.listaVentas = res;
        this.cdRef.detectChanges(); // 🔧 Forzar chequeo seguro
      });
    },
    error: (err) => {
      console.error('Error al obtener ventas:', err);
    }
  });
  }
  eliminarProducto(id:number){
   if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.ventaService.eliminarVenta(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.obtenerVentas();
        },
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }

}
