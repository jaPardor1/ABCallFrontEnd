import { Component } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  resolvedCount = 525;
  pendingCount = 90;
  escalatedCount = 90;

  // Configuración del gráfico de líneas
  lineChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    series: ApexAxisChartSeries;
  } = {
    chart: { type: 'line', height: 300 },
    xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'] },
    series: [{ name: 'Días', data: [5, 7, 6, 8, 5, 6, 7] }],
  };

  // Configuración del gráfico de barras
  barChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    series: ApexAxisChartSeries;
  } = {
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['Enero', 'Febrero', 'Marzo', 'Abril'] },
    series: [
      { name: 'Resueltas', data: [120, 150, 180, 200] },
      { name: 'Pendientes', data: [30, 40, 25, 20] },
    ],
  };

  // Configuración del gráfico de pastel
  pieChartOptions: {
    chart: ApexChart;
    labels: string[];
    series: ApexNonAxisChartSeries;
  } = {
    chart: { type: 'pie', height: 300 },
    labels: ['Resueltas', 'Pendientes', 'Escaladas'],
    series: [525, 90, 90],
  };

  // Configuración del gráfico de barras horizontales
  horizontalBarChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    series: ApexAxisChartSeries;
  } = {
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['George', 'Mariana', 'Diario', 'Houston'] },
    series: [
      { name: 'Resueltos', data: [150, 120, 100, 80] },
      { name: 'Pendientes', data: [20, 30, 40, 10] },
    ],
  };

  // Series adicionales
  channelSeries: ApexAxisChartSeries = [{ name: 'PQRs', data: [300, 250, 200, 150] }];
  hourlySeries: ApexAxisChartSeries = [{ name: 'Por Hora', data: [10, 15, 20, 25, 30] }];
  topAgentsSeries: ApexAxisChartSeries = [{ name: 'Resueltos', data: [50, 40, 30, 20, 10] }];
  agentPerformanceSeries: ApexAxisChartSeries = [{ name: 'Agentes', data: [30, 40, 50, 60] }];
}
