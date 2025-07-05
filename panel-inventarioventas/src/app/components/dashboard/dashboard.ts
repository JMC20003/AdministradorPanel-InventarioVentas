import { AfterViewInit, Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto'; // Importa Chart.js
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    // Puedes cargar datos aquí si son necesarios antes de la vista
  }

  ngAfterViewInit(): void {
    this.createMonthlySalesChart();
    this.createTopProductsChart();
  }

  createMonthlySalesChart(): void {
   
  }

  createTopProductsChart(): void {
    
  }
}
