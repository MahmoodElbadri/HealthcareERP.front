import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardStatsDto } from '../models/dashboard-stats-dto';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [CurrencyPipe, BaseChartDirective],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  //vars
  stats: DashboardStatsDto | undefined = undefined;

  // Chart configuration
  public appointmentsChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  public appointmentsChartData: ChartData<'doughnut'> | undefined = undefined;

  public medicationsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  public medicationsChartData: ChartData<'bar'> | undefined = undefined;

  //injections
  private dashboardService = inject(DashboardService);

  //methods
  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(): void {
    this.dashboardService.getDashboard().subscribe((res) => {
      if (res.isSuccess) {
        this.stats = res.data;
        this.initCharts(res.data);
      } else {
        console.error('Error fetching dashboard stats:', res.message);
      }
    });
  }

  initCharts(data: DashboardStatsDto) {
    this.appointmentsChartData = {
      labels: ['Completed', 'Scheduled', 'Cancelled'],
      datasets: [{
        data: [data.completedAppointments, data.scheduledAppointments, data.cancelledAppointments],
        backgroundColor: ['#16a34a', '#ca8a04', '#dc2626'],
      }]
    };

    if (data.top5Medications && data.top5Medications.length > 0) {
      this.medicationsChartData = {
        labels: data.top5Medications.map(m => m.medicationName),
        datasets: [{
          data: data.top5Medications.map(m => m.count),
          backgroundColor: '#4f46e5',
          borderRadius: 4
        }]
      };
    }
  }
}
