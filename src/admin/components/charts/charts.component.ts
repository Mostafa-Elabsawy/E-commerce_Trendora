import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js modules (Scales, Legends, Bars, Lines, etc.)
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule], // Fixed: Replaced the corrupted reference with CommonModule
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  // Added lifecycle interfaces explicitly
  @ViewChild('salesChart') salesChartCanvas!: ElementRef<HTMLCanvasElement>;

  public chartInstance?: Chart;
  public analyticsFilters = ['Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last Year'];
  public activeFilter = 'Last 7 Days';

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  ngOnDestroy(): void {
    // Crucial for performance: destroy chart instance when navigating away to prevent memory leaks
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private initializeChart(): void {
    const ctx = this.salesChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'bar', // Base container flag template type
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            type: 'line',
            label: 'Gross Revenue ($)',
            data: [12000, 19000, 15000, 24000, 22000, 31000, 37380],
            borderColor: '#4f46e5', // Indigo-600
            backgroundColor: 'rgba(79, 70, 229, 0.05)',
            fill: true,
            tension: 0.3,
            yAxisID: 'y-revenue',
            order: 1, // Layer order: places line smoothly *over* the bars
          },
          {
            type: 'bar',
            label: 'Orders Processed',
            data: [62, 84, 70, 110, 95, 140, 175],
            backgroundColor: '#cbd5e1', // Slate-300
            hoverBackgroundColor: '#94a3b8', // Slate-400
            borderRadius: 6,
            yAxisID: 'y-orders',
            order: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { family: 'Inter', size: 12, weight: 500 }, // Fixed: Changed '500' string to literal number 500
            },
          },
        },
        scales: {
          'y-revenue': {
            type: 'linear',
            position: 'left',
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: (value) => '$' + Number(value).toLocaleString(),
            },
          },
          'y-orders': {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false }, // Avoid duplicate gridline clashing on view
            ticks: { stepSize: 50 },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  // Simulating time range filtering updates programmatically
  public updateChartFilter(filter: string): void {
    this.activeFilter = filter;
    if (!this.chartInstance) return;

    // Mock random variance variations representing a data update
    const multiplier = filter === 'Last 7 Days' ? 1 : filter === 'Last 30 Days' ? 4 : 24;

    // Mutate the datasets natively
    this.chartInstance.data.datasets[0].data = [
      12000, 19000, 15000, 24000, 22000, 31000, 37380,
    ].map((v) => v * multiplier);
    this.chartInstance.data.datasets[1].data = [62, 84, 70, 110, 95, 140, 175].map((v) =>
      Math.round(v * (multiplier * 0.8)),
    );

    // Signal Chart.js to recalculate layout paths and animate the transition smoothly
    this.chartInstance.update();
  }
}
