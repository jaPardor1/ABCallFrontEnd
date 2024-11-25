import { Component, OnInit } from '@angular/core';
import { PqrService } from '../service/pqr/pqr.service';
import { PqrStatsDto } from '../pqr/PqrStatsDto';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  resolvedCount = 0;
  pendingCount = 0;
  escalatedCount = 0;

  // Configuración del gráfico de pastel
  pieChartOptions: {
    chart: ApexChart;
    series: ApexNonAxisChartSeries;
    labels?: string[]; // Añadir etiquetas personalizadas
    colors: string[];
  } = {
    chart: { type: 'pie', height: 300 },
    series: [],
    labels: ['Cerradas', 'Abiertas', 'Escaladas'], // Nombres de las porciones
    colors: ['#90ee90', '#ffff99', '#ff9999'], // Verde, amarillo, rojo
  };


  // Configuración de los gráficos de líneas y barras (simplificado)
  lineChartOptions: {
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis?: { labels: { formatter: (value: number) => string } }; // Añadir yaxis
    series: ApexAxisChartSeries;
  } = {
    chart: { type: 'line', height: 300 },
    xaxis: { categories: [] },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(2), // Formatear a 2 decimales
      },
    },
    series: [{ name: 'Promedio (días)', data: [] }],
  };



  barChartOptions: { chart: ApexChart; xaxis: ApexXAxis; series: ApexAxisChartSeries } = {
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['CERRADO', 'ABIERTO', 'ESCALADO'] },
    series: [{ name: 'Cantidad', data: [] }],
  };

  // Configuración de barras por canal
  channelChartOptions: { chart: ApexChart; xaxis: ApexXAxis } = {
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['WEB', 'APP'] },
  };
  channelSeries: ApexAxisChartSeries = [];

  constructor(private pqrService: PqrService, private translate: TranslateService) {}

  ngOnInit() {
    this.loadStats();
  }

  private loadStats(): void {
    this.pqrService.getPqrStats().subscribe((data: PqrStatsDto) => {
      // Actualizar indicadores
      this.resolvedCount = data.total_resolved;
      this.pendingCount = data.total_pending;
      this.escalatedCount = data.total_escalated;

      // Obtener traducciones y actualizar gráficos
      this.translate
        .get([
          'dashboardModule.resolved',
          'dashboardModule.pending',
          'dashboardModule.escalated',
        ])
        .subscribe((translations) => {
          // Actualizar labels y series en el gráfico de pastel
          this.pieChartOptions = {
            ...this.pieChartOptions,
            labels: [
              translations['dashboardModule.resolved'],
              translations['dashboardModule.pending'],
              translations['dashboardModule.escalated'],
            ],
            series: [
              data.total_resolved,
              data.total_pending,
              data.total_escalated,
            ],
          };

          // Actualización de los otros gráficos
          this.updateLineChart(data);
          this.updateBarChart(data);
          this.updateChannelChart(data);
        });
    });
  }

  private updateLineChart(data: PqrStatsDto): void {
    const averageResolutionTime = Object.values(data.average_resolution_time_per_month)
      .reduce((a, b) => a + b, 0) /
      Object.values(data.average_resolution_time_per_month).length;

    this.lineChartOptions = {
      ...this.lineChartOptions,
      xaxis: {
        categories: data.resolution_times.map((_, index) => `PQR ${index + 1}`),
      },
      series: [
        {
          name: 'Tiempos de resolución',
          data: data.resolution_times,
        },
        {
          name: 'Promedio (días)',
          data: Array(data.resolution_times.length).fill(averageResolutionTime),
        },
      ],
      yaxis: {
        labels: {
          formatter: (value: number) => value.toFixed(2), // Redondea los valores del eje Y
        },
      },
    };
  }



  private updateBarChart(data: PqrStatsDto): void {
    this.barChartOptions = {
      ...this.barChartOptions,
      series: [
        {
          name: 'Cantidad',
          data: [
            data.distribution.CERRADO || 0,
            data.distribution.ABIERTO || 0,
            data.distribution.ESCALADO || 0,
          ],
        },
      ],
    };
  }

  private updateChannelChart(data: PqrStatsDto): void {
    this.channelChartOptions = {
      ...this.channelChartOptions,
      xaxis: { categories: Object.keys(data.incidences_per_channel) },
    };

    this.channelSeries = [
      {
        name: 'Cantidad por Canal',
        data: Object.values(data.incidences_per_channel),
      },
    ];
  }
}



